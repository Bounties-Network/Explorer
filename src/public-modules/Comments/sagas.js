import request from 'utils/request';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Comments';
import {
  commentsSelector,
  fulCommentsSelector
} from 'public-modules/Comments/selectors';
import { LIMIT, LIMIT_FUL } from './constants';

const {
  LOAD_COMMENTS,
  LOAD_MORE_COMMENTS,
  POST_COMMENT,
  LOAD_FUL_COMMENTS,
  LOAD_MORE_FUL_COMMENTS,
  POST_FUL_COMMENT
} = actionTypes;
const {
  loadCommentsSuccess,
  loadCommentsFail,
  loadMoreCommentsSuccess,
  loadMoreCommentsFail,
  postCommentSuccess,
  postCommentFail,
  loadFulCommentsSuccess,
  loadFulCommentsFail,
  loadMoreFulCommentsSuccess,
  loadMoreFulCommentsFail,
  postFulCommentSuccess,
  postFulCommentFail
} = actions;

export function* loadComments(action) {
  const { bountyId } = action;

  try {
    const endpoint = `bounty/${bountyId}/comment/?limit=${LIMIT}`;
    const comments = yield call(request, endpoint, 'GET');

    yield put(loadCommentsSuccess(comments.results, comments.count));
  } catch (e) {
    yield put(loadCommentsFail(e));
  }
}

export function* loadMoreComments(action) {
  const { comments: currentComments, bountyId } = yield select(
    commentsSelector
  );

  const params = {
    limit: LIMIT,
    offset: currentComments.length
  };

  try {
    const endpoint = `bounty/${bountyId}/comment/`;
    const comments = yield call(request, endpoint, 'GET', { params });
    yield put(loadMoreCommentsSuccess(comments.results));
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

export function* loadFulComments(action) {
  const { id } = action;

  try {
    const endpoint = `fulfillment/${id}/comment/?limit=${LIMIT_FUL}`;
    const comments = yield call(request, endpoint, 'GET');
    yield put(loadFulCommentsSuccess(comments.results, comments.count));
  } catch (e) {
    yield put(loadFulCommentsFail(e));
  }
}

export function* loadMoreFulComments(action) {
  const { fulComments, id } = yield select(fulCommentsSelector);

  const params = {
    limit: LIMIT_FUL,
    offset: fulComments.length
  };

  try {
    const endpoint = `fulfillment/${id}/comment/`;
    const comments = yield call(request, endpoint, 'GET', { params });

    yield put(loadMoreFulCommentsSuccess(comments.results));
  } catch (e) {
    console.log(e);
    yield put(loadMoreFulCommentsFail(e));
  }
}

export function* postNewFulComment(action) {
  const { id, text } = action;
  try {
    let endpoint = `fulfillment/${id}/comment/`;
    const comment = yield call(request, endpoint, 'POST', { data: { text } });
    yield put(postFulCommentSuccess(comment));
  } catch (e) {
    console.log(e);
    yield put(postFulCommentFail(e));
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

export function* watchFulComments() {
  yield takeLatest(LOAD_FUL_COMMENTS, loadFulComments);
}

export function* watchLoadMoreFulComments() {
  yield takeLatest(LOAD_MORE_FUL_COMMENTS, loadMoreFulComments);
}

export function* watchPostFulComment() {
  yield takeLatest(POST_FUL_COMMENT, postNewFulComment);
}

export default [
  watchComments,
  watchLoadMoreComments,
  watchPostComment,
  watchFulComments,
  watchLoadMoreFulComments,
  watchPostFulComment
];
