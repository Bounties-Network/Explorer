import { put, takeLatest, select } from 'redux-saga/effects';
import { getUserAddressSelector } from 'public-modules/Authentication/selectors';
import { actionTypes } from './reducer';
import { actions as fulfillmentsActions } from 'public-modules/Fulfillments';

const { SET_ACTIVE_TAB } = actionTypes;
const {
  addFulfillerFilter,
  addIssuerFilter,
  loadFulfillments,
  resetFilters
} = fulfillmentsActions;

export function* loadActiveTab(action) {
  const public_address = yield select(getUserAddressSelector);
  const { tabKey } = action;

  yield put(resetFilters());

  if (tabKey === 'received') {
    yield put(addIssuerFilter(public_address));
  } else if (tabKey === 'submitted') {
    yield put(addFulfillerFilter(public_address));
  }

  yield put(loadFulfillments());
}

export function* watchActiveTab() {
  yield takeLatest(SET_ACTIVE_TAB, loadActiveTab);
}

export default [watchActiveTab];
