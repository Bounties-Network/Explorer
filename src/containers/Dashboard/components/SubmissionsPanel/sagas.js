import request from 'utils/request';
import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import { actionTypes, actions } from './reducer';

import { actions as fulfillmentsActions } from 'public-modules/Fulfillments';

const { LOAD_SUBMISSIONS_PANEL, SET_ACTIVE_TAB } = actionTypes;
const { addFulfillerFilter, loadFulfillments } = fulfillmentsActions;

export function* loadSubmissionsPanel(action) {
  const { public_address } = yield select(getCurrentUserSelector);

  yield put(addFulfillerFilter('f', public_address));
  yield put(loadFulfillments('f'));
}

export function* watchLoadSubmissions() {
  yield takeLatest(LOAD_SUBMISSIONS_PANEL, loadSubmissionsPanel);
}

export default [watchLoadSubmissions];
