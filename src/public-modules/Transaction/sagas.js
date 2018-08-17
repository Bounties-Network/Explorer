import React from 'react';
import request from 'utils/request';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  addressSelector,
  networkSelector
} from 'public-modules/Client/selectors';
import { toast as callToast } from 'react-toastify';
import { Toast } from 'components';
import { Link } from 'react-router-dom';
import {
  transactionsSelector,
  getTransactionSelector,
  transactionsInitiatedSelector
} from 'public-modules/Transaction/selectors';
import { actions, actionTypes } from 'public-modules/Transaction';

const {
  loadTransactions,
  loadTransactionsSuccess,
  loadTransactionsFail,
  postTransaction,
  postTransactionSuccess,
  postTransactionFail,
  addTransaction,
  setTransactionCompleted
} = actions;

const {
  LOAD_TRANSACTIONS,
  POST_TRANSACTION,
  SET_PENDING_RECEIPT,
  ADD_TRANSACTION,
  CLOSE_WALKTHROUGH,
  SET_TRANSACTION_COMPLETED
} = actionTypes;

export function* loadTransactionsSaga(action) {
  try {
    const address = yield select(getUserAddressSelector);
    if (!address) {
      return null;
    }
    const currentTransactions = yield select(transactionsSelector);
    const endpoint = `notification/transaction/user/${address}/`;
    const response = yield call(request, endpoint, 'GET');
    const transactions = response.results;
    for (let key in transactions) {
      const transaction = transactions[key];
      const { tx_hash, data, ...rest } = transaction;
      const { link, linkText, message } = data;
      const prevTransaction = currentTransactions[tx_hash];
      if (!prevTransaction) {
        yield put(addTransaction({ ...rest, link, linkText }, tx_hash));
      }

      const wasCompleted = prevTransaction && prevTransaction.completed;
      const isCompleted = transaction.completed;
      if (prevTransaction && wasCompleted !== isCompleted) {
        yield put(setTransactionCompleted(tx_hash, link, linkText, message));
      }
    }
    yield put(loadTransactionsSuccess());
  } catch (e) {
    console.log(e);
    yield put(loadTransactionsFail(e));
  }
}

export function* postTransactionSaga(action) {
  const { txHash, type } = action;

  if (type === SET_PENDING_RECEIPT) {
    return yield put(postTransaction(txHash));
  }

  try {
    const address = yield select(getUserAddressSelector);
    const endpoint = `notification/transaction/user/${address}/`;
    yield call(request, endpoint, 'POST', {
      data: {
        tx_hash: txHash,
        platform: config.postingPlatform
      }
    });
    yield put(postTransactionSuccess(txHash));
  } catch (e) {
    yield put(postTransactionFail(txHash));
  }
}

export function* pendingReceiptSaga(action) {
  const { txHash } = action;
  yield put(
    addTransaction(
      {
        viewed: false,
        completed: false,
        link: '',
        linkText: ''
      },
      txHash
    )
  );
}

let pendingToasts = {};
export function* showTransactionNotification(action) {
  const { txHash } = action;
  const transactionsInitiated = yield select(transactionsInitiatedSelector);
  if (!transactionsInitiated) {
    return null;
  }

  const currentTransaction = yield select(getTransactionSelector(txHash));
  const network = yield select(networkSelector);
  const { link, linkText, message } = currentTransaction;
  let postedLink = (
    <Link to={link} style={{ color: 'inherit' }}>
      {linkText}
    </Link>
  );
  let postedMessage = message;
  let toastType = Toast.TYPE.SUCCESS;

  if (!currentTransaction.completed) {
    const baseUrl =
      network === 'mainNet'
        ? 'https://etherscan.io/tx/'
        : 'https://rinkeby.etherscan.io/tx/';
    postedLink = (
      <a href={baseUrl + txHash} style={{ color: 'inherit' }}>
        View on etherscan
      </a>
    );
    postedMessage = 'Processing transaction';
    toastType = Toast.TYPE.TRANSACTION;
  }

  const prevToastID = pendingToasts[txHash];
  if (prevToastID) {
    callToast.dismiss(prevToastID);
  }
  const id = yield call(Toast, toastType, postedMessage, postedLink);
  pendingToasts[txHash] = id;
}

export function* watchForTransactionToasts() {
  yield takeLatest(
    [ADD_TRANSACTION, SET_TRANSACTION_COMPLETED],
    showTransactionNotification
  );
}

export function* watchPostTransactions() {
  yield takeLatest(
    [POST_TRANSACTION, SET_PENDING_RECEIPT],
    postTransactionSaga
  );
}

export function* watchTransactions() {
  yield takeLatest(LOAD_TRANSACTIONS, loadTransactionsSaga);
}

export function* watchPendingReceipt() {
  yield takeLatest(SET_PENDING_RECEIPT, pendingReceiptSaga);
}

export function* loopTransactions() {
  while (true) {
    yield put(loadTransactions());
    yield delay(5000);
  }
}

export default [
  loopTransactions,
  watchTransactions,
  watchPendingReceipt,
  watchPostTransactions,
  watchForTransactionToasts
];
