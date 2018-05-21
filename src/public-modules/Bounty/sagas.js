import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Bounty';

const { LOAD_BOUNTY } = actionTypes;
const { loadBountyFail, loadBountySuccess } = actions;

// Load single Bounty, needs ID
export function* loadBounty(action) {
  const { id } = action;
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

export default [watchBounty];
