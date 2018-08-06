import request from 'utils/request';
import moment from 'moment';
import config from 'public-modules/config';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Bounty';
import { actions as transactionActions } from 'public-modules/Transaction';
import { BigNumber } from 'bignumber.js';
import { addressSelector } from 'public-modules/Client/selectors';
import {
  calculateDecimals,
  promisifyContractCall,
  batchContractMethods
} from 'public-modules/Utilities/helpers';
import { addJSON } from 'public-modules/Utilities/ipfsClient';
import { DIFFICULTY_VALUES } from './constants';
import { networkSelector } from 'public-modules/Client/selectors';
import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import {
  getContractClient,
  getWeb3Client,
  getTokenClient
} from 'public-modules/Client/sagas';

const {
  CREATE_DRAFT,
  UPDATE_DRAFT,
  CREATE_BOUNTY,
  GET_DRAFT,
  GET_BOUNTY,
  KILL_BOUNTY,
  ACTIVATE_BOUNTY,
  EXTEND_DEADLINE
} = actionTypes;
const {
  getBountySuccess,
  getBountyFail,
  createDraftSuccess,
  createDraftFail,
  stdBountySuccess,
  stdBountyFail,
  getDraftSuccess,
  getDraftFail
} = actions;

const {
  setPendingWalletConfirm,
  setTransactionError,
  setPendingReceipt
} = transactionActions;

export function* getTokenData(tokenAddress) {
  const { tokenContract: tokenContractClient } = yield call(
    getTokenClient,
    tokenAddress
  );
  const symbol = yield call(tokenContractClient.symbol().call);
  const decimals = yield call(tokenContractClient.decimals().call);
  return {
    symbol,
    decimals
  };
}

export function* createOrUpdateDraft(action) {
  const { values, bountyId } = action;
  const draftBountyData = { ...values };
  draftBountyData.experienceLevel =
    DIFFICULTY_VALUES[draftBountyData.experienceLevel];

  const { paysTokens } = draftBountyData;
  const { web3 } = yield call(getWeb3Client);
  if (!paysTokens) {
    draftBountyData.fulfillmentAmount = web3.utils.toWei(
      draftBountyData.fulfillmentAmount,
      'ether'
    );
  } else {
    const { tokenContract } = draftBountyData;
    try {
      const { symbol, decimals } = yield call(getTokenData, tokenContract);
      draftBountyData.tokenSymbol = symbol;
      draftBountyData.tokenDecimals = parseInt(decimals);
      draftBountyData.fulfillmentAmount = calculateDecimals(
        draftBountyData.fulfillmentAmount,
        decimals
      );
    } catch (e) {
      console.log(e);
      // call error toast here - contract isn't a proper erc20 token.
    }
  }
  draftBountyData.deadline = moment(draftBountyData.deadline)
    .utc()
    .toISOString();

  try {
    let endpoint = 'bounty/draft/';
    let methodType = 'POST';
    if (action.type === UPDATE_DRAFT) {
      methodType = 'PUT';
      endpoint += `${bountyId}/`;
    }

    const bounty = yield call(request, endpoint, methodType, {
      data: draftBountyData
    });
    yield put(createDraftSuccess(bounty));
  } catch (e) {
    yield put(createDraftFail(e));
    // error toast here as well
  }
}

export function* createBounty(action) {
  let tokenSymbol = 'ETH';
  let tokenDecimals = 18;
  let contractFulfillmentAmount;
  let contractBalance;

  const { values, balance } = action;
  const {
    title,
    description,
    categories,
    tokenContract,
    experienceLevel,
    issuer_email,
    issuer_name,
    calculated_fulfillmentAmount,
    fulfillmentAmount,
    paysTokens,
    sourceDirectoryHash,
    sourceFileName,
    uid
  } = values;

  yield put(setPendingWalletConfirm());
  const user = yield select(getCurrentUserSelector);
  const userAddress = user.public_address;

  const { web3 } = yield call(getWeb3Client);

  if (paysTokens) {
    try {
      const { symbol, decimals } = yield call(getTokenData, tokenContract);
      tokenSymbol = symbol;
      tokenDecimals = parseInt(decimals);
      contractFulfillmentAmount = calculateDecimals(
        BigNumber(
          calculated_fulfillmentAmount || fulfillmentAmount,
          10
        ).toString(),
        decimals
      );
      contractBalance = calculateDecimals(
        BigNumber(balance, 10).toString(),
        decimals
      );
    } catch (e) {
      yield put(setTransactionError());
      return yield put(stdBountyFail());
    }
  } else {
    contractFulfillmentAmount = web3.utils.toWei(
      BigNumber(
        calculated_fulfillmentAmount || fulfillmentAmount,
        10
      ).toString(),
      'ether'
    );
    contractBalance = web3.utils.toWei(
      BigNumber(balance, 10).toString(),
      'ether'
    );
  }
  const deadline = parseInt(
    moment(values.deadline)
      .utc()
      .toDate()
      .getTime() / 1000
  );

  const issuedData = {
    payload: {
      uid,
      title,
      description,
      sourceFileHash: '',
      sourceDirectoryHash,
      sourceFileName,
      webReferenceUrl: '',
      categories,
      created: parseInt(new Date().getTime() / 1000) | 0,
      tokenAddress: tokenContract || '',
      difficulty: experienceLevel,
      issuer: {
        address: userAddress,
        email: issuer_email,
        name: issuer_name
      },
      funders: [
        {
          address: userAddress,
          email: issuer_email,
          name: issuer_name
        }
      ],
      symbol: tokenSymbol
    },
    meta: {
      platform: 'bounties-network',
      schemaVersion: '0.1',
      schemaName: 'standardSchema'
    }
  };
  const ipfsHash = yield call(addJSON, issuedData);
  const { standardBounties } = yield call(getContractClient);
  if (paysTokens) {
    const { tokenContract: tokenContractClient } = yield call(
      getTokenClient,
      tokenContract
    );
    try {
      const network = yield select(networkSelector);
      const [approveHash, issuedBountyHash] = yield call(
        batchContractMethods,
        [
          tokenContractClient.approve(
            config[network].standardBountiesAddress,
            contractBalance
          ).send,
          { from: userAddress }
        ],
        [
          standardBounties.issueAndActivateBounty(
            userAddress,
            `${deadline}`,
            ipfsHash,
            contractFulfillmentAmount,
            0x0,
            paysTokens,
            tokenContract || 0x0,
            contractBalance
          ).send,
          { from: userAddress }
        ]
      );
      yield put(setPendingReceipt(issuedBountyHash));
      return yield put(stdBountySuccess());
    } catch (e) {
      yield put(setTransactionError());
      return yield put(stdBountyFail());
    }
  }

  try {
    const txHash = yield call(
      promisifyContractCall(standardBounties.issueAndActivateBounty, {
        from: userAddress,
        value: contractBalance
      }),
      userAddress,
      `${deadline}`,
      ipfsHash,
      contractFulfillmentAmount,
      0x0,
      paysTokens,
      tokenContract || 0x0,
      contractBalance
    );
    yield put(setPendingReceipt(txHash));
    yield put(stdBountySuccess());
  } catch (e) {
    yield put(setTransactionError());
    yield put(stdBountyFail());
  }
}

