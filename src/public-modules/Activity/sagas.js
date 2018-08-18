import request from 'utils/request';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LIMIT } from './constants';
import { rootActivitySelector } from './selectors';
import { actionTypes, actions } from 'public-modules/Activity';
import { actionTypes as clientActionTypes } from 'public-modules/Client';

const { SET_ADDRESS } = clientActionTypes;

const { LOAD_ACTIVITY, LOAD_MORE_ACTIVITY } = actionTypes;
const {
  loadActivitySuccess,
  loadActivityFail,
  loadMoreActivitySuccess,
  loadMoreActivityFail
} = actions;

export function* loadActivity(action) {
  const { address } = action;
  try {
    let endpoint = `notification/activity/user/${address.toLowerCase()}`;
    const activity = yield call(request, endpoint, 'GET');
    const { results, count } = activity;

    yield put(loadActivitySuccess(results, count));
  } catch (e) {
    yield put(loadActivityFail(e));
  }
}

export function* loadMoreActivity(action) {
  const { address } = action;
  const { activity } = yield select(rootActivitySelector);
  const offset = activity.length;

  try {
    const endpoint = `notification/activity/user/${address.toLowerCase()}`;
    const params = { offset, limit: LIMIT };

    const activity = yield call(request, endpoint, 'GET', params);

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
