import request from 'utils/request';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Drafts';
import { LIMIT } from './constants';
import { commentsSelector } from './selectors';

const { LOAD_COMMENTS, LOAD_MORE_COMMENTS } = actionTypes;
const {
  loadCommentsSuccess,
  loadCommentsFail,
  loadMoreCommentsSuccess,
  loadMoreCommentsFail
} = actions;

export function* loadComments(action) {
  const { bountyId } = action;

  try {
    const endpoint = `bounty/${bountyId}/comment?limit=${LIMIT}`;
    const drafts = yield call(request, endpoint, 'GET');
    yield put(loadCommentsSuccess(drafts));
  } catch (e) {
    yield put(loadCommentsFail(e));
  }
}

export function* loadMoreComments(action) {
  // const drafts_list = yield select(draftsSelector);
  const offset = 0;

  try {
    const endpoint = 'bounty/draft';
    const drafts = yield call(request, endpoint, 'GET', {
      params: { limit: LIMIT, offset }
    });
    yield put(loadMoreCommentsSuccess(drafts));
  } catch (e) {
    yield put(loadMoreCommentsFail(e));
  }
}

export function* watchComments() {
  yield takeLatest(LOAD_COMMENTS, loadComments);
}

export function* watchLoadMoreComments() {
  yield takeLatest(LOAD_MORE_COMMENTS, loadMoreComments);
}

export default [watchComments, watchLoadMoreComments];
