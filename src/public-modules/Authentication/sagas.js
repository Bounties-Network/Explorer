import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Authentication';

const { LOAD_NONCE, LOGIN, GET_CURRENT_USER } = actionTypes;
const {
  getCurrentUserSuccess,
  getCurrentUserFail,
  loadNonceSuccess,
  loadNonceFail,
  loginSuccess,
  loginFail
} = actions;

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

export function* getCurrentUser(action) {
  const endpoint = 'auth/user/';
  try {
    const currentUser = yield call(request, endpoint, 'GET');
    yield put(getCurrentUserSuccess(currentUser));
  } catch (e) {
    yield put(getCurrentUserFail(e));
  }
}

export function* watchNonce() {
  yield takeLatest(LOAD_NONCE, loadNonce);
}

export function* watchLogin() {
  yield takeLatest(LOGIN, login);
}

export function* watchGetCurrentUser() {
  yield takeLatest(GET_CURRENT_USER, getCurrentUser);
}

export default [watchNonce, watchLogin, watchGetCurrentUser];
