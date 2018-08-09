const initialState = {
  loading: true,
  loaded: false,
  error: false,
  loadingMore: false,
  loadingMoreError: false,

  count: 0,
  comments: []
};

const LOAD_COMMENTS = 'comments/LOAD_COMMENTS';
const LOAD_COMMENTS_SUCCESS = 'comments/LOAD_COMMENTS_SUCCESS';
const LOAD_COMMENTS_FAIL = 'comments/LOAD_COMMENTS_FAIL';

function loadComments() {
  return { type: LOAD_COMMENTS };
}

function loadCommentsSuccess(comments) {
  return {
    type: LOAD_COMMENTS_SUCCESS,
    comments: comments.results,
    count: comments.count
  };
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
  return {
    type: LOAD_MORE_COMMENTS_SUCCESS,
    comments: comments.results
  };
}

function loadMoreCommentsFail(error) {
  return { type: LOAD_MORE_COMMENTS_FAIL, error };
}

function CommentsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_COMMENTS: {
      return {
        ...state,
        loading: true,
        loaded: false,
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
      const { comments, count } = action;
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
  loadMoreCommentsFail
};

export const actionTypes = {
  LOAD_COMMENTS,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_FAIL,
  LOAD_MORE_COMMENTS,
  LOAD_MORE_COMMENTS_SUCCESS,
  LOAD_MORE_COMMENTS_FAIL
};

export default CommentsReducer;
