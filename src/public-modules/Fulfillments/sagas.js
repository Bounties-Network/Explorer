import request from 'utils/request';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Fulfillments';
import { fulfillmentsSelector } from 'public-modules/Fulfillments/selectors';
import { LIMIT } from './constants';
import config from 'public-modules/config';

const { LOAD_FULFILLMENTS } = actionTypes;
const { loadFulfillmentsFail, loadFulfillmentsSuccess } = actions;

export function* loadFulfillments(action) {
  const { key } = action;
  const params = {
    limit: LIMIT,
    platform__in: config.platform
  };

  const fulfillmentsState = yield select(fulfillmentsSelector(key));

  if (fulfillmentsState.filters) {
    const { fulfiller, issuer } = fulfillmentsState.filters;

    if (fulfiller) {
      params['fulfiller'] = fulfiller;
    }

    if (issuer) {
      params['issuer'] = issuer;
    }
  }

  console.log(params);

  try {
    let endpoint = 'fulfillment';
    const fulfillments = yield call(request, endpoint, 'GET', { params });
    console.log('fulfillments', fulfillments);
    const { results, count } = fulfillments;
    yield put(loadFulfillmentsSuccess(key, results, count));
  } catch (e) {
    yield put(loadFulfillmentsFail(key, e));
  }
}

export function* watchFulfillments() {
  yield takeLatest(LOAD_FULFILLMENTS, loadFulfillments);
}

export default [watchFulfillments];
