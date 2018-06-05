import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Leaderboard';
import { LIMIT, PLATFORM } from './constants';

const { LOAD_LEADERBOARD } = actionTypes;
const { loadLeaderboardFail, loadLeaderboardSuccess } = actions;

export function* loadLeaderboard(action) {
  let { leaderboardCategory } = action;
  try {
    let endpoint = `leaderboard/${leaderboardCategory}?limit=${LIMIT}&platform__in=${PLATFORM}`;
    const leaderboard = yield call(request, endpoint, 'GET');
    yield put(loadLeaderboardSuccess(leaderboard));
  } catch (e) {
    yield put(loadLeaderboardFail(e));
  }
}

export function* watchLeaderboard() {
  yield takeLatest(LOAD_LEADERBOARD, loadLeaderboard);
}

export default [watchLeaderboard];
