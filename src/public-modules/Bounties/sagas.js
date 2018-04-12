import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Bounties';

const { LOAD_BOUNTIES } = actionTypes;
const { loadFail, loadSuccess } = actions;

export function* loadBounties(action) {
  try {
    let endpoint = 'bounties';
    const bounties = yield call(request, endpoint, 'GET');
    yield put(loadSuccess(bounties));
  } catch (e) {
    yield put(loadFail(e));
  }
}

/**
 * Saga manages page-load calls
 */
export function* watchBounties() {
  yield takeLatest(LOAD_BOUNTIES, loadBounties);
}

export default [watchBounties];
