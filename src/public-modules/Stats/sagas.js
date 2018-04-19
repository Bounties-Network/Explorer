import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Stats';

const { LOAD_STATS } = actionTypes;
const { loadStatsFail, loadStatsSuccess } = actions;

export function* loadStats(action) {
  const address = action.address;
  try {
    let endpoint = `stats/${address}`;
    const stats = yield call(request, endpoint, 'GET');
    yield put(loadStatsSuccess(stats));
  } catch (e) {
    yield put(loadStatsFail(e));
  }
}

export function* watchStats() {
  yield takeLatest(LOAD_STATS, loadStats);
}

// export function* loadProfileStats(action) {
//   const address = action.address;
//   try {
//     let endpoint = `/stats/profile/${address}`;
//     const profileStats = yield call(request, endpoint, 'GET');
//     yield put(loadProfileStatsSuccess(profileStats));
//   } catch (e) {
//     yield put(loadProfileStatsFail(e));
//   }
// }

// export function* watchProfileStats() {
//   yield takeLatest(LOAD_PROFILESTATS, loadProfileStats);
// }

export default [watchStats];
