import request from 'utils/request';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Bounties';
import { bountiesQuerySelector } from 'public-modules/Bounties/selectors';

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
  let params = yield select(bountiesQuerySelector);
  try {
    let endpoint = 'bounty/';
    const bounties = yield call(request, endpoint, 'GET', { params });
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
