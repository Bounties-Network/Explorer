import request from 'utils/request';
import moment from 'moment';
import config from 'public-modules/config';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Bounty';
import { actions as transactionActions } from 'public-modules/Transaction';
import { calculateDecimals } from 'public-modules/Utilities/helpers';
import { addJSON } from 'public-modules/Utilities/ipfsClient';
import {
  addressSelector,
  networkSelector
} from 'public-modules/Client/selectors';
import {
  getContractClient,
  getWeb3Client,
  getTokenClient
} from 'public-modules/Client/sagas';

const { CREATE_DRAFT, CREATE_BOUNTY } = actionTypes;
const {
  createDraftSuccess,
  createDraftFail,
  createBountySuccess,
  createBountyFail
} = actions;

const { setTransaction } = transactionActions;

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

export function* createDraft(action) {
  const { values } = action;
  const draftBountyData = { ...values };

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
      // call error toast here - contract isn't a proper erc20 token.
    }
  }
  draftBountyData.deadline = moment(draftBountyData.deadline)
    .utc()
    .toISOString();
  const endpoint = 'bounty/draft/';

  try {
    const bounty = yield call(request, endpoint, 'POST', {
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
    fulfillmentAmount,
    paysTokens
  } = values;

  const userAddress = yield select(addressSelector);
  const { web3 } = yield call(getWeb3Client);

  if (paysTokens) {
    try {
      const { symbol, decimals } = yield call(getTokenData, tokenContract);
      tokenSymbol = symbol;
      tokenDecimals = parseInt(decimals);
      contractFulfillmentAmount = calculateDecimals(
        fulfillmentAmount,
        decimals
      );
      contractBalance = calculateDecimals(balance, decimals);
    } catch (e) {
      console.log(e);
      // call error toast here - contract isn't a proper erc20 token.
    }
  } else {
    contractFulfillmentAmount = web3.utils.toWei(fulfillmentAmount, 'ether');
    contractBalance = web3.utils.toWei(balance, 'ether');
  }
  const deadline = moment(values.deadline)
    .utc()
    .toDate()
    .getTime();
  const issuedData = {
    payload: {
      title,
      description,
      sourceFileHash: '',
      sourceDirectoryHash: '',
      sourceFileName: '',
      webReferenceUrl: '',
      categories,
      created: (new Date().getTime() / 1000) | 0,
      tokenAddress: tokenContract || '',
      experienceLevel,
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
      meta: {
        platform: 'bounties-network',
        schemaVersion: '0.1',
        schemaName: 'standardSchema'
      }
    }
  };
  const ipfsHash = yield call(addJSON, issuedData);
  if (paysTokens) {
    const { tokenContract: tokenContractClient } = yield call(
      getTokenClient,
      tokenContract
    );
    try {
      const network = yield select(networkSelector);
      yield call(
        tokenContractClient.approve(
          config[network].standardBountiesAddress,
          contractBalance
        ).send,
        { from: userAddress }
      );
    } catch (e) {
      console.log(e);
      // token transfer failed
    }
  }
  const { standardBounties } = yield call(getContractClient);
  try {
    yield call(
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
    );
    yield put(createBountySuccess());
  } catch (e) {
    console.log(e);
    yield put(createDraftFail());
  }
}

export function* watchCreateDraft() {
  yield takeLatest(CREATE_DRAFT, createDraft);
}

export function* watchCreateBounty() {
  yield takeLatest(CREATE_BOUNTY, createBounty);
}

export default [watchCreateDraft, watchCreateBounty];
