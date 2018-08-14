import request from 'utils/request';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { LIMIT } from './constants';
import { rootNotificationSelector } from './selectors';
import { addressSelector } from 'public-modules/Client/selectors';
import { actionTypes, actions } from 'public-modules/Notifications';
import { actionTypes as clientActionTypes } from 'public-modules/Client';

const { SET_ADDRESS } = clientActionTypes;

const { LOAD_NOTIFICATIONS, LOAD_MORE_NOTIFICATIONS } = actionTypes;
const {
  loadNotifications,
  loadNotificationsSuccess,
  loadNotificationsFail,
  loadMoreNotificationsSuccess,
  loadMoreNotificationsFail
} = actions;

export function* loadPushNotifications(action) {
  const address = yield select(addressSelector);
  const notificationsState = yield select(rootNotificationSelector);

  const { notifications } = notificationsState;
  const limit = notifications.length || LIMIT;

  try {
    const endpoint = `notification/push/user/${address.toLowerCase()}?limit=${limit}`;
    const notifications = yield call(request, endpoint, 'GET');

    const { results, count } = notifications;
    yield put(loadNotificationsSuccess(results, count));
  } catch (e) {
    console.log(e);
    yield put(loadNotificationsFail(e));
  }
}

export function* loadMoreNotifications(action) {
  const address = yield select(addressSelector);
  const { notifications } = yield select(rootNotificationSelector);
  const offset = notifications.length;

  try {
    const endpoint = `notification/push/user/${address.toLowerCase()}?limit=${LIMIT}`;
    const params = { offset, limit: LIMIT };

    const notifications = yield call(request, endpoint, 'GET', params);

    const { results } = notifications;
    yield put(loadMoreNotificationsSuccess(results));
  } catch (e) {
    yield put(loadMoreNotificationsFail(e));
  }
}

export function* watchNotifications() {
  yield takeLatest(LOAD_NOTIFICATIONS, loadPushNotifications);
}

export function* watchLoadMoreNotifications() {
  yield takeLatest(LOAD_MORE_NOTIFICATIONS, loadMoreNotifications);
}

export function* loopTransactions() {
  while (true) {
    yield put(loadNotifications());
    yield delay(5000);
  }
}

export default [
  loopTransactions,
  watchLoadMoreNotifications,
  watchNotifications
];
