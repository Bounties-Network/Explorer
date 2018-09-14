import config from 'public-modules/config';
import { call, put, select, take, takeLatest } from 'redux-saga/effects';
import { actionTypes } from 'layout/App/reducer';
import { actionTypes as clientActionTypes } from 'public-modules/Client';

const { GET_TOKEN_BALANCE } = actionTypes;
const { GET_TOKEN_BALANCE_SUCCESS, GET_TOKEN_BALANCE_FAIL } = clientActionTypes;

export function* getTokenBalance(action) {
  const { resolve, reject } = action;

  console.log('waiting');
  const result = yield take([
    GET_TOKEN_BALANCE_SUCCESS,
    GET_TOKEN_BALANCE_FAIL
  ]);
  console.log('got result', result);

  if (result === GET_TOKEN_BALANCE_FAIL) {
    reject();
    return;
  }

  resolve(result.balance);
}

export function* watchGetTokenBalance() {
  yield takeLatest(GET_TOKEN_BALANCE, getTokenBalance);
}

export default [watchGetTokenBalance];
