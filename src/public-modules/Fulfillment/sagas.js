import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Fulfillment';

const { LOAD_FULFILLMENT } = actionTypes;
const { loadFulfillmentFail, loadFulfillmentSuccess } = actions;

export function* loadFulfillment(action) {
  const { id } = action;
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

export default [watchFulfillment];
