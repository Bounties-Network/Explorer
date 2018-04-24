import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Fulfillments';
import { searchQueryBuilder } from '../Utilities/helpers';

const { LOAD_FULFILLMENTS } = actionTypes;
const { loadFulfillmentsFail, loadFulfillmentsSuccess } = actions;

export function* loadFulfillments(action) {
  const { searchOptions } = action;
  const query = searchQueryBuilder(searchOptions);
  try {
    let endpoint = `fulfillment/` + query;
    const fulfillments = yield call(request, endpoint, 'GET');
    yield put(loadFulfillmentsSuccess(fulfillments));
  } catch (e) {
    yield put(loadFulfillmentsFail(e));
  }
}

export function* watchFulfillments() {
  yield takeLatest(LOAD_FULFILLMENTS, loadFulfillments);
}

export default [watchFulfillments];
