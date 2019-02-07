import request from 'utils/request';
import { call, put, takeLatest, select } from 'redux-saga/effects';

import { actions, actionTypes } from 'public-modules/FulfillerApplication';

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
    const response = yield call(request, endpoint, methodType, {
      data: { message }
    });
    yield put(createFulfillerApplicationSuccess());
  } catch (e) {
    yield put(createFulfillerApplicationFail(e));
  }

  callback();
}

export function* watchCreateFulfillerApplication() {
  yield takeLatest(CREATE_FULFILLER_APPLICATION, createFulfillerApplication);
}

export default [watchCreateFulfillerApplication];
