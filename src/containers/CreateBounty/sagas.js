import request from 'utils/request';
import { push } from 'react-router-redux';
import { put, takeLatest } from 'redux-saga/effects';
import { actionTypes as bountyActionTypes } from 'public-modules/Bounty';

const { CREATE_DRAFT_SUCCESS, CREATE_BOUNTY_SUCCESS } = bountyActionTypes;

export function* bountyCreated(action) {
  yield put(push('/explorer'));
}

export function* watchBountyCreated() {
  yield takeLatest(
    [CREATE_DRAFT_SUCCESS, CREATE_BOUNTY_SUCCESS],
    bountyCreated
  );
}

export default [watchBountyCreated];
