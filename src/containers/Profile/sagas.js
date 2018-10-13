import { put, takeLatest, select } from 'redux-saga/effects';
import { profileUISelector } from './selectors';
import { actionTypes } from './reducer';
import { actions as reviewsActions } from 'public-modules/Reviews';
import { actions as bountiesActions } from 'public-modules/Bounties';

const { SET_ACTIVE_TAB, TOGGLE_NETWORK_SWITCH } = actionTypes;
const { addIssuerFilter, addFulfillerFilter } = bountiesActions;
const { loadBounties } = bountiesActions;
const { loadReviewsReceived } = reviewsActions;

export function* loadProfileBounties(action) {
  const { tabKey } = action;
  const { address } = yield select(profileUISelector);

  if (tabKey === 'issued') {
    yield put(addIssuerFilter(address));
  } else {
    yield put(addFulfillerFilter(address));
  }

  yield put(loadBounties(true));
}

export function* networkSwitchChanged(action) {
  const { address, switchValue } = yield select(profileUISelector);
  yield put(loadReviewsReceived({ address, reviewType: switchValue }));
}

export function* watchNetworkSwitch() {
  yield takeLatest(TOGGLE_NETWORK_SWITCH, networkSwitchChanged);
}

export function* watchProfileTab() {
  yield takeLatest(SET_ACTIVE_TAB, loadProfileBounties);
}

export default [watchProfileTab, watchNetworkSwitch];
