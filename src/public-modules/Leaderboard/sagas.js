import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Leaderboard';

const { LOAD_LEADERBOARD } = actionTypes;
const { loadLeaderboardFail, loadLeaderboardSuccess } = actions;

export function* loadLeaderboard(action) {
  try {
    let endpoint = `leaderboard`;
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
