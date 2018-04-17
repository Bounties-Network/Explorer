import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Bounties';

const { LOAD_BOUNTIES } = actionTypes;
const { loadBountiesFail, loadBountiesSuccess } = actions;

// BOUNTIES
//
//
// Load Bounties
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

// Load single Bounty, needs ID
export function* loadBounty(action) {
  const id = action.id;
  try {
    let endpoint = `bounty/${id}`;
    const bounty = yield call(request, endpoint, 'GET');
    yield put(loadBountySuccess(bounty));
  } catch (e) {
    yield put(loadBountyFail(e));
  }
}

export function* watchBounty() {
  yield takeLatest(LOAD_BOUNTY, loadBounty);
}

// CATEGORIES
//
//
// Load categories
export function* loadCategories(action) {
  try {
    let endpoint = `category`;
    const categories = yield call(request, endpoint, 'GET');
    yield put(loadCategoriesSuccess(categories));
  } catch (e) {
    yield put(loadCategoriesFail(e));
  }
}

export function* watchCategories() {
  yield takeLatest(LOAD_CATEGORIES, loadCategories);
}

// Load Single Category, needs ID
export function* loadCategory(action) {
  const id = action.id;
  try {
    let endpoint = `category/${id}`;
    const category = yield call(request, endpoint, 'GET');
    yield put(loadCategorySuccess(category));
  } catch (e) {
    yield put(loadCategoryFail(e));
  }
}

export function* watchCategory() {
  yield takeLatest(LOAD_CATEGORY, loadCategory);
}

// FULFILLMENTS
//
//
// Load Fulfillments
export function* loadFulfillments(action) {
  try {
    let endpoint = `fulfillment`;
    const fulfillments = yield call(request, endpoint, 'GET');
    yield put(loadFulfillmentsSuccess(fulfillments));
  } catch (e) {
    yield put(loadFulfillmentsFail(e));
  }
}

export function* watchFulfillments() {
  yield takeLatest(LOAD_FULFILLMENTS, loadFulfillments);
}

// Load Single Fulfillment, needs ID
export function* loadFulfillment(action) {
  const id = action.id;
  try {
    let endpoint = `fulfillment/${id}`;
    const fulfillment = yield call(request, endpoint, 'GET');
    yield put(loadFulfillmentSuccess(fulfillment));
  } catch (e) {
    yield put(loadFulfillmentFail(e));
  }
}

export function* watchFulfillment() {
  yield takeLatest(LOAD_FULFILLMENT, loadFulfillment);
}

// LEADERBOARD
//
//
// Load Leaderboard
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
export function* loadUserStats(action) {
  const id = action.address;
  try {
    let endpoint = `stats/${address}`;
    const userStats = yield call(request, endpoint, 'GET');
    yield put(loadUserStatsSuccess(userStats));
  } catch (e) {
    yield put(loadUserStatsFail(e));
  }
}

export function* watchUserStats() {
  yield takeLatest(LOAD_USERSTATS, loadUserStats);
}

// USER
//
//
// User Info: address/name/email/github
export function* loadUserInfo(action) {
  const id = action.address;
  try {
    let endpoint = `user/${address}`;
    const userInfo = yield call(request, endpoint, 'GET');
    yield put(loadUserInfoSuccess(userInfo));
  } catch (e) {
    yield put(loadUserInfoFail(e));
  }
}

export function* watchUserInfo() {
  yield takeLatest(LOAD_USERINFO, loadUserInfo);
}

// Token
//
//
// Get list of tokens that have been used at least once in a contract
export function* loadTokensInfo(action) {
  try {
    let endpoint = `token`;
    const tokensInfo = yield call(request, endpoint, 'GET');
    yield put(loadTokensInfoSuccess(tokensInfo));
  } catch (e) {
    yield put(loadTokensInfoFail(e));
  }
}

export function* watchTokensInfo() {
  yield takeLatest(LOAD_TOKENSINFO, loadTokensInfo);
}

export default [
  watchBounties,
  watchBounty,
  watchCategories,
  watchCategory,
  watchFulfillments,
  watchFulfillment,
  watchLeaderboard,
  watchProfileStats,
  watchUserStats,
  watchUserInfo,
  watchTokenInfo
];
