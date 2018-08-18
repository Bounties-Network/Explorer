import React from 'react';
import request from 'utils/request';
import { LIMIT } from './constants';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { toast as callToast } from 'react-toastify';
import { each, get } from 'lodash';
import { Toast } from 'components';
import { Link } from 'react-router-dom';
import {
  notificationsSelector,
  rootNotificationSelector,
  notificationsListSelector
} from 'public-modules/Notification/selectors';
import { getUserAddressSelector } from 'public-modules/Authentication/selectors';
import { actions, actionTypes } from 'public-modules/Notification';
import { deserializeNotification } from './helpers';

const {
  loadNotifications,
  loadNotificationsSuccess,
  loadNotificationsFail,
  loadMoreNotificationsSuccess,
  loadMoreNotificationsFail,
  addNotification
} = actions;

const {
  LOAD_NOTIFICATIONS,
  LOAD_MORE_NOTIFICATIONS,
  ADD_NOTIFICATION,
  SET_NOTIFICATION_VIEWED,
  VIEW_ALL_NOTIFICATIONS
} = actionTypes;

export function* loadNotificationsSaga(action) {
  try {
    const address = yield select(getUserAddressSelector);
    if (!address) {
      return null;
    }
    const currentNotifications = yield select(notificationsSelector);
    const endpoint = `notification/push/user/${address}/`;
    const response = yield call(request, endpoint, 'GET');
    const notifications = response.results;
    for (let i = 0; i < notifications.length; i++) {
      const notificationItem = notifications[i];
      const newNotification = deserializeNotification(notificationItem);

      if (currentNotifications[newNotification.id]) {
        continue;
      }
      yield put(addNotification(newNotification));
    }
    yield put(loadNotificationsSuccess(response.count));
  } catch (e) {
    yield put(loadNotificationsFail(e));
  }
}

export function* loadMoreNotifications(action) {
  const address = yield select(getUserAddressSelector);
  const { offset, count } = yield select(rootNotificationSelector);
  const notifications = yield select(notificationsListSelector);
  if (count === notifications.length) {
    return null;
  }
  try {
    const currentOffset = offset + LIMIT;
    const endpoint = `notification/push/user/${address}/?offset=${currentOffset}`;
    const response = yield call(request, endpoint, 'GET');
    const notifications = response.results;
    yield put(loadMoreNotificationsSuccess(notifications));
  } catch (e) {
    yield put(loadMoreNotificationsFail(e));
  }
}

export function* showNotification(action) {
  return null;
}

export function* setNotificationViewed(action) {
  const { id } = action;

  const endpoint = `notification/push/${id}/view/`;
  yield call(request, endpoint, 'GET');
}

export function* viewAllNotifications(action) {
  const address = yield select(getUserAddressSelector);
  const endpoint = `notification/push/user/${address}/view_all/`;
  yield call(request, endpoint, 'GET');
}

export function* watchForNotificationToasts() {
  yield takeLatest([ADD_NOTIFICATION], showNotification);
}

export function* watchNotifications() {
  yield takeLatest(LOAD_NOTIFICATIONS, loadNotificationsSaga);
}

export function* watchLoadMore() {
  yield takeLatest(LOAD_MORE_NOTIFICATIONS, loadMoreNotifications);
}

export function* watchSetNotificationViewed() {
  yield takeLatest(SET_NOTIFICATION_VIEWED, setNotificationViewed);
}

export function* watchViewAllNotifications() {
  yield takeLatest(VIEW_ALL_NOTIFICATIONS, viewAllNotifications);
}

export function* loopNotifications() {
  while (true) {
    yield put(loadNotifications());
    yield delay(3000);
  }
}

export default [
  loopNotifications,
  watchSetNotificationViewed,
  watchViewAllNotifications,
  watchNotifications,
  watchLoadMore,
  watchForNotificationToasts
];
