import { hasUserSignedUp } from 'public-modules/Authentication/selectors';
import { takeLatest, put, select } from 'redux-saga/effects';
import { actions as authActions } from 'public-modules/Authentication';
import { actionTypes as authActionTypes } from 'public-modules/Authentication';
import { actionTypes as settingsActionTypes } from 'public-modules/Settings';
import { actions } from './reducer';

const { LOGIN_SUCCESS } = authActionTypes;
const { SAVE_SETTINGS_SUCCESS } = settingsActionTypes;
const { resetLoginState } = authActions;
const { showLogin, setStage } = actions;

function* loginSuccess() {
  const signedUp = yield select(hasUserSignedUp);
  yield signedUp ? put(showLogin(false)) : put(setStage('profile'));
}

function* saveSettings() {
  yield put(resetLoginState());
}

export function* watchLogin() {
  yield takeLatest(LOGIN_SUCCESS, loginSuccess);
}

export function* watchSaveSettings() {
  yield takeLatest(SAVE_SETTINGS_SUCCESS, saveSettings);
}

export default [watchLogin, watchSaveSettings];
