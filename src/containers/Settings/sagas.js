import { call, takeLatest } from 'redux-saga/effects';
import { toast as callToast } from 'react-toastify';
import { Toast } from 'components';
import { actionTypes } from 'public-modules/Settings';

const {
  SAVE_SETTINGS_SUCCESS,
  SAVE_SETTINGS_FAIL,
  SAVE_EMAIL_PREFERENCES_SUCCESS,
  SAVE_EMAIL_PREFERENCES_FAIL
} = actionTypes;

let lastProfileToast;
export function* sendProfileUpdatedToast(action) {
  let postedMessage = 'Profile saved successfully';
  let toastType = Toast.TYPE.SUCCESS;

  if (action.type === SAVE_SETTINGS_FAIL) {
    postedMessage = 'Something went wrong. Please try again.';
    toastType = Toast.TYPE.ERROR;
  }

  const id = yield call(Toast, toastType, postedMessage, null);

  if (lastProfileToast) {
    callToast.dismiss(lastProfileToast);
  }

  lastProfileToast = id;
}

let lastEmailToast;
export function* sendEmailSettingsUpdatedToast(action) {
  let postedMessage = 'Email preferences saved successfully';
  let toastType = Toast.TYPE.SUCCESS;

  if (action.type === SAVE_EMAIL_PREFERENCES_FAIL) {
    postedMessage = 'Something went wrong. Please try again.';
    toastType = Toast.TYPE.ERROR;
  }

  const id = yield call(Toast, toastType, postedMessage, null);

  if (lastEmailToast) {
    callToast.dismiss(lastEmailToast);
  }

  lastEmailToast = id;
}

export function* watchSaveProfile() {
  yield takeLatest(
    [SAVE_SETTINGS_SUCCESS, SAVE_SETTINGS_FAIL],
    sendProfileUpdatedToast
  );
}

export function* watchSetEmailSettings() {
  yield takeLatest(
    [SAVE_EMAIL_PREFERENCES_SUCCESS, SAVE_EMAIL_PREFERENCES_FAIL],
    sendEmailSettingsUpdatedToast
  );
}

export default [watchSaveProfile, watchSetEmailSettings];
