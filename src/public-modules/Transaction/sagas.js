import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { addressSelector } from 'public-modules/Client/selectors';
import { actions, actionTypes } from 'public-modules/Transaction';

const { loadTransactionsSuccess, loadTransactionsFail } = actions;

const { LOAD_TRANSACTIONS } = actionTypes;

export function* loadTransactions(action) {
  try {
    const address = yield select(addressSelector);
    const currentTransactions = yield select(transactionsSelector);
    let endpoint = `notification/transaction/user/${address}`;
    const transactions = yield call(request, endpoint);
    yield put(loadTransactionsSuccess());
  } catch (e) {
    yield put(loadTransactionsFail(e));
  }
}

export function* watchTransactions() {
  yield takeLatest(LOAD_TRANSACTIONS, loadTransactions);
}

export default [];
