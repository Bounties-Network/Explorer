import { put, takeLatest, select } from 'redux-saga/effects';
import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import { actionTypes, actions } from './reducer';
import { FULFILLER_KEY, ISSUER_KEY } from './constants';
import { actions as fulfillmentsActions } from 'public-modules/Fulfillments';

const { LOAD_SUBMISSIONS_PANEL, SET_ACTIVE_TAB } = actionTypes;
const { setActiveTab } = actions;
const {
  addFulfillerFilter,
  addIssuerFilter,
  loadFulfillments,
  resetFilters
} = fulfillmentsActions;

export function* locationChanged(action) {
  const { pathname } = action.payload;

  if (currentRouteSelector(pathname) === 'dashboard') {
    yield put(fulfillmentsActions.resetFilters());
  }
}

export function* loadSubmissionsPanel(action) {
  const { public_address } = yield select(getCurrentUserSelector);
  yield put(setActiveTab('received'));
}

export function* loadActiveTab(action) {
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
  yield takeLatest(SET_ACTIVE_TAB, loadActiveTab);
}

export function* watchRouter() {
  yield takeLatest(LOCATION_CHANGE, locationChanged);
}

export default [watchLoadSubmissions, watchActiveTab, watchRouter];
