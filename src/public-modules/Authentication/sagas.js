import request from 'utils/request';
import { delay } from 'redux-saga';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { addressSelector } from 'public-modules/Client/selectors';
import { actionTypes, actions } from 'public-modules/Authentication';
import { actionTypes as clientActionTypes } from 'public-modules/Client';
import { actionTypes as settingsActionTypes } from 'public-modules/Settings';
import { actions as notificationActions } from 'public-modules/Notification';
import { getWeb3Client } from 'public-modules/Client/sagas';
import cookie from 'cookie';
import apolloClient, { authCookie, wsClient } from 'lib/apollo-client';
import { get } from 'lodash';

const { SET_INITIALIZED } = clientActionTypes;
const { LOGIN, LOGOUT } = actionTypes;
const {
  SAVE_SETTINGS_SUCCESS,
  SAVE_EMAIL_PREFERENCES_SUCCESS
} = settingsActionTypes;
const {
  getCurrentUserSuccess,
  getCurrentUserFail,
  loginSuccess,
  loginFail,
  logoutSuccess,
  logoutFail
} = actions;
const { loadNotifications } = notificationActions;

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

function* setAuthorizationCookie(token) {
  document.cookie = cookie.serialize('Authorization', token, {
    path: '/',
    maxAge: 365 * 24 * 60 * 60 * 100,
    domain:
      window && window.location.hostname.includes('localhost')
        ? window.location.hostname
        : '.' + window.location.hostname
  });
}

function* deleteAuthorizationCookie() {
  document.cookie = cookie.serialize('Authorization', null, {
    path: '/',
    maxAge: 0,
    domain:
      window && window.location.hostname.includes('localhost')
        ? window.location.hostname
        : '.' + window.location.hostname
  });
}

export function* login(action) {
  const address = yield select(addressSelector);
  const nonceEndpoint = `auth/${address}/nonce/`;
  const loginJWTEndpoint = 'auth/login/jwt/';
  try {
    const nonceResponce = yield call(request, nonceEndpoint, 'GET');
    const nonce = nonceResponce.nonce;
    const signedUp = nonceResponce.has_signed_up;
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
    const { token, user } = yield call(
      request,
      loginJWTEndpoint,
      'POST',
      loginOptions
    );
    if (window.location.host.includes('localhost')) {
      yield setAuthorizationCookie(token);
    }
    yield put(loginSuccess(user, signedUp));

    // Wait till Authorization cookie is set
    while (!authCookie()) {
      yield delay(2000);
    }
    yield apolloClient().resetStore();
    yield apolloClient().stop();
    yield wsClient.close(false, false);
    // Reinit apollo client
    yield call(apolloClient, true)
    yield delay(2000);
    yield put(loadNotifications());
  } catch (e) {
    yield put(loginFail(e));
  }
}

export function* logout(action) {
  const endpoint = 'auth/logout/';
  try {
    yield call(request, endpoint, 'GET');
    yield deleteAuthorizationCookie();
    yield put(logoutSuccess());

    // Terminate apollo graphql client
    while (authCookie()) {
      yield delay(500);
    }
    window.location.reload();
  } catch (e) {
    yield put(logoutFail(e));
  }
}

export function* watchGetCurrentUser() {
  yield takeLatest(
    [SET_INITIALIZED, SAVE_SETTINGS_SUCCESS, SAVE_EMAIL_PREFERENCES_SUCCESS],
    getCurrentUser
  );
}

export function* watchLogin() {
  yield takeLatest(LOGIN, login);
}

export function* watchLogout() {
  yield takeLatest(LOGOUT, logout);
}

export default [watchLogin, watchLogout, watchGetCurrentUser];
