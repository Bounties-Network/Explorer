import React from 'react';
import request from 'utils/request';
import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { Link } from 'react-router-dom';
import { toast as callToast } from 'react-toastify';
import { Toast } from 'components';
import { actionTypes } from 'public-modules/Settings';

const {
  SAVE_EMAIL_PREFERENCES_SUCCESS,
  SAVE_EMAIL_PREFERENCES_FAIL
} = actionTypes;

let lastToast;
export function* sendEmailSettingsToast(action) {
  let postedMessage = 'Email preferences saved successfully';
  let toastType = Toast.TYPE.SUCCESS;

  if (action.type === SAVE_EMAIL_PREFERENCES_FAIL) {
    postedMessage = 'Something went wrong. Please try again.';
    toastType = Toast.TYPE.ERROR;
  }

  const id = yield call(Toast, toastType, postedMessage, null);

  if (lastToast) {
    callToast.dismiss(lastToast);
  }

  lastToast = id;
}

export function* watchSetEmailSettings() {
  yield takeLatest(
    [SAVE_EMAIL_PREFERENCES_SUCCESS, SAVE_EMAIL_PREFERENCES_FAIL],
    sendEmailSettingsToast
  );
}

export default [watchSetEmailSettings];
