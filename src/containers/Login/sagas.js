import web3 from 'public-modules/Utilities/Web3Client';
import config from 'public-modules/config';
import { hasUserSignedUp } from 'public-modules/Authentication/selectors';
import { takeLatest, put, select } from 'redux-saga/effects';
import { actionTypes as authActionTypes } from 'public-modules/Authentication';
import { actionTypes as settingsActionTypes } from 'public-modules/Settings';
import { actions } from './reducer';

const { LOGIN_SUCCESS } = authActionTypes;
const { SAVE_SETTINGS_SUCCESS } = settingsActionTypes;
const { showLogin, setStage } = actions;

function* loginSuccess() {
  const signedUp = yield select(hasUserSignedUp);
  yield signedUp ? put(showLogin(false)) : put(setStage('profile'));
}

function* saveSettings() {
  yield put(showLogin(false));
  yield put(setStage('profile'));
}

export function* watchLogin() {
  yield takeLatest(LOGIN_SUCCESS, loginSuccess);
}

export function* watchSaveSettings() {
  yield takeLatest(SAVE_SETTINGS_SUCCESS, loginSuccess);
}

export default [watchLogin, watchSaveSettings];
