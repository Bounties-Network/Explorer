import request from 'utils/request';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LIMIT } from './constants';
import { rootNotificationSelector } from './selectors';
import { actionTypes, actions } from 'public-modules/Notification';
import { actionTypes as clientActionTypes } from 'public-modules/Client';

const { SET_ADDRESS } = clientActionTypes;

const { LOAD_NOTIFICATIONS, LOAD_MORE_NOTIFICATIONS } = actionTypes;
const {
  loadNotificationsSuccess,
  loadNotificationsFail,
  loadMoreNotificationsSuccess,
  loadMoreNotificationsFail
} = actions;

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

export function* loadMoreNotifications(action) {
  const { address } = action;
  const { notifications } = yield select(rootNotificationSelector);
  const offset = notifications.length;

  try {
    const endpoint = `notification/activity/user/${address.toLowerCase()}`;
    const params = { offset, limit: LIMIT };

    const notifications = yield call(request, endpoint, 'GET', params);

    const { results, count } = notifications;
    yield put(loadMoreNotificationsSuccess(results, count));
  } catch (e) {
    yield put(loadMoreNotificationsFail(e));
  }
}

export function* watchNotifications() {
  yield takeLatest(LOAD_NOTIFICATIONS, loadNotifications);
}

export function* watchLoadMoreNotifications() {
  yield takeLatest(LOAD_MORE_NOTIFICATIONS, loadMoreNotifications);
}

export default [watchNotifications, watchLoadMoreNotifications];
