import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Authentication';
import { actionTypes as clientActionTypes } from 'public-modules/Client';
import { get } from 'lodash';

const { SET_INITIALIZED } = clientActionTypes;
const { LOAD_NONCE, LOGIN, GET_CURRENT_USER } = actionTypes;
const {
  getCurrentUser: getCurrentUserAction,
  getCurrentUserSuccess,
  getCurrentUserFail,
  loadNonceSuccess,
  loadNonceFail,
  loginSuccess,
  loginFail
} = actions;

export function* getCurrentUser(action) {
  const endpoint = 'auth/user/';
  try {
    const currentUser = yield call(request, endpoint, 'GET');
    yield put(getCurrentUserSuccess(currentUser));
  } catch (e) {
    if (get('errorStatus', e) === 401) {
      console.log('success');
      yield put(getCurrentUserSuccess());
    } else {
      yield put(getCurrentUserFail(e));
    }
  }
}

export function* loadNonce(action) {
  const { address } = action;
  const endpoint = `auth/user/${address}/nonce/`;
  try {
    const nonce = yield call(request, endpoint, 'GET');
    yield put(loadNonceSuccess(nonce));
  } catch (e) {
    yield put(loadNonceFail(e));
  }
}

export function* login(action) {
  const { address, signature } = action;
  const endpoint = `auth/login/`;
  const options = {
    data: {
      public_address: address,
      signature: signature
    }
  };

  try {
    const currentUser = yield call(request, endpoint, 'POST', options);
    yield put(loginSuccess(currentUser));
  } catch (e) {
    // need proper logic in here to check for 401 whih should not actually be treated as an error
    yield put(loginFail(e));
  }
}

function* loadCurrentUser() {
  yield put(getCurrentUserAction());
}

export function* watchSetInitialized() {
  yield takeLatest(SET_INITIALIZED, loadCurrentUser);
}

export function* watchGetCurrentUser() {
  yield takeLatest(GET_CURRENT_USER, getCurrentUser);
}

export function* watchNonce() {
  yield takeLatest(LOAD_NONCE, loadNonce);
}

export function* watchLogin() {
  yield takeLatest(LOGIN, login);
}

export default [
  watchNonce,
  watchLogin,
  watchGetCurrentUser,
  watchSetInitialized
];
