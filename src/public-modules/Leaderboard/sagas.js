import request from 'utils/request';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Leaderboard';

const { LOAD_LEADERBOARD } = actionTypes;
const { loadLeaderboardFail, loadLeaderboardSuccess } = actions;

export function* loadLeaderboard() {
  try {
    const { issuer, fulfiller } = yield all({
      issuer: call(request, 'leaderboard/issuer/', 'GET'),
      fulfiller: call(request, 'leaderboard/fulfiller/', 'GET')
    });

    yield put(loadLeaderboardSuccess({ issuer: [], fulfiller: [] }));
  } catch (e) {
    yield put(loadLeaderboardFail(e));
  }
}

export function* watchLeaderboard() {
  yield takeLatest(LOAD_LEADERBOARD, loadLeaderboard);
}

export default [watchLeaderboard];
