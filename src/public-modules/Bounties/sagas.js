import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Bounties';
import { searchQueryBuilder } from '../Utilities/helpers';

const { LOAD_BOUNTIES } = actionTypes;
const { loadBountiesFail, loadBountiesSuccess } = actions;

export function* loadBounties(action) {
  let query = searchQueryBuilder(action.searchOptions);
  try {
    let endpoint = 'bounty/' + query;
    const bounties = yield call(request, endpoint, 'GET');
    yield put(loadBountiesSuccess(bounties));
  } catch (e) {
    yield put(loadBountiesFail(e));
  }
}

export function* watchBounties() {
  yield takeLatest(LOAD_BOUNTIES, loadBounties);
}

export default [watchBounties];
