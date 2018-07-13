import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Bounties';
import { searchQueryBuilder } from '../Utilities/helpers';

const {
  LOAD_BOUNTIES,
  SET_SORT,
  SET_SEARCH,
  TOGGLE_STAGE_FILTER,
  TOGGLE_DIFFICULTY_FILTER,
  ADD_CATEGORY_FILTER,
  REMOVE_CATEGORY_FILTER
} = actionTypes;

const { loadBountiesFail, loadBountiesSuccess } = actions;

export function* loadBounties(action) {
  let query = searchQueryBuilder(action.searchOptions);
  try {
    let endpoint = 'bounty/?offset=500&limit=30';
    const bounties = yield call(request, endpoint, 'GET');
    yield put(loadBountiesSuccess(bounties));
  } catch (e) {
    yield put(loadBountiesFail(e));
  }
}

export function* watchBounties() {
  yield takeLatest(
    [
      LOAD_BOUNTIES,
      SET_SORT,
      SET_SEARCH,
      TOGGLE_STAGE_FILTER,
      TOGGLE_DIFFICULTY_FILTER,
      ADD_CATEGORY_FILTER,
      REMOVE_CATEGORY_FILTER
    ],
    loadBounties
  );
}

export default [watchBounties];
