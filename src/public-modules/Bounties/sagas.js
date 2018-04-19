import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Bounties';

const { LOAD_BOUNTIES } = actionTypes;
const { loadBountiesFail, loadBountiesSuccess } = actions;

export function* loadBounties(action) {
  try {
    let endpoint = 'bounty';
    const bounties = yield call(request, endpoint, 'GET');
    yield put(loadBountiesSuccess(bounties));
  } catch (e) {
    yield put(loadBountiesFail(e));
  }
}

export function* watchBounties() {
  yield takeLatest(LOAD_BOUNTIES, loadBounties);
}

// STATS
//
//
// Load Profile Stats: bounties, accepted bounties, acceptance rate, submissions data
export function* loadProfileStats(action) {
  const address = action.address;
  try {
    let endpoint = `/stats/profile/${address}`;
    const profileStats = yield call(request, endpoint, 'GET');
    yield put(loadProfileStatsSuccess(profileStats));
  } catch (e) {
    yield put(loadProfileStatsFail(e));
  }
}

export function* watchProfileStats() {
  yield takeLatest(LOAD_PROFILESTATS, loadProfileStats);
}

// Load Stats regarding CREATING bounties: draft/active/dead/completed/expired

export default [watchBounties];
