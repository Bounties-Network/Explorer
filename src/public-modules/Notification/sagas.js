import React from 'react';
import request from 'utils/request';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { toast as callToast } from 'react-toastify';
import { each, get } from 'lodash';
import { Toast } from 'components';
import { Link } from 'react-router-dom';
import {
  notificationsSelector,
  rootNotificationSelector
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
  addNotification,
  setNotificationViewed
} = actions;

const {
  LOAD_NOTIFICATIONS,
  LOAD_MORE_NOTIFICATIONS,
  ADD_NOTIFICATION
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
    yield put(loadNotificationsSuccess());
  } catch (e) {
    yield put(loadNotificationsFail(e));
  }
}

export function* loadMoreNotificationsSaga(action) {
  return null;
}

export function* showNotification(action) {
  return null;
}

export function* watchForNotificationToasts() {
  yield takeLatest([ADD_NOTIFICATION], showNotification);
}

export function* watchNotifications() {
  yield takeLatest(LOAD_NOTIFICATIONS, loadNotificationsSaga);
}

export function* watchLoadMore() {
  yield takeLatest(LOAD_MORE_NOTIFICATIONS, loadMoreNotificationsSaga);
}

export function* loopNotifications() {
  while (true) {
    yield put(loadNotifications());
    yield delay(5000);
  }
}

export default [
  loopNotifications,
  watchNotifications,
  watchLoadMore,
  watchForNotificationToasts
];
