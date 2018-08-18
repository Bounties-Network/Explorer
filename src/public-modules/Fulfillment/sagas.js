import request from 'utils/request';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Fulfillment';
import { actions as transactionActions } from 'public-modules/Transaction';
import { addressSelector } from 'public-modules/Client/selectors';
import {
  promisifyContractCall
} from 'public-modules/Utilities/helpers';
import { addJSON } from 'public-modules/Utilities/ipfsClient';
import {
  getContractClient,
  getWeb3Client,
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
    url,
    description,
    fileName,
    ipfsHash: fulfillmentDataHash
  } = data;

  yield put(setPendingWalletConfirm());

  const userAddress = yield select(addressSelector);
  yield call(getWeb3Client);

  const payload = {
    payload: {
      url,
      description,
      sourceFileName: fileName,
      sourceDirectoryHash: fulfillmentDataHash,
      sourceFileHash: '',
      fulfiller: {
        email,
        userAddress,
        name
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

export function* acceptFulfillment(action) {
  const { bountyId, fulfillmentId } = action;

  yield put(setPendingWalletConfirm());

  const userAddress = yield select(addressSelector);
  yield call(getWeb3Client);

  const { standardBounties } = yield call(getContractClient);
  try {
    const txHash = yield call(
      promisifyContractCall(standardBounties.acceptFulfillment, {
        from: userAddress
      }),
      bountyId,
      fulfillmentId
    );

    yield put(setPendingReceipt(txHash));
    yield put(acceptFulfillmentSuccess());
  } catch (e) {
    console.log(e);
    yield put(setTransactionError());
    yield put(acceptFulfillmentFail());
  }
}

export function* watchFulfillment() {
  yield takeLatest(LOAD_FULFILLMENT, loadFulfillment);
}

export function* watchCreateFulfillment() {
  yield takeLatest(CREATE_FULFILLMENT, createFulfillment);
}

export function* watchAcceptFulfillment() {
  yield takeLatest(ACCEPT_FULFILLMENT, acceptFulfillment);
}

export default [
  watchFulfillment,
  watchCreateFulfillment,
  watchAcceptFulfillment
];
