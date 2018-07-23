import request from 'utils/request';
import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Leaderboard';
import { leaderboardQuerySelector } from './selectors';

const { LOAD_LEADERBOARD } = actionTypes;
const { loadLeaderboardFail, loadLeaderboardSuccess } = actions;

export function* loadLeaderboard() {
  let params = yield select(leaderboardQuerySelector);

  console.log(params);
  try {
    const { issuer, fulfiller } = yield all({
      issuer: call(request, `leaderboard/issuer/`, 'GET', { params }),
      fulfiller: call(request, `leaderboard/fulfiller/`, 'GET', { params })
    });

    yield put(loadLeaderboardSuccess({ issuer, fulfiller }));
  } catch (e) {
    yield put(loadLeaderboardFail(e));
  }
}

export function* watchLeaderboard() {
  yield takeLatest(LOAD_LEADERBOARD, loadLeaderboard);
}

export default [watchLeaderboard];
