import request from 'utils/request';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Comments';
import { LIMIT } from './constants';
import { commentsSelector } from './selectors';

const { LOAD_COMMENTS, LOAD_MORE_COMMENTS, POST_COMMENT } = actionTypes;
const {
  loadCommentsSuccess,
  loadCommentsFail,
  loadMoreCommentsSuccess,
  loadMoreCommentsFail,
  postCommentSuccess,
  postCommentFail
} = actions;

export function* loadComments(action) {
  const { bountyId } = action;

  try {
    const endpoint = `bounty/${bountyId}/comment/?limit=${LIMIT}`;
    const comments = yield call(request, endpoint, 'GET');

    yield put(loadCommentsSuccess(comments, comments.length));
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
    console.log(e);
    yield put(loadMoreCommentsFail(e));
  }
}

export function* postNewComment(action) {
  const { bountyId, text } = action;

  try {
    let endpoint = `bounty/${bountyId}/comment/`;
    const comment = yield call(request, endpoint, 'POST', { data: { text } });

    yield put(postCommentSuccess(comment));
  } catch (e) {
    console.log(e);
    yield put(postCommentFail(e));
  }
}

export function* watchComments() {
  yield takeLatest(LOAD_COMMENTS, loadComments);
}

export function* watchLoadMoreComments() {
  yield takeLatest(LOAD_MORE_COMMENTS, loadMoreComments);
}

export function* watchPostComment() {
  yield takeLatest(POST_COMMENT, postNewComment);
}

export default [watchComments, watchLoadMoreComments, watchPostComment];
