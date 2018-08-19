import request from 'utils/request';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Fulfillment';

const { LOAD_FULFILLMENT } = actionTypes;
const { loadFulfillmentSuccess, loadFulfillmentFail } = actions;

export function* loadFulfillment(action) {
  const { bountyId, fulfillmentId } = action;
  const params = {
    bounty: bountyId,
    fulfillment_id: fulfillmentId
  };

  try {
    let endpoint = `fulfillment/`;
    const fulfillments = yield call(request, endpoint, 'GET', { params });
    yield put(loadFulfillmentSuccess(fulfillments.results[0]));
  } catch (e) {
    yield put(loadFulfillmentFail(e));
  }
}

export function* watchFulfillment() {
  yield takeLatest(LOAD_FULFILLMENT, loadFulfillment);
}

export default [watchFulfillment];
