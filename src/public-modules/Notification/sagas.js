import request from 'utils/request';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LIMIT } from './constants';
import { rootNotificationSelector } from './selectors';
import { actionTypes, actions } from 'public-modules/Notification';

const { LOAD_NOTIFICATIONS, LOAD_MORE_NOTIFICATIONS } = actionTypes;
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

export function* loadNotificationsSaga(action) {
  try {
    let endpoint = `notification/activity/user/${address.toLowerCase()}`;
    const notifications = yield call(request, endpoint, 'GET');
    const { results, count } = notifications;

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
    const endpoint = `notification/activity/user/${address.toLowerCase()}`;
    const params = { offset, limit: LIMIT };

    const notifications = yield call(request, endpoint, 'GET', params);

    const { results, count } = notifications;
    yield put(loadMoreNotificationsSuccess(results, count));
  } catch (e) {
    yield put(loadMoreNotificationsFail(e));
  }
}

export function* showNotification(action, dispatch) {
  const { loaded } = yield select(rootNotificationSelector);
  const address = yield select(getUserAddressSelector);

  if (!address) {
    return null;
  }
  if (!loaded) {
    return null;
  }

  const {
    notification: { bounty_title, link, notification_name, id }
  } = action;
  let postedLink = (
    <Link to={link} style={{ color: 'inherit' }}>
      View Bounty
    </Link>
  );
  const postedMessage = notification_template[notification_name].message;
  const toastType = Toast.TYPE.NOTIFICATION;
  yield call(Toast, toastType, postedMessage, postedLink, () =>
    dispatch(setNotificationViewed(id))
  );
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
  yield takeLatest(SET_NOTIFICATION_VIEWED, setNotificationViewedSaga);
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
