const initialState = {
  loading: false,
  loaded: false,
  error: false,
  loadingMore: false,
  loadingMoreError: false,
  posting: false,
  postingError: false,
  count: 0,
  comments: [],
  loadingFulComments: false,
  loadedFulComments: false,
  errorFulComments: false,
  loadingMoreFulComments: false,
  loadingMoreFulCommentsError: false,
  postingFulComments: false,
  postingFulCommentsError: false,
  countFulComments: 0,
  fulComments: []
};

const RESET_STATE = 'comments/RESET_STATE';
const LOAD_COMMENTS = 'comments/LOAD_COMMENTS';
const LOAD_COMMENTS_SUCCESS = 'comments/LOAD_COMMENTS_SUCCESS';
const LOAD_COMMENTS_FAIL = 'comments/LOAD_COMMENTS_FAIL';
const LOAD_FUL_COMMENTS = 'comments/LOAD_FUL_COMMENTS';
const LOAD_FUL_COMMENTS_SUCCESS = 'comments/LOAD_FUL_COMMENTS_SUCCESS';
const LOAD_FUL_COMMENTS_FAIL = 'comments/LOAD_FUL_COMMENTS_FAIL';
const LOAD_MORE_COMMENTS = 'comments/LOAD_MORE_COMMENTS';
const LOAD_MORE_COMMENTS_SUCCESS = 'comments/LOAD_MORE_COMMENTS_SUCCESS';
const LOAD_MORE_COMMENTS_FAIL = 'comments/LOAD_MORE_COMMENTS_FAIL';
const LOAD_MORE_FUL_COMMENTS = 'comments/LOAD_MORE_FUL_COMMENTS';
const LOAD_MORE_FUL_COMMENTS_SUCCESS =
  'comments/LOAD_MORE_FUL_COMMENTS_SUCCESS';
const LOAD_MORE_FUL_COMMENTS_FAIL = 'comments/LOAD_MORE_FUL_COMMENTS_FAIL';
const POST_COMMENT = 'comments/POST_COMMENT';
const POST_COMMENT_SUCCESS = 'comments/POST_COMMENT_SUCCESS';
const POST_COMMENT_FAIL = 'comments/POST_COMMENT_FAIL';
const POST_FUL_COMMENT = 'comments/POST_FUL_COMMENT';
const POST_FUL_COMMENT_SUCCESS = 'comments/POST_FUL_COMMENT_SUCCESS';
const POST_FUL_COMMENT_FAIL = 'comments/POST_FUL_COMMENT_FAIL';

function resetState() {
  return { type: RESET_STATE };
}

function loadComments(bountyId) {
  return { type: LOAD_COMMENTS, bountyId };
}

function loadCommentsSuccess(comments, count) {
  return { type: LOAD_COMMENTS_SUCCESS, comments, count };
}

function loadCommentsFail(error) {
  return { type: LOAD_COMMENTS_FAIL, error };
}

function loadFulComments(id) {
  return { type: LOAD_FUL_COMMENTS, id };
}

function loadFulCommentsSuccess(comments, count) {
  return { type: LOAD_FUL_COMMENTS_SUCCESS, comments, count };
}

function loadFulCommentsFail(error) {
  return { type: LOAD_FUL_COMMENTS_FAIL, error };
}

function loadMoreComments() {
  return { type: LOAD_MORE_COMMENTS };
}

function loadMoreCommentsSuccess(comments) {
  return { type: LOAD_MORE_COMMENTS_SUCCESS, comments };
}

function loadMoreCommentsFail(error) {
  return { type: LOAD_MORE_COMMENTS_FAIL, error };
}

function loadMoreFulComments() {
  return { type: LOAD_MORE_FUL_COMMENTS };
}

function loadMoreFulCommentsSuccess(comments) {
  return { type: LOAD_MORE_FUL_COMMENTS_SUCCESS, comments };
}

function loadMoreFulCommentsFail(error) {
  return { type: LOAD_MORE_FUL_COMMENTS_FAIL, error };
}

function postComment(bountyId, text) {
  return { type: POST_COMMENT, bountyId, text };
}

function postCommentSuccess(comment) {
  return { type: POST_COMMENT_SUCCESS, comment };
}

function postCommentFail(error) {
  return { type: POST_COMMENT_FAIL, error };
}

function postFulComment(id, text) {
  return { type: POST_FUL_COMMENT, id, text };
}

function postFulCommentSuccess(comment) {
  return { type: POST_FUL_COMMENT_SUCCESS, comment };
}

function postFulCommentFail(error) {
  return { type: POST_FUL_COMMENT_FAIL, error };
}

function CommentsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_COMMENTS: {
      const { bountyId } = action;

      return {
        ...state,
        loading: true,
        loaded: false,
        bountyId,
        count: 0,
        error: false
      };
    }
    case LOAD_COMMENTS_SUCCESS: {
      const { comments, count } = action;
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        comments,
        count
      };
    }
    case LOAD_COMMENTS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: true
      };
    }
    case LOAD_MORE_COMMENTS: {
      return {
        ...state,
        loadingMore: true,
        loadingMoreError: false
      };
    }
    case LOAD_MORE_COMMENTS_SUCCESS: {
      const { comments } = action;
      return {
        ...state,
        loadingMore: false,
        comments: [...state.comments, ...comments]
      };
    }
    case LOAD_MORE_COMMENTS_FAIL: {
      return {
        ...state,
        loadingMore: false,
        loadingMoreError: true
      };
    }
    case POST_COMMENT: {
      return {
        ...state,
        posting: true,
        postingError: false
      };
    }
    case POST_COMMENT_SUCCESS: {
      const { comment } = action;
      return {
        ...state,
        posting: false,
        comments: [comment, ...state.comments]
      };
    }
    case POST_COMMENT_FAIL: {
      return {
        ...state,
        posting: false,
        postingError: true
      };
    }
    case LOAD_FUL_COMMENTS: {
      const { id } = action;

      return {
        ...state,
        loadingFulComments: true,
        loadedFulComments: false,
        id,
        countFulComments: 0,
        errorFulComments: false
      };
    }
    case LOAD_FUL_COMMENTS_SUCCESS: {
      const { comments, count } = action;
      return {
        ...state,
        loadingFulComments: false,
        loadedFulComments: true,
        errorFulComments: false,
        fulComments: comments,
        countFulComments: count
      };
    }
    case LOAD_FUL_COMMENTS_FAIL: {
      return {
        ...state,
        loadingFulComments: false,
        loadedFulComments: true,
        errorFulComments: true
      };
    }
    case LOAD_MORE_FUL_COMMENTS: {
      return {
        ...state,
        loadingMoreFulComments: true,
        loadingMoreFulCommentsError: false
      };
    }
    case LOAD_MORE_FUL_COMMENTS_SUCCESS: {
      const { comments } = action;
      return {
        ...state,
        loadingMoreFulComments: false,
        fulComments: [...state.fulComments, ...comments]
      };
    }
    case LOAD_MORE_FUL_COMMENTS_FAIL: {
      return {
        ...state,
        loadingMoreFulComments: false,
        loadingMoreFulCommentsError: true
      };
    }
    case POST_FUL_COMMENT: {
      return {
        ...state,
        postingFulComments: true,
        postingFulCommentsError: false
      };
    }
    case POST_FUL_COMMENT_SUCCESS: {
      const { comment } = action;
      return {
        ...state,
        postingFulComments: false,
        countFulComments: 1 + state.countFulComments,
        fulComments: [comment, ...state.fulComments]
      };
    }
    case POST_FUL_COMMENT_FAIL: {
      return {
        ...state,
        postingFulComments: false,
        postingFulCommentsError: true
      };
    }
    case RESET_STATE: {
      return initialState;
    }
    default:
      return state;
  }
}

export const actions = {
  loadComments,
  loadCommentsSuccess,
  loadCommentsFail,
  loadMoreComments,
  loadMoreCommentsSuccess,
  loadMoreCommentsFail,
  postComment,
  postCommentSuccess,
  postCommentFail,
  loadFulComments,
  loadFulCommentsSuccess,
  loadFulCommentsFail,
  loadMoreFulComments,
  loadMoreFulCommentsSuccess,
  loadMoreFulCommentsFail,
  postFulComment,
  postFulCommentSuccess,
  postFulCommentFail,
  resetState
};

export const actionTypes = {
  LOAD_COMMENTS,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_FAIL,
  LOAD_MORE_COMMENTS,
  LOAD_MORE_COMMENTS_SUCCESS,
  LOAD_MORE_COMMENTS_FAIL,
  POST_COMMENT,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAIL,
  LOAD_FUL_COMMENTS,
  LOAD_FUL_COMMENTS_SUCCESS,
  LOAD_FUL_COMMENTS_FAIL,
  LOAD_MORE_FUL_COMMENTS,
  LOAD_MORE_FUL_COMMENTS_SUCCESS,
  LOAD_MORE_FUL_COMMENTS_FAIL,
  POST_FUL_COMMENT,
  POST_FUL_COMMENT_SUCCESS,
  POST_FUL_COMMENT_FAIL,
  RESET_STATE
};

export default CommentsReducer;
