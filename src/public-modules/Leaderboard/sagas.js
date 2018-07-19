import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Leaderboard';
import { LIMIT, PLATFORM } from './constants';

const { LOAD_LEADERBOARD } = actionTypes;
const { loadLeaderboardFail, loadLeaderboardSuccess } = actions;

export function* loadLeaderboard() {
  try {
    const issuer_leaderboard = yield call(
      request,
      'leaderboard/issuer/',
      'GET'
    );
    const fulfiller_leaderboard = yield call(
      request,
      'leaderboard/fulfiller/',
      'GET'
    );
    yield put(
      loadLeaderboardSuccess({
        issuer: issuer_leaderboard,
        earner: fulfiller_leaderboard
      })
    );
  } catch (e) {
    yield put(loadLeaderboardFail(e));
  }
}

export function* watchLeaderboard() {
  yield takeLatest(LOAD_LEADERBOARD, loadLeaderboard);
}

export default [watchLeaderboard];
