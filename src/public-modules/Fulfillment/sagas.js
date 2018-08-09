import request from 'utils/request';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Fulfillment';
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
  LOAD_FULFILLMENT,
  CREATE_FULFILLMENT,
  ACCEPT_FULFILLMENT
} = actionTypes;

const {
  setPendingWalletConfirm,
  setTransactionError,
  setPendingReceipt
} = transactionActions;

const {
  loadFulfillmentSuccess,
  loadFulfillmentFail,
  createFulfillmentSuccess,
  createFulfillmentFail,
  acceptFulfillmentSuccess,
  acceptFulfillmentFail
} = actions;

export function* loadFulfillment(action) {
  const { id } = action;
  try {
    let endpoint = `fulfillment/${id}`;
    const fulfillment = yield call(request, endpoint, 'GET');
    yield put(loadFulfillmentSuccess(fulfillment));
  } catch (e) {
    yield put(loadFulfillmentFail(e));
  }
}

export function* createFulfillment(action) {
  const { bountyId, data } = action;
  const {
    name,
    email,
    link,
    description,
    fileName,
    ipfsHash: fulfillmentDataHash
  } = data;

  yield put(setPendingWalletConfirm());

  const userAddress = yield select(addressSelector);
  const { web3 } = yield call(getWeb3Client);

  const payload = {
    payload: {
      description: description,
      sourceFileName: fileName,
      sourceDirectoryHash: fulfillmentDataHash,
      sourceFileHash: '',
      fulfiller: {
        email: email,
        address: userAddress,
        name: name
      }
    },
    meta: {
      platform: 'bounties-network',
      schemaVersion: '0.1',
      schemaName: 'standardSchema'
    }
  };

  const ipfsHash = yield call(addJSON, payload);

  const { standardBounties } = yield call(getContractClient);
  try {
    const txHash = yield call(
      promisifyContractCall(standardBounties.fulfillBounty, {
        from: userAddress
      }),
      bountyId,
      ipfsHash
    );

    yield put(setPendingReceipt(txHash));
    yield put(createFulfillmentSuccess());
  } catch (e) {
    console.log(e);
    yield put(setTransactionError());
    yield put(createFulfillmentFail());
  }
}

export function* watchFulfillment() {
  yield takeLatest(LOAD_FULFILLMENT, loadFulfillment);
}

export function* watchCreateFulfillment() {
  yield takeLatest(CREATE_FULFILLMENT, createFulfillment);
}

export function* watchAcceptFulfillment() {
  yield takeLatest(ACCEPT_FULFILLMENT, createFulfillment);
}

export default [
  watchFulfillment,
  watchCreateFulfillment,
  watchAcceptFulfillment
];
