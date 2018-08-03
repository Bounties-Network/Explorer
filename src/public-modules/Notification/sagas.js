import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Notification';

import { actionTypes as clientActionTypes } from 'public-modules/Client';
const { SET_ADDRESS } = clientActionTypes;

const { LOAD_NOTIFICATIONS } = actionTypes;
const { loadNotificationsFail, loadNotificationsSuccess } = actions;

export function* loadNotifications(action) {
  const { address } = action;
  try {
    let endpoint = `notification/activity/user/${address.toLowerCase()}`;
    const notifications = yield call(request, endpoint, 'GET');
    const { results, count } = notifications;

    yield put(loadNotificationsSuccess(results, count));
  } catch (e) {
    yield put(loadNotificationsFail(e));
  }
}

export function* watchNotifications() {
  yield takeLatest(LOAD_NOTIFICATIONS, loadNotifications);
}

export default [watchNotifications];
