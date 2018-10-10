import request from 'utils/request';
import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Bounties';
import { PAGE_SIZE } from 'public-modules/Bounties/constants';
import {
  bountiesQuerySelector,
  rootBountiesSelector,
  bountiesStateSelector
} from 'public-modules/Bounties/selectors';
import { queryStringToObject } from 'utils/locationHelpers';

const {
  LOAD_BOUNTIES,
  LOAD_MORE_BOUNTIES,
  SET_SORT,
  SET_BATCH,
  RESET_FILTERS,
  SET_SEARCH,
  TOGGLE_STAGE_FILTER,
  TOGGLE_DIFFICULTY_FILTER,
  SET_ALL_STAGE_FILTERS,
  SET_ALL_DIFFICULTY_FILTERS,
  ADD_TAG_FILTER,
  ADD_PLATFORM_FILTER,
  REMOVE_TAG_FILTER,
  REMOVE_PLATFORM_FILTER,
  TOGGLE_TAG_FILTER,
  TOGGLE_PLATFORM_FILTER
} = actionTypes;

const {
  loadBounties: loadBountiesAction,
  loadBountiesFail,
  loadBountiesSuccess,
  loadMoreBountiesFail,
  loadMoreBountiesSuccess,
  setSearch,
  setSort,
  toggleStageFilter,
  toggleDifficultyFilter,
  addTagFilter,
  addPlatformFilter,
  resetFilter
} = actions;

export function* initializeFiltersFromQuery() {
  const params = queryStringToObject(window.location.search);

  const { search, bountyStage, difficulty, tag, platform, sort } = params;

  if (search) {
    yield put(resetFilter('search'));
    yield put(setSearch(search));
  }

  if (difficulty === '') {
    yield put(resetFilter('difficulty'));
  }

  if (difficulty) {
    yield put(resetFilter('difficulty'));
    const difficulties = difficulty.split(',');
    for (let i = 0; i < difficulties.length; i++) {
      yield put(toggleDifficultyFilter(difficulties[i]));
    }
  }

  if (bountyStage === '') {
    yield put(resetFilter('stage'));
  }

  if (bountyStage) {
    yield put(resetFilter('stage'));
    const stages = bountyStage.split(',');
    for (let i = 0; i < stages.length; i++) {
      yield put(toggleStageFilter(stages[i]));
    }
  }

  if (sort === '') {
    yield put(resetFilter('sort'));
  }

  if (sort) {
    yield put(resetFilter('sort'));
    const [sortType, sortOrder] = sort.split(',');
    yield put(setSort(sortType, sortOrder));
  }

  if (tag === '') {
    yield put(resetFilter('sort'));
  }

  if (tag) {
    yield put(resetFilter('tag'));
    const tags = tag.split(',');
    console.log(tags);
    for (let i = 0; i < tags.length; i++) {
      yield put(addTagFilter(tags[i]));
    }
  }

  if (platform === '') {
    yield put(resetFilter('platform'));
  }

  if (platform) {
    yield put(resetFilter('platform'));
    const platforms = platform.split(',');
    for (let i = 0; i < platforms.length; i++) {
      yield put(addPlatformFilter(platforms[i]));
    }
  }
}

export function* loadBounties(action) {
  const { initializeFromQuery } = action;
  const bountiesState = yield select(bountiesStateSelector);
  const loaded = bountiesState.loaded;
  const batch = bountiesState.batch;

  if (action.type !== LOAD_BOUNTIES && (!loaded || batch)) {
    return null;
  }

  if (action.type !== LOAD_BOUNTIES) {
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
  yield takeEvery(
    [
      SET_SORT,
      RESET_FILTERS,
      SET_SEARCH,
      TOGGLE_STAGE_FILTER,
      TOGGLE_DIFFICULTY_FILTER,
      SET_ALL_DIFFICULTY_FILTERS,
      SET_ALL_STAGE_FILTERS,
      ADD_TAG_FILTER,
      REMOVE_TAG_FILTER,
      TOGGLE_TAG_FILTER,
      ADD_PLATFORM_FILTER,
      REMOVE_PLATFORM_FILTER,
      TOGGLE_PLATFORM_FILTER,
      SET_BATCH
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