export function* getDraft(action) {
  const { id } = action;
  const user = yield select(getCurrentUserSelector);
  const address = user.public_address;
  const addressFilter = address.toLowerCase();

  try {
    const endpoint = `bounty/draft/${id}/?issuer=${addressFilter}`;
    const bounty = yield call(request, endpoint, 'GET');
    yield put(getDraftSuccess(bounty));
  } catch (e) {
    yield put(getDraftFail(e));
  }
}

export function* getBounty(action) {
  const { id } = action;

  try {
    const endpoint = `bounty/${id}/`;
    const bounty = yield call(request, endpoint, 'GET');
    yield put(getBountySuccess(bounty));
  } catch (e) {
    yield put(getBountyFail(e));
  }
}

export function* killBounty(action) {
  const { id } = action;
  const userAddress = yield select(addressSelector);
  yield put(setPendingWalletConfirm());

  try {
    const { standardBounties } = yield call(getContractClient);
    const txHash = yield call(
      promisifyContractCall(standardBounties.killBounty, {
        from: userAddress
      }),
      id
    );
    yield put(stdBountySuccess());
    yield put(setPendingReceipt(txHash));
  } catch (e) {
    yield put(stdBountyFail());
    yield put(setTransactionError());
  }
}

export function* activateBounty(action) {
  const { id, balance, paysTokens, decimals } = action;
  const userAddress = yield select(addressSelector);
  yield put(setPendingWalletConfirm());
  let contractBalance;
  if (paysTokens) {
    contractBalance = calculateDecimals(
      BigNumber(balance, 10).toString(),
      parseInt(decimals)
    );
  } else {
    const { web3 } = yield call(getWeb3Client);
    contractBalance = web3.utils.toWei(
      BigNumber(balance, 10).toString(),
      'ether'
    );
  }
  try {
    const { standardBounties } = yield call(getContractClient);
    const txHash = yield call(
      promisifyContractCall(standardBounties.activateBounty, {
        from: userAddress,
        value: paysTokens ? null : contractBalance
      }),
      id,
      contractBalance
    );
    yield put(stdBountySuccess());
    yield put(setPendingReceipt(txHash));
  } catch (e) {
    yield put(stdBountyFail());
    yield put(setTransactionError());
  }
}

export function* extendDeadline(action) {
  const { id, deadline } = action;
  const userAddress = yield select(addressSelector);
  yield put(setPendingWalletConfirm());
  const formattedDeadline = parseInt(
    moment(deadline)
      .utc()
      .toDate()
      .getTime() / 1000
  );

  try {
    const { standardBounties } = yield call(getContractClient);
    const txHash = yield call(
      promisifyContractCall(standardBounties.extendDeadline, {
        from: userAddress
      }),
      id,
      `${formattedDeadline}`
    );
    yield put(stdBountySuccess());
    yield put(setPendingReceipt(txHash));
  } catch (e) {
    yield put(stdBountyFail());
    yield put(setTransactionError());
  }
}

export function* watchCreateDraft() {
  yield takeLatest([CREATE_DRAFT, UPDATE_DRAFT], createOrUpdateDraft);
}

export function* watchCreateBounty() {
  yield takeLatest(CREATE_BOUNTY, createBounty);
}

export function* watchGetDraft() {
  yield takeLatest(GET_DRAFT, getDraft);
}

export function* watchGetBounty() {
  yield takeLatest(GET_BOUNTY, getBounty);
}

export function* watchKillBounty() {
  yield takeLatest(KILL_BOUNTY, killBounty);
}

export function* watchActivateBounty() {
  yield takeLatest(ACTIVATE_BOUNTY, activateBounty);
}

export function* watchExtendDeadline() {
  yield takeLatest(EXTEND_DEADLINE, extendDeadline);
}

export default [
  watchGetDraft,
  watchCreateDraft,
  watchCreateBounty,
  watchGetBounty,
  watchKillBounty,
  watchActivateBounty,
  watchExtendDeadline
];
