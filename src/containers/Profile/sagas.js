import request from 'utils/request';
import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { profileUISelector } from './selectors';
import { actionTypes, actions } from './reducer';
import { actions as userInfoActions } from 'public-modules/UserInfo';
import {
  actionTypes as bountiesActionTypes,
  actions as bountiesActions
} from 'public-modules/Bounties';

const { SET_ACTIVE_TAB, SET_PROFILE_ADDRESS } = actionTypes;
const { addIssuerFilter, addFulfillerFilter } = bountiesActions;
const { loadBounties } = bountiesActions;
const { loadUserInfo } = userInfoActions;

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

export function* loadUser(action) {
  const { address } = action;
  const { currentTab } = yield select(profileUISelector);

  yield put(loadUserInfo(address));
  yield loadProfileBounties({ tabKey: currentTab });
}

export function* watchProfileTab() {
  yield takeLatest(SET_ACTIVE_TAB, loadProfileBounties);
}

export function* watchProfileAddress() {
  yield takeLatest(SET_PROFILE_ADDRESS, loadUser);
}

export default [watchProfileTab, watchProfileAddress];
