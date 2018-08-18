import { push } from 'react-router-redux';
import { put, takeLatest } from 'redux-saga/effects';
import { actionTypes as bountyActionTypes } from 'public-modules/Bounty';

const { CREATE_DRAFT_SUCCESS } = bountyActionTypes;

export function* bountyCreated(action) {
  const { bounty } = action;

  yield put(push(`/bounty/draft/${bounty.id}`));
}

export function* watchBountyCreated() {
  yield takeLatest([CREATE_DRAFT_SUCCESS], bountyCreated);
}

export default [watchBountyCreated];
