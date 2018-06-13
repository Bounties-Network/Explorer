import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Authentication';

const { LOAD_NONCE, LOGIN, CHECK_LOGINSTATUS } = actionTypes;
const {
  loadNonceFail,
  loadNonceSuccess,
  loginFail,
  loginSuccess,
  checkLoginStatusFail,
  checkLoginStatusSuccess
} = actions;

export function* loadNonce(action) {
  let { address } = action;
  try {
    let endpoint = `auth/user/${address}/nonce/`;
    const url = yield call(request, endpoint, 'GET');
    yield put(loadNonceSuccess(url));
  } catch (e) {
    yield put(loadNonceFail(e));
  }
}

export function* watchNonce() {
  yield takeLatest(LOAD_NONCE, loadNonce);
}

export function* login(action) {
  let { address, signature } = action;
  let options = {
    method: 'POST',
    data: {
      public_address: address,
      signature: signature
    }
  };

  try {
    let endpoint = `auth/login/`;
    const url = yield call(request, endpoint, 'POST', options);
    yield put(loginSuccess(url));
  } catch (e) {
    yield put(loginFail(e));
  }
}

export function* watchLogin() {
  yield takeLatest(LOGIN, login);
}

export function* checkLoginStatus(action) {
  try {
    let endpoint = 'auth/user/';
    const loginStatus = yield call(request, endpoint, 'GET');
    yield put(checkLoginStatusSuccess(loginStatus));
  } catch (e) {
    yield put(checkLoginStatusFail(e));
  }
}

export function* watchLoginStatus() {
  yield takeLatest(CHECK_LOGINSTATUS, checkLoginStatus);
}

export default [watchNonce, watchLogin, watchLoginStatus];
