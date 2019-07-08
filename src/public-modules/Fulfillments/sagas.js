import request from 'utils/request';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Fulfillments';
import {
  fulfillmentsSelector,
  fulfillmentsQuerySelector
} from 'public-modules/Fulfillments/selectors';

const { LOAD_FULFILLMENTS, LOAD_MORE_FULFILLMENTS } = actionTypes;
const {
  loadFulfillmentsFail,
  loadFulfillmentsSuccess,
  loadMoreFulfillmentsFail,
  loadMoreFulfillmentsSuccess
} = actions;

export function* loadFulfillments() {
  const params = yield select(fulfillmentsQuerySelector);

  try {
    let endpoint = 'fulfillment/';
    const fulfillments = yield call(request, endpoint, 'GET', { params });
    const { results, count } = fulfillments;
    yield put(loadFulfillmentsSuccess(results, count));
  } catch (e) {
    yield put(loadFulfillmentsFail(e));
  }
}

export function* loadMoreFulfillments() {
  const params = yield select(fulfillmentsQuerySelector);
  const offset = (yield select(fulfillmentsSelector)).fulfillments.length;

  params['offset'] = offset;

  try {
    let endpoint = 'fulfillment/';
    const fulfillments = yield call(request, endpoint, 'GET', { params });
    const { results, count } = fulfillments;
    yield put(loadMoreFulfillmentsSuccess(results, count));
  } catch (e) {
    yield put(loadMoreFulfillmentsFail(e));
  }
}

export function* watchFulfillments() {
  yield takeLatest(LOAD_FULFILLMENTS, loadFulfillments);
}

export function* watchLoadMoreFulfillments() {
  yield takeLatest(LOAD_MORE_FULFILLMENTS, loadMoreFulfillments);
}

export default [watchFulfillments, watchLoadMoreFulfillments];
