import request from 'utils/request';
import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import { actionTypes, actions } from './reducer';
import { FULFILLER_KEY, ISSUER_KEY } from './constants';

import { actions as fulfillmentsActions } from 'public-modules/Fulfillments';

const { LOAD_SUBMISSIONS_PANEL, SET_ACTIVE_TAB } = actionTypes;
const {
  addFulfillerFilter,
  addIssuerFilter,
  loadFulfillments
} = fulfillmentsActions;

export function* loadSubmissionsPanel(action) {
  const { public_address } = yield select(getCurrentUserSelector);

  yield put(addIssuerFilter(public_address));
  yield put(loadFulfillments());
}

export function* setActiveTab(action) {
  const { public_address } = yield select(getCurrentUserSelector);
  const { tabKey } = action;

  if (tabKey == 'received') {
    yield put(addIssuerFilter(public_address));
  } else if (tabKey == 'submitted') {
    yield put(addFulfillerFilter(public_address));
  }

  yield put(loadFulfillments());
}

export function* watchLoadSubmissions() {
  yield takeLatest(LOAD_SUBMISSIONS_PANEL, loadSubmissionsPanel);
}

export function* watchActiveTab() {
  yield takeLatest(SET_ACTIVE_TAB, setActiveTab);
}

export default [watchLoadSubmissions, watchActiveTab];
