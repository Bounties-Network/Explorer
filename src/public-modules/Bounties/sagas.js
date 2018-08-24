import request from 'utils/request';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Bounties';
import { PAGE_SIZE } from 'public-modules/Bounties/constants';
import {
  bountiesQuerySelector,
  rootBountiesSelector
} from 'public-modules/Bounties/selectors';
import { queryStringToObject } from 'utils/locationHelpers';

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
  loadMoreBountiesFail,
  loadMoreBountiesSuccess,
  setSearch,
  toggleStageFilter,
  toggleDifficultyFilter,
  addCategoryFilter,
  removeCategoryFilter
} = actions;

export function* initializeFiltersFromQuery() {
  const params = queryStringToObject(window.location.search);

  const { search, bountyStage, difficulty, category } = params;

  if (search) {
    yield put(setSearch(search, false));
  }

  if (difficulty) {
    const difficulties = difficulty.split(',');
    for (let i = 0; i < difficulties.length; i++) {
      yield put(toggleDifficultyFilter(difficulties[i], false));
    }
  }

  if (bountyStage === '') {
    yield put(toggleStageFilter('active', false));
  }

  if (bountyStage) {
    const stages = bountyStage.split(',');
    for (let i = 0; i < stages.length; i++) {
      yield put(toggleStageFilter(stages[i], false));
    }
  }

  if (category) {
    const categories = category.split(',');
    for (let i = 0; i < categories.length; i++) {
      yield put(addCategoryFilter(categories[i], false));
    }
  }
}

export function* loadBounties(action) {
  const { triggerLoad, initializeFromQuery } = action;
  if (action.type !== LOAD_BOUNTIES && triggerLoad) {
    return yield put(loadBountiesAction());
  }

  if (action.type === LOAD_BOUNTIES && initializeFromQuery) {
    yield call(initializeFiltersFromQuery);
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

export function* watchLoadBounties() {
  yield takeLatest([LOAD_BOUNTIES], loadBounties);
}

export function* watchLoadMoreBounties() {
  yield takeLatest([LOAD_MORE_BOUNTIES], loadMoreBounties);
}

export default [watchLoadBounties, watchBounties, watchLoadMoreBounties];
