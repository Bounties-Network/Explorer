import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Notifications';

const { LOAD_NOTIFICATIONS } = actionTypes;
const { loadNotificationsFail, loadNotificationsSuccess } = actions;

export function* loadNotifications(action) {
  const { address } = action;
  try {
    let endpoint = `notifications/${address}`;
    const notifications = yield call(request, endpoint, 'GET');
    yield put(loadNotificationsSuccess(notifications));
  } catch (e) {
    yield put(loadNotificationsFail(e));
  }
}

export function* watchNotifications() {
  yield takeLatest(LOAD_NOTIFICATIONS, loadNotifications);
}

export default [watchNotifications];
