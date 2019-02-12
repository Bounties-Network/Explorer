import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';

import { actions, actionTypes } from 'public-modules/FulfillerApplication';
import { getBounty } from 'public-modules/Bounty/sagas';
import { loadApplicantsSaga } from 'public-modules/Applicants/sagas';

const {
  createFulfillerApplicationSuccess,
  createFulfillerApplicationFail
} = actions;

const { CREATE_FULFILLER_APPLICATION } = actionTypes;

export function* createFulfillerApplication(action) {
  const { bountyId, message, callback = () => {} } = action;

  let endpoint = `bounty/${bountyId}/application/`;
  let methodType = 'POST';

  try {
    yield call(request, endpoint, methodType, { data: { message } });

    try {
      yield getBounty({ id: bountyId });
      yield loadApplicantsSaga({ bountyId });
    } catch (e) {}

    yield put(createFulfillerApplicationSuccess());
    callback();
  } catch (e) {
    yield put(createFulfillerApplicationFail(e));
    callback(e);
  }
}

export function* watchCreateFulfillerApplication() {
  yield takeLatest(CREATE_FULFILLER_APPLICATION, createFulfillerApplication);
}

export default [watchCreateFulfillerApplication];
