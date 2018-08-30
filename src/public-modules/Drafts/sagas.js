import request from 'utils/request';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { toLower } from 'lodash';
import { actionTypes, actions } from 'public-modules/Drafts';
import { addressSelector } from 'public-modules/Client/selectors';
import { draftsSelector } from './selectors';
import { LIMIT } from './constants';
import config from 'public-modules/config';

const { LOAD_DRAFTS, LOAD_MORE_DRAFTS } = actionTypes;
const {
  loadDraftsSuccess,
  loadDraftsFail,
  loadMoreDraftsSuccess,
  loadMoreDraftsFail
} = actions;

export function* loadDrafts(action) {
  const address = yield select(addressSelector);
  const params = {
    issuer: toLower(address),
    platform__in: config.platform,
    limit: LIMIT
  };

  try {
    const endpoint = 'bounty/draft/';
    const drafts = yield call(request, endpoint, 'GET', { params });
    yield put(loadDraftsSuccess(drafts));
  } catch (e) {
    yield put(loadDraftsFail(e));
  }
}

export function* loadMoreDrafts(action) {
  const address = yield select(addressSelector);
  const drafts_list = yield select(draftsSelector);
  const params = {
    issuer: toLower(address),
    platform__in: config.platform,
    offset: drafts_list.length,
    limit: LIMIT
  };

  try {
    const endpoint = 'bounty/draft';
    const drafts = yield call(request, endpoint, 'GET', { params });
    yield put(loadMoreDraftsSuccess(drafts));
  } catch (e) {
    yield put(loadMoreDraftsFail(e));
  }
}

export function* watchDrafts() {
  yield takeLatest(LOAD_DRAFTS, loadDrafts);
}

export function* watchLoadMoreDrafts() {
  yield takeLatest(LOAD_MORE_DRAFTS, loadMoreDrafts);
}

export default [watchDrafts, watchLoadMoreDrafts];
