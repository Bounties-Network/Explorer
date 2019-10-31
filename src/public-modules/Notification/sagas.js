import React from 'react';
import request from 'utils/request';
import { LIMIT } from './constants';
import { call, put, takeLatest, select, take } from 'redux-saga/effects';
import { delay, eventChannel } from 'redux-saga';
import { Toast } from 'components';
import { Link } from 'react-router-dom';
import {
  notificationsSelector,
  rootNotificationSelector,
  notificationsListSelector
} from 'public-modules/Notification/selectors';
import {
  getCurrentUserSelector,
  getUserAddressSelector
} from 'public-modules/Authentication/selectors';
import { actions, actionTypes } from 'public-modules/Notification';
import { notification_template, NOTIFICATION_ID } from 'utils/constants';
import { deserializeNotification } from './helpers';
import config from 'public-modules/config';
import intl from 'react-intl-universal';
import apolloClient from 'lib/apollo-client';
import {
  userDashboardNotificationsSubscription,
  userDashboardNotificationsQuery
} from './queries';

const {
  loadNotifications,
  loadNotificationsSuccess,
  loadNotificationsFail,
  loadMoreNotificationsSuccess,
  loadMoreNotificationsFail,
  setNotificationViewed,
  addNotification
} = actions;

const {
  LOAD_NOTIFICATIONS,
  LOAD_MORE_NOTIFICATIONS,
  ADD_NOTIFICATION,
  SET_NOTIFICATION_VIEWED,
  VIEW_ALL_NOTIFICATIONS
} = actionTypes;

function createSocketChannel(apolloClient) {
  // `eventChannel` takes a subscriber function
  // the subscriber function takes an `emit` argument to put messages onto the channel
  return eventChannel(emit => {
    const eventHandler = event => {
      // puts event payload into the channel
      // this allows a Saga to take this payload from the returned channel
      emit(event);
    };

    const errorHandler = err => {
      emit(err);
    };

    apolloClient.subscribe({
      next(data) {
        eventHandler(data);
      },
      error(err) {
        errorHandler(err);
      }
    });

    const unsubscribe = () => {
      if (apolloClient.unsubscribe) {
        apolloClient.unsubscribe();
      }
    };

    return unsubscribe;
  });
}

export function* loadNotificationsSaga(action) {
  try {
    console.log('load notifications');

    // Load initial via normal query
    const response = yield apolloClient().query({
      query: userDashboardNotificationsQuery,
      variables: {
        platforms: config.platform.split(',')
      }
    });

    const address = yield select(getUserAddressSelector);
    if (!address) {
      return null;
    }
    const currentNotifications = yield select(notificationsSelector);

    if (response.data) {
      const notifications = response.data.notifications_dashboardnotification;
      for (let i = 0; i < notifications.length; i++) {
        const notificationItem = notifications[i];
        const newNotification = deserializeNotification(notificationItem);

        if (currentNotifications[newNotification.id]) {
          continue;
        }
        yield put(addNotification(newNotification));
      }
      yield put(loadNotificationsSuccess(notifications));
    }

    // Initialise websocket subscriptions for queries

    const apolloSubscriptionClient = apolloClient().subscribe({
      query: userDashboardNotificationsSubscription,
      variables: {
        platforms: config.platform.split(',')
      }
    });

    const socketChannel = yield call(
      createSocketChannel,
      apolloSubscriptionClient
    );

    while (true) {
      try {
        // An error from socketChannel will cause the saga jump to the catch block
        const response = yield take(socketChannel);
        const address = yield select(getUserAddressSelector);
        if (!address) {
          return null;
        }
        const currentNotifications = yield select(notificationsSelector);

        if (response.data) {
          const notifications =
            response.data.notifications_dashboardnotification;
          for (let i = 0; i < notifications.length; i++) {
            const notificationItem = notifications[i];
            const newNotification = deserializeNotification(notificationItem);

            if (currentNotifications[newNotification.id]) {
              continue;
            }
            yield put(addNotification(newNotification));
          }
          yield put(loadNotificationsSuccess(notifications));
        }
      } catch (err) {
        console.error(err);
        yield socketChannel.close();
      }
    }
  } catch (e) {
    console.error(e);
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
    const response = yield call(apolloClient().query, {
      query: userDashboardNotificationsQuery,
      variables: {
        platforms: config.platform.split(','),
        offset: offset + LIMIT
      }
    });
    if (response.data) {
      const notifications = response.data.notifications_dashboardnotification;
      yield put(loadMoreNotificationsSuccess(notifications));
    }
  } catch (e) {
    yield put(loadMoreNotificationsFail(e));
  }
}

export function* showNotification(dispatch, action) {
  const { loaded } = yield select(rootNotificationSelector);
  const address = yield select(getUserAddressSelector);

  if (!address) {
    return null;
  }
  if (!loaded) {
    return null;
  }

  const {
    notification: { link, notification_name, id }
  } = action;

  let linkText = intl.get('actions.view_bounty');

  if (notification_name === NOTIFICATION_ID.RATING_RECEIVED) {
    linkText = intl.get('actions.view_rating');
  }

  let postedLink = (
    <Link to={link} style={{ color: 'inherit' }}>
      {linkText}
    </Link>
  );
  const message = notification_template[notification_name].message;
  const postedMessage = intl.get(message).d(message);
  const toastType = Toast.TYPE.NOTIFICATION;
  yield call(Toast, toastType, postedMessage, postedLink, () => {
    dispatch(setNotificationViewed(id));
  });
}

export function* setNotificationViewedSaga(action) {
  const { id } = action;

  const endpoint = `notification/push/${id}/view/`;
  yield call(request, endpoint, 'GET');
}

export function* viewAllNotifications(action) {
  const address = yield select(getUserAddressSelector);
  const endpoint = `notification/push/user/${address}/view_all/`;
  yield call(request, endpoint, 'GET');
}

export function* watchForNotificationToasts(dispatch) {
  yield takeLatest([ADD_NOTIFICATION], showNotification, dispatch);
}

export function* watchNotifications() {
  yield takeLatest(LOAD_NOTIFICATIONS, loadNotificationsSaga);
}

export function* watchLoadMore() {
  yield takeLatest(LOAD_MORE_NOTIFICATIONS, loadMoreNotifications);
}

export function* watchSetNotificationViewed() {
  yield takeLatest(SET_NOTIFICATION_VIEWED, setNotificationViewedSaga);
}

export function* watchViewAllNotifications() {
  yield takeLatest(VIEW_ALL_NOTIFICATIONS, viewAllNotifications);
}

export function* initNotifications() {
  yield delay(3000);
  const user = yield select(getCurrentUserSelector);
  if (user) {
    yield put(loadNotifications());
  }
}

export default [
  initNotifications,
  watchSetNotificationViewed,
  watchViewAllNotifications,
  watchNotifications,
  watchLoadMore,
  watchForNotificationToasts
];
