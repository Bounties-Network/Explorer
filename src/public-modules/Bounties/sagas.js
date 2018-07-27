import request from 'utils/request';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Bounties';
import { PAGE_SIZE } from 'public-modules/Bounties/constants';
import {
  bountiesQuerySelector,
  rootBountiesSelector
} from 'public-modules/Bounties/selectors';

const {
  LOAD_BOUNTIES,
  LOAD_MORE_BOUNTIES,
  SET_SORT,
  RESET_FILTERS,
  RESET_FILTERS_EXCEPT_ADDRESS,
  SET_SEARCH,
  TOGGLE_STAGE_FILTER,
  TOGGLE_DIFFICULTY_FILTER,
  SET_ALL_STAGE_FILTERS,
  SET_ALL_DIFFICULTY_FILTERS,
  ADD_CATEGORY_FILTER,
  REMOVE_CATEGORY_FILTER,
  TOGGLE_CATEGORY_FILTER
} = actionTypes;

const {
  loadBounties: loadBountiesAction,
  loadBountiesFail,
  loadBountiesSuccess,
  loadMoreBounties: loadMoreBountiesAction,
  loadMoreBountiesFail,
  loadMoreBountiesSuccess
} = actions;

export function* loadBounties(action) {
  if (action.type !== LOAD_BOUNTIES) {
    return yield put(loadBountiesAction());
  }
  let params = yield select(bountiesQuerySelector);
  try {
    let endpoint = 'bounty/';
    const bounties = yield call(request, endpoint, 'GET', { params });
    yield put(loadBountiesSuccess(bounties));
  } catch (e) {
    yield put(loadBountiesFail(e));
  }
}

export function* loadMoreBounties(action) {
  let params = yield select(bountiesQuerySelector);
  let bountyState = yield select(rootBountiesSelector);
  const offset = bountyState.offset + PAGE_SIZE;

  try {
    let endpoint = 'bounty/';
    const bounties = yield call(request, endpoint, 'GET', {
      params: { ...params, offset }
    });
    yield put(loadMoreBountiesSuccess(bounties));
  } catch (e) {
    yield put(loadMoreBountiesFail(e));
  }
}

export function* watchBounties() {
  yield takeLatest(
    [
      LOAD_BOUNTIES,
      SET_SORT,
      RESET_FILTERS,
      RESET_FILTERS_EXCEPT_ADDRESS,
      SET_SEARCH,
      TOGGLE_STAGE_FILTER,
      TOGGLE_DIFFICULTY_FILTER,
      SET_ALL_DIFFICULTY_FILTERS,
      SET_ALL_STAGE_FILTERS,
      ADD_CATEGORY_FILTER,
      REMOVE_CATEGORY_FILTER,
      TOGGLE_CATEGORY_FILTER
    ],
    loadBounties
  );
}

export function* watchLoadMoreBounties() {
  yield takeLatest([LOAD_MORE_BOUNTIES], loadMoreBounties);
}

export default [watchBounties, watchLoadMoreBounties];
