import { take, takeLatest } from 'redux-saga/effects';
import { actionTypes } from 'layout/App/reducer';
import { actionTypes as clientActionTypes } from 'public-modules/Client';

const { GET_TOKEN_BALANCE } = actionTypes;
const { GET_TOKEN_BALANCE_SUCCESS, GET_TOKEN_BALANCE_FAIL } = clientActionTypes;

export function* getTokenBalance(action) {
  const { resolve, reject } = action;

  const result = yield take([
    GET_TOKEN_BALANCE_SUCCESS,
    GET_TOKEN_BALANCE_FAIL
  ]);

  if (result.type === GET_TOKEN_BALANCE_FAIL) {
    reject(result.error);
    return;
  }

  resolve(result.balance, result.symbol);
}

export function* watchGetTokenBalance() {
  yield takeLatest(GET_TOKEN_BALANCE, getTokenBalance);
}

export default [watchGetTokenBalance];
