import request from 'utils/request';
import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { profileUISelector } from './selectors';
import { actionTypes, actions } from './reducer';
import { actions as userInfoActions } from 'public-modules/UserInfo';
import { actions as reviewsActions } from 'public-modules/Reviews';
import {
  actionTypes as bountiesActionTypes,
  actions as bountiesActions
} from 'public-modules/Bounties';

const {
  SET_ACTIVE_TAB,
  SET_PROFILE_ADDRESS,
  TOGGLE_NETWORK_SWITCH
} = actionTypes;
const { RESET_FILTERS } = bountiesActionTypes;
const { addIssuerFilter, addFulfillerFilter } = bountiesActions;
const { loadBounties, allStageFilters, resetFilters } = bountiesActions;
const { loadUserInfo } = userInfoActions;
const { loadReviewsReceived } = reviewsActions;

export function* loadProfileBounties(action) {
  const { tabKey } = action;
  const { address } = yield select(profileUISelector);

  if (tabKey == 'issued') {
    yield put(addIssuerFilter(address));
  } else {
    yield put(addFulfillerFilter(address));
  }

  yield put(loadBounties());
}

export function* networkSwitchChanged(action) {
  const { address, switchValue } = yield select(profileUISelector);
  yield put(loadReviewsReceived({ address, reviewType: switchValue }));
}

export function* loadUser(action) {
  const { address } = action;
  const { currentTab } = yield select(profileUISelector);

  yield put(loadUserInfo(address));
  yield put(resetFilters());
  yield put(allStageFilters());

  yield loadProfileBounties({ tabKey: currentTab });
}

export function* watchNetworkSwitch() {
  yield takeLatest(TOGGLE_NETWORK_SWITCH, networkSwitchChanged);
}

export function* watchProfileTab() {
  yield takeLatest(SET_ACTIVE_TAB, loadProfileBounties);
}

export function* watchProfileAddress() {
  yield takeLatest(SET_PROFILE_ADDRESS, loadUser);
}

export default [watchProfileTab, watchProfileAddress, watchNetworkSwitch];
