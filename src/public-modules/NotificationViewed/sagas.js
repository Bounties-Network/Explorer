import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Notifications';

const { LOAD_NOTIFICATIONVIEWED } = actionTypes;
const { loadNotificationViewedFail, loadNotificationViewedSuccesss } = actions;

export function* LoadNotificationViewed(action) {
  const { notificationId } = action;
  try {
    let endpoint = `notifications/${notificationId}/view/`;
    const notifications = yield call(request, endpoint, 'GET');
    yield put(loadNotificationViewedSuccesss(notifications));
  } catch (e) {
    yield put(loadNotificationViewedFail(e));
  }
}

export function* watchNotificationViewed() {
  yield takeLatest(LOAD_NOTIFICATIONVIEWED, LoadNotificationViewed);
}

export default [watchNotificationViewed];
