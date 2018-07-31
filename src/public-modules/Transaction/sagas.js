import request from 'utils/request';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { addressSelector } from 'public-modules/Client/selectors';
import { each } from 'lodash';
import { transactionsSelector } from 'public-modules/Transaction/selectors';
import { actions, actionTypes } from 'public-modules/Transaction';

const {
  loadTransactions,
  loadTransactionsSuccess,
  loadTransactionsFail,
  addTransaction,
  setTransactionCompleted
} = actions;

const { LOAD_TRANSACTIONS } = actionTypes;

export function* loadTransactionsSaga(action) {
  try {
    const address = yield select(addressSelector);
    const currentTransactions = yield select(transactionsSelector);
    const endpoint = `notification/transaction/user/${address}`;
    const response = yield call(request, endpoint, 'GET');
    const transactions = response.results;
    yield put(loadTransactionsSuccess());
    for (let transaction in transactions) {
      const { tx_hash, ...rest } = transaction;
      if (!currentTransactions[tx_hash]) {
        yield put(addTransaction(rest, tx_hash));
      }

      const wasViewed = currentTransactions[tx_hash].viewed;
      const isViewed = transaction.viewed;
      // if the viewed field do not match up, this means there was an issue with setting the transactiion as viewed
      // or a delay on the write to the api
      if (currentTransactions[tx_hash] && wasViewed === isViewed) {
        yield put(setTransactionCompleted(tx_hash));
      }
    }
  } catch (e) {
    yield put(loadTransactionsFail(e));
  }
}

export function* watchTransactions() {
  yield takeLatest(LOAD_TRANSACTIONS, loadTransactionsSaga);
}

export function* loopTransactions() {
  while (true) {
    yield put(loadTransactions());
    yield delay(5000);
  }
}

export default [loopTransactions, watchTransactions];
