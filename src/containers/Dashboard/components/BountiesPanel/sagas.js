import request from 'utils/request';
import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import { actionTypes, actions } from './reducer';
import {
  actionTypes as bountiesActionTypes,
  actions as bountiesActions
} from 'public-modules/Bounties';
import { actions as draftsActions } from 'public-modules/Drafts';
import { SORT_CREATED } from 'public-modules/Bounties/constants';

const { LOAD_BOUNTIES_PANEL, SET_ACTIVE_TAB } = actionTypes;
const { addIssuerFilter, setSort } = bountiesActions;

const { loadBounties, resetFilters } = bountiesActions;
const { loadDrafts } = draftsActions;

export function* loadBountiesPanel() {
  const { public_address } = yield select(getCurrentUserSelector);

  yield put(resetFilters());
  yield put(addIssuerFilter(public_address));
  yield put(setSort(SORT_CREATED, 'desc'));
  yield put(loadBounties());
  yield put(loadDrafts());
}

export function* watchLoadBounties() {
  yield takeLatest(LOAD_BOUNTIES_PANEL, loadBountiesPanel);
}

export default [watchLoadBounties];
