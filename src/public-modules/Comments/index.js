const initialState = {
  loading: false,
  loaded: false,
  error: false,
  loadingMore: false,
  loadingMoreError: false,
  posting: false,
  postingError: false,
  count: 0,
  comments: []
};

const RESET_STATE = 'comments/RESET_STATE';

function resetState() {
  return { type: RESET_STATE };
}

const LOAD_COMMENTS = 'comments/LOAD_COMMENTS';
const LOAD_COMMENTS_SUCCESS = 'comments/LOAD_COMMENTS_SUCCESS';
const LOAD_COMMENTS_FAIL = 'comments/LOAD_COMMENTS_FAIL';

function loadComments(bountyId) {
  return { type: LOAD_COMMENTS, bountyId };
}

function loadCommentsSuccess(comments, count) {
  return { type: LOAD_COMMENTS_SUCCESS, comments, count };
}

function loadCommentsFail(error) {
  return { type: LOAD_COMMENTS_FAIL, error };
}

const LOAD_MORE_COMMENTS = 'comments/LOAD_MORE_COMMENTS';
const LOAD_MORE_COMMENTS_SUCCESS = 'comments/LOAD_MORE_COMMENTS_SUCCESS';
const LOAD_MORE_COMMENTS_FAIL = 'comments/LOAD_MORE_COMMENTS_FAIL';

function loadMoreComments() {
  return { type: LOAD_MORE_COMMENTS };
}

function loadMoreCommentsSuccess(comments) {
  return { type: LOAD_MORE_COMMENTS_SUCCESS, comments };
}

function loadMoreCommentsFail(error) {
  return { type: LOAD_MORE_COMMENTS_FAIL, error };
}

const POST_COMMENT = 'comments/POST_COMMENT';
const POST_COMMENT_SUCCESS = 'comments/POST_COMMENT_SUCCESS';
const POST_COMMENT_FAIL = 'comments/POST_COMMENT_FAIL';

function postComment(bountyId, text) {
  return { type: POST_COMMENT, bountyId, text };
}

function postCommentSuccess(comment) {
  return { type: POST_COMMENT_SUCCESS, comment };
}

function postCommentFail(error) {
  return { type: POST_COMMENT_FAIL, error };
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
        comments: [...state.comments, comment]
      };
    }
    case POST_COMMENT_FAIL: {
      return {
        ...state,
        posting: false,
        postingError: true
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
  RESET_STATE
};

export default CommentsReducer;
