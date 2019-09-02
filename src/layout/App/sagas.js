import request from 'utils/request';
import { take, takeLatest, select, put, call } from 'redux-saga/effects';
import { actions, actionTypes } from 'layout/App/reducer';
import { actionTypes as clientActionTypes } from 'public-modules/Client';
import { lastLocationSelector } from './selectors';
import { LOCATION_CHANGE } from 'connected-react-router';

const { setLastLocation } = actions;
const { GET_TOKEN_BALANCE } = actionTypes;
const { GET_TOKEN_BALANCE_SUCCESS, GET_TOKEN_BALANCE_FAIL } = clientActionTypes;

export function* issuePageView(action) {
  const location = action.payload;
  const lastLocation = yield select(lastLocationSelector);

  if (
    lastLocation == null ||
    (location.pathname !== lastLocation.pathname &&
      location.pathname !== '/' &&
      location.pathname !== '/profile')
  ) {
    yield call(request, 'analytics/ping/', 'GET');
  }

  yield put(setLastLocation(action.payload));
}

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

export function* watchLocationChange() {
  yield takeLatest(LOCATION_CHANGE, issuePageView);
}

export default [watchGetTokenBalance, watchLocationChange];
