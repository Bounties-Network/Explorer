import request from 'utils/request';
import moment from 'moment';
import config from 'public-modules/config';
import { delay } from 'redux-saga';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Bounty';
import { actions as transactionActions } from 'public-modules/Transaction';
import { BigNumber } from 'bignumber.js';
import { addressSelector } from 'public-modules/Client/selectors';
import siteConfig from 'public-modules/config';
import {
  calculateDecimals,
  promisifyContractCall
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
  EXTEND_DEADLINE,
  INCREASE_PAYOUT,
  CONTRIBUTE,
  TRANSFER_OWNERSHIP
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
  let symbol, decimals;
  try {
    const { tokenContract: tokenContractClient } = yield call(
      getTokenClient,
      tokenAddress
    );
    symbol = yield call(tokenContractClient.symbol().call);
    decimals = yield call(tokenContractClient.decimals().call);
  } catch (e) {
    const { tokenContract: tokenContractClient } = yield call(
      getTokenClient,
      tokenAddress,
      'DSToken'
    );
    symbol = yield call(tokenContractClient.symbol().call);
    decimals = yield call(tokenContractClient.decimals().call);
  }
  return {
    symbol,
    decimals
  };
}

export function* createOrUpdateDraft(action) {
  const { values, bountyId } = action;
  const draftBountyData = {
    ...values,
    private_fulfillments: values.privateFulfillments,
    platform: config.postingPlatform
  };
  draftBountyData.experienceLevel =
    DIFFICULTY_VALUES[draftBountyData.experienceLevel];

  const { paysTokens } = draftBountyData;
  const { web3 } = yield call(getWeb3Client);
  if (!paysTokens) {
    draftBountyData.fulfillment_amount = web3.utils.toWei(
      draftBountyData.fulfillment_amount,
      'ether'
    );
    draftBountyData.token_version = '0';
  } else {
    const { tokenContract } = draftBountyData;
    try {
      const { symbol, decimals } = yield call(getTokenData, tokenContract);
      draftBountyData.tokenSymbol = symbol;
      draftBountyData.tokenDecimals = BigNumber(decimals, 10).toString();
      draftBountyData.fulfillment_amount = calculateDecimals(
        draftBountyData.fulfillment_amount,
        decimals
      );
      draftBountyData.token_version = '20';
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
    calculated_fulfillment_amount,
    fulfillment_amount,
    paysTokens,
    privateFulfillments,
    fulfillers_need_approval,
    revisions,
    sourceDirectoryHash,
    sourceFileName,
    webReferenceURL,
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
      contractFulfillmentAmount = calculateDecimals(
        BigNumber(
          calculated_fulfillment_amount || fulfillment_amount,
          10
        ).toString(),
        decimals
      );
      contractBalance = calculateDecimals(
        BigNumber(balance, 10).toString(),
        BigNumber(decimals, 10).toString()
      );
    } catch (e) {
      yield put(setTransactionError());
      return yield put(stdBountyFail());
    }
  } else {
    contractFulfillmentAmount = web3.utils.toWei(
      BigNumber(
        calculated_fulfillment_amount || fulfillment_amount,
        10
      ).toString(),
      'ether'
    );
    contractBalance = web3.utils.toWei(
      BigNumber(balance, 10).toString(),
      'ether'
    );
  }

  const deadline = parseInt(moment(values.deadline).unix());
  const issuedData = {
    payload: {
      uid,
      title,
      description,
      sourceFileHash: '',
      sourceDirectoryHash,
      sourceFileName,
      webReferenceURL,
      categories,
      revisions,
      privateFulfillments,
      fulfillersNeedApproval: fulfillers_need_approval,
      created: parseInt(new Date().getTime() / 1000) | 0,
      tokenAddress: tokenContract || '',
      difficulty: DIFFICULTY_VALUES[experienceLevel],
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
      symbol: tokenSymbol,
      fulfillmentAmount: contractFulfillmentAmount
    },
    meta: {
      platform: siteConfig.postingPlatform,
      schemaVersion: siteConfig.postingSchemaVersion,
      schemaName: siteConfig.postingSchema
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
      yield call(
        promisifyContractCall(tokenContractClient.approve, {
          from: userAddress
        }),
        config[network].StandardBountiesV2,
        contractBalance
      );
      yield call(delay, 2000);
      const issuedBountyHash = yield call(
        promisifyContractCall(standardBounties.issueAndContribute, {
          from: userAddress,
          gas: 400000
        }),
        userAddress,
        [userAddress],
        [userAddress],
        ipfsHash,
        deadline,
        tokenContract || 0x0,
        20,
        contractBalance
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
      promisifyContractCall(standardBounties.issueAndContribute, {
        from: userAddress,
        value: contractBalance
      }),
      userAddress,
      [userAddress],
      [userAddress],
      ipfsHash,
      `${deadline}`,
      0x0,
      0,
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
  const { id, issuer } = action;
  const params = {
    issuer,
    platform__in: config.platform
  };

  try {
    const endpoint = `bounty/draft/${id}/`;
    const bounty = yield call(request, endpoint, 'GET', { params });
    yield put(getDraftSuccess(bounty));
  } catch (e) {
    yield put(getDraftFail(e));
  }
}

export function* getBounty(action) {
  const { id } = action;
  const params = {
    platform__in: config.platform
  };

  try {
    const endpoint = `bounty/${id}/`;
    const bounty = yield call(request, endpoint, 'GET', { params });
    yield put(getBountySuccess(bounty));
  } catch (e) {
    yield put(getBountyFail(e));
  }
}

export function* killBounty(action) {
  const { id, contract_version, currentBalance } = action;
  const userAddress = yield select(addressSelector);
  yield put(setPendingWalletConfirm());

  try {
    let txHash;
    const { standardBounties } = yield call(
      getContractClient,
      contract_version
    );
    if (contract_version === 1) {
      txHash = yield call(
        promisifyContractCall(standardBounties.killBounty, {
          from: userAddress
        }),
        id
      );
    } else if (contract_version === 2) {
      txHash = yield call(
        promisifyContractCall(standardBounties.drainBounty, {
          from: userAddress
        }),
        userAddress,
        id,
        0,
        [currentBalance]
      );
    } else {
      throw new Error(`contract version ${contract_version} invalid.`);
    }

    yield put(stdBountySuccess());
    yield put(setPendingReceipt(txHash));
  } catch (e) {
    yield put(stdBountyFail());
    yield put(setTransactionError());
  }
}

export function* activateBounty(action) {
  const { id, balance, paysTokens, decimals, tokenContract } = action;

  const userAddress = yield select(addressSelector);
  yield put(setPendingWalletConfirm());
  let contractBalance;
  if (paysTokens) {
    contractBalance = calculateDecimals(
      BigNumber(balance, 10).toString(),
      BigNumber(decimals, 10).toString()
    );
  } else {
    const { web3 } = yield call(getWeb3Client);
    contractBalance = web3.utils.toWei(
      BigNumber(balance, 10).toString(),
      'ether'
    );
  }
  try {
    const { standardBounties } = yield call(getContractClient, 1);
    let txHash;
    if (paysTokens) {
      const { tokenContract: tokenContractClient } = yield call(
        getTokenClient,
        tokenContract
      );
      const network = yield select(networkSelector);
      yield call(
        promisifyContractCall(tokenContractClient.approve, {
          from: userAddress
        }),
        config[network].standardBountiesAddress,
        contractBalance
      );
      yield call(delay, 2000);
      txHash = yield call(
        promisifyContractCall(standardBounties.activateBounty, {
          from: userAddress,
          gas: 200000
        }),
        id,
        contractBalance
      );
    } else {
      txHash = yield call(
        promisifyContractCall(standardBounties.activateBounty, {
          from: userAddress,
          value: contractBalance
        }),
        id,
        contractBalance
      );
    }
    yield put(stdBountySuccess());
    yield put(setPendingReceipt(txHash));
  } catch (e) {
    yield put(stdBountyFail());
    yield put(setTransactionError());
  }
}

export function* extendDeadline(action) {
  const { id, contract_version, deadline } = action;
  const userAddress = yield select(addressSelector);
  yield put(setPendingWalletConfirm());
  const formattedDeadline = parseInt(moment(deadline).unix());

  try {
    const { standardBounties } = yield call(
      getContractClient,
      contract_version
    );
    let txHash;
    if (contract_version === 1) {
      txHash = yield call(
        promisifyContractCall(standardBounties.extendDeadline, {
          from: userAddress
        }),
        id,
        `${formattedDeadline}`
      );
    } else if (contract_version === 2) {
      txHash = yield call(
        promisifyContractCall(standardBounties.changeDeadline, {
          from: userAddress
        }),
        userAddress,
        id,
        0,
        `${formattedDeadline}`
      );
    } else {
      throw new Error(`contract version ${contract_version} invalid.`);
    }
    yield put(stdBountySuccess());
    yield put(setPendingReceipt(txHash));
  } catch (e) {
    yield put(stdBountyFail());
    yield put(setTransactionError());
  }
}

export function* increasePayout(action) {
  const {
    id,
    fulfillmentAmount,
    balance,
    paysTokens,
    decimals,
    tokenContract,
    contract_version
  } = action;
  const userAddress = yield select(addressSelector);
  yield put(setPendingWalletConfirm());

  let contractFulfillmentAmount;
  let contractBalance;
  if (paysTokens) {
    contractFulfillmentAmount = calculateDecimals(
      BigNumber(fulfillmentAmount, 10).toString(),
      BigNumber(decimals, 10).toString()
    );
    contractBalance = calculateDecimals(
      BigNumber(balance, 10).toString(),
      BigNumber(decimals, 10).toString()
    );
  } else {
    const { web3 } = yield call(getWeb3Client);
    contractFulfillmentAmount = web3.utils.toWei(
      BigNumber(fulfillmentAmount, 10).toString(),
      'ether'
    );
    contractBalance = calculateDecimals(
      BigNumber(balance, 10).toString(),
      BigNumber(decimals, 10).toString()
    );
  }
  try {
    let txHash;
    const { standardBounties } = yield call(getContractClient);
    console.log('contract', contract_version);
    //if (contract_version)
    if (paysTokens) {
      const { tokenContract: tokenContractClient } = yield call(
        getTokenClient,
        tokenContract
      );
      const network = yield select(networkSelector);
      yield call(
        promisifyContractCall(tokenContractClient.approve, {
          from: userAddress
        }),
        config[network].standardBountiesAddress,
        contractBalance
      );
      yield call(delay, 2000);
      txHash = yield call(
        promisifyContractCall(standardBounties.increasePayout, {
          from: userAddress,
          gas: 200000
        }),
        id,
        contractFulfillmentAmount,
        contractBalance
      );
    } else {
      txHash = yield call(
        promisifyContractCall(standardBounties.increasePayout, {
          from: userAddress,
          value: contractBalance
        }),
        id,
        contractFulfillmentAmount,
        contractBalance
      );
    }
    yield put(stdBountySuccess());
    yield put(setPendingReceipt(txHash));
  } catch (e) {
    yield put(stdBountyFail());
    yield put(setTransactionError());
  }
}

export function* contribute(action) {
  const {
    id,
    value,
    paysTokens,
    decimals,
    tokenContract,
    user_address,
    contract_version
  } = action;

  const userAddress = yield select(addressSelector);
  yield put(setPendingWalletConfirm());
  let addedBalance;

  if (paysTokens) {
    addedBalance = calculateDecimals(value, decimals);
  } else {
    const { web3 } = yield call(getWeb3Client);
    addedBalance = web3.utils.toWei(BigNumber(value, 10).toString(), 'ether');
  }

  try {
    const { standardBounties } = yield call(
      getContractClient,
      contract_version
    );
    let txHash;
    let args =
      contract_version === 1
        ? [id, addedBalance]
        : [user_address, id, addedBalance];

    if (paysTokens) {
      const { tokenContract: tokenContractClient } = yield call(
        getTokenClient,
        tokenContract
      );
      const network = yield select(networkSelector);
      yield call(
        promisifyContractCall(tokenContractClient.approve, {
          from: userAddress
        }),
        config[network][`standardBountiesAddressV${contract_version}`],
        addedBalance
      );
      yield call(delay, 2000);
      txHash = yield call(
        promisifyContractCall(standardBounties.contribute, {
          from: userAddress,
          gas: 200000
        }),
        ...args
      );
    } else {
      txHash = yield call(
        promisifyContractCall(standardBounties.contribute, {
          from: userAddress,
          value: addedBalance
        }),
        ...args
      );
    }

    yield put(stdBountySuccess());
    yield put(setPendingReceipt(txHash));
  } catch (e) {
    yield put(stdBountyFail());
    yield put(setTransactionError());
  }
}

export function* transferIssuer(action) {
  const { id, contract_version, address } = action;
  const userAddress = yield select(addressSelector);
  yield put(setPendingWalletConfirm());

  try {
    const { standardBounties } = yield call(
      getContractClient,
      contract_version
    );
    let txHash;
    if (contract_version === 1) {
      txHash = yield call(
        promisifyContractCall(standardBounties.transferIssuer, {
          from: userAddress
        }),
        id,
        address
      );
    } else if (contract_version === 2) {
      txHash = yield call(
        promisifyContractCall(standardBounties.changeIssuer, {
          from: userAddress
        }),
        userAddress,
        id,
        0,
        0,
        address
      );
    } else {
      throw new Error(`contract version ${contract_version} invalid.`);
    }

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

export function* watchIncreasePayout() {
  yield takeLatest(INCREASE_PAYOUT, increasePayout);
}

export function* watchTransferIssuer() {
  yield takeLatest(TRANSFER_OWNERSHIP, transferIssuer);
}

export function* watchContribute() {
  yield takeLatest(CONTRIBUTE, contribute);
}

export default [
  watchGetDraft,
  watchCreateDraft,
  watchCreateBounty,
  watchGetBounty,
  watchKillBounty,
  watchActivateBounty,
  watchExtendDeadline,
  watchIncreasePayout,
  watchTransferIssuer,
  watchContribute
];
