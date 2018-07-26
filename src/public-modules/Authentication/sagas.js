import request from 'utils/request';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { addressSelector } from 'public-modules/Client/selectors';
import { actionTypes, actions } from 'public-modules/Authentication';
import { actionTypes as clientActionTypes } from 'public-modules/Client';
import { getWeb3Client } from 'public-modules/Client/sagas';
import { promisify } from 'public-modules/Utilities/helpers';
import { get } from 'lodash';

const { SET_INITIALIZED } = clientActionTypes;
const { LOGIN, LOGOUT, GET_CURRENT_USER } = actionTypes;
const {
  getCurrentUser: getCurrentUserAction,
  getCurrentUserSuccess,
  getCurrentUserFail,
  loginSuccess,
  loginFail,
  logoutSuccess,
  logoutFail
} = actions;

export function* getCurrentUser(action) {
  const endpoint = 'auth/user/';
  try {
    const currentUser = yield call(request, endpoint, 'GET');
    yield put(getCurrentUserSuccess(currentUser));
  } catch (e) {
    if (get('errorStatus', e) === 401) {
      yield put(getCurrentUserSuccess());
    } else {
      yield put(getCurrentUserFail(e));
    }
  }
}

export function* login(action) {
  let signature;
  const address = yield select(addressSelector);
  const nonceEndpoint = `auth/user/${address}/nonce/`;
  const loginEndpoint = 'auth/login/';
  try {
    const nonceResponce = yield call(request, nonceEndpoint, 'GET');
    const nonce = nonceResponce.nonce;
    const { web3, proxiedWeb3 } = yield call(getWeb3Client);
    const message = web3.utils.fromUtf8(
      'Hi there! Your special nonce: ' + nonce
    );
    const signature = yield proxiedWeb3.eth.personal.sign(message, address);
    const loginOptions = {
      data: {
        public_address: address,
        signature
      }
    };
    const currentUser = yield call(
      request,
      loginEndpoint,
      'POST',
      loginOptions
    );
    yield put(loginSuccess(currentUser));
  } catch (e) {
    yield put(loginFail(e));
  }
}

export function* logout(action) {
  const endpoint = 'auth/logout/';
  try {
    yield call(request, endpoint, 'GET');
    yield put(logoutSuccess());
    yield put(push('/explorer'));
  } catch (e) {
    yield put(logoutFail(e));
  }
}

export function* watchGetCurrentUser() {
  yield takeLatest(SET_INITIALIZED, getCurrentUser);
}

export function* watchLogin() {
  yield takeLatest(LOGIN, login);
}

export function* watchLogout() {
  yield takeLatest(LOGOUT, logout);
}

export default [watchLogin, watchLogout, watchGetCurrentUser];
