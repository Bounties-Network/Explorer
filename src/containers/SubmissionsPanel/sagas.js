import { currentRouteSelector } from 'utils/helpers';
import { LOCATION_CHANGE } from 'react-router-redux';
import { put, takeLatest, select } from 'redux-saga/effects';
import { getUserAddressSelector } from 'public-modules/Authentication/selectors';
import { actionTypes, actions } from './reducer';
import { actions as fulfillmentsActions } from 'public-modules/Fulfillments';
import { actions as userInfoActions } from 'public-modules/UserInfo';

const { LOAD_SUBMISSIONS_PANEL, SET_ACTIVE_TAB } = actionTypes;
const { setActiveTab } = actions;
const { loadUserInfo } = userInfoActions;
const {
  addFulfillerFilter,
  addIssuerFilter,
  loadFulfillments
} = fulfillmentsActions;

export function* locationChanged(action) {
  const { pathname } = action.payload;

  if (currentRouteSelector(pathname) === 'dashboard') {
    yield put(fulfillmentsActions.resetFilters());
  }
}

export function* loadSubmissionsPanel(action) {
  const address = yield select(getUserAddressSelector);

  yield put(loadUserInfo(address));
  yield put(setActiveTab('received'));
}

export function* loadActiveTab(action) {
  const public_address = yield select(getUserAddressSelector);
  const { tabKey } = action;

  if (tabKey === 'received') {
    yield put(addIssuerFilter(public_address));
  } else if (tabKey === 'submitted') {
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
