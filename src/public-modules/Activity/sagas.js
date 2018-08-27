import request from 'utils/request';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LIMIT } from './constants';
import { rootActivitySelector } from './selectors';
import { actionTypes, actions } from 'public-modules/Activity';
import config from 'public-modules/config';

const { LOAD_ACTIVITY, LOAD_MORE_ACTIVITY } = actionTypes;
const {
  loadActivitySuccess,
  loadActivityFail,
  loadMoreActivitySuccess,
  loadMoreActivityFail
} = actions;

export function* loadActivity(action) {
  const { address } = action;
  const params = {
    notification__platform__in: config.platform,
    limit: LIMIT
  };

  try {
    let endpoint = `notification/activity/user/${address.toLowerCase()}`;
    const activity = yield call(request, endpoint, 'GET', { params });
    const { results, count } = activity;

    yield put(loadActivitySuccess(results, count));
  } catch (e) {
    yield put(loadActivityFail(e));
  }
}

export function* loadMoreActivity(action) {
  const { address } = action;
  const { activity } = yield select(rootActivitySelector);
  const params = {
    notification__platform__in: config.platform,
    limit: LIMIT,
    offset: activity.length
  };

  try {
    const endpoint = `notification/activity/user/${address.toLowerCase()}`;
    const activity = yield call(request, endpoint, 'GET', { params });

    const { results, count } = activity;
    yield put(loadMoreActivitySuccess(results, count));
  } catch (e) {
    yield put(loadMoreActivityFail(e));
  }
}

export function* watchActivity() {
  yield takeLatest(LOAD_ACTIVITY, loadActivity);
}

export function* watchLoadMoreActivity() {
  yield takeLatest(LOAD_MORE_ACTIVITY, loadMoreActivity);
}

export default [watchActivity, watchLoadMoreActivity];
