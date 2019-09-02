import { push } from 'connected-react-router';
import { put, takeLatest } from 'redux-saga/effects';
import { actionTypes as bountyActionTypes } from 'public-modules/Bounty';

const { CREATE_DRAFT_SUCCESS } = bountyActionTypes;

export function* bountyCreated(action) {
  const { bounty } = action;

  yield put(push(`/bounty/draft/${bounty.uid}`));
}

export function* watchBountyCreated() {
  yield takeLatest([CREATE_DRAFT_SUCCESS], bountyCreated);
}

export default [watchBountyCreated];
