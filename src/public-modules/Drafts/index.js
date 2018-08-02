const initialState = {
  loading: true,
  loaded: false,
  error: false,
  loadingMore: false,
  loadingMoreError: false,

  count: 0,
  drafts: []
};

const LOAD_DRAFTS = 'drafts/LOAD_DRAFTS';
const LOAD_DRAFTS_SUCCESS = 'drafts/LOAD_DRAFTS_SUCCESS';
const LOAD_DRAFTS_FAIL = 'drafts/LOAD_DRAFTS_FAIL';

function loadDrafts() {
  return { type: LOAD_DRAFTS };
}

function loadDraftsSuccess(drafts) {
  return {
    type: LOAD_DRAFTS_SUCCESS,
    drafts: drafts.results,
    count: drafts.count
  };
}

function loadDraftsFail(error) {
  return { type: LOAD_DRAFTS_FAIL, error };
}

const LOAD_MORE_DRAFTS = 'drafts/LOAD_MORE_DRAFTS';
const LOAD_MORE_DRAFTS_SUCCESS = 'drafts/LOAD_MORE_DRAFTS_SUCCESS';
const LOAD_MORE_DRAFTS_FAIL = 'drafts/LOAD_MORE_DRAFTS_FAIL';

function loadMoreDrafts() {
  return { type: LOAD_MORE_DRAFTS };
}

function loadMoreDraftsSuccess(drafts) {
  return {
    type: LOAD_MORE_DRAFTS_SUCCESS,
    drafts: drafts.results
  };
}

function loadMoreDraftsFail(error) {
  return { type: LOAD_MORE_DRAFTS_FAIL, error };
}

function DraftsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DRAFTS: {
      return {
        ...state,
        loading: true,
        loaded: false,
        count: 0,
        error: false
      };
    }
    case LOAD_DRAFTS_SUCCESS: {
      const { drafts, count } = action;
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        drafts,
        count
      };
    }
    case LOAD_DRAFTS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: true
      };
    }
    case LOAD_MORE_DRAFTS: {
      return {
        ...state,
        loadingMore: true,
        loadingMoreError: false
      };
    }
    case LOAD_MORE_DRAFTS_SUCCESS: {
      const { drafts, count } = action;
      return {
        ...state,
        loadingMore: false,
        drafts: [...state.drafts, ...drafts]
      };
    }
    case LOAD_MORE_DRAFTS_FAIL: {
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
  loadDrafts,
  loadDraftsSuccess,
  loadDraftsFail,
  loadMoreDrafts,
  loadMoreDraftsSuccess,
  loadMoreDraftsFail
};

export const actionTypes = {
  LOAD_DRAFTS,
  LOAD_DRAFTS_SUCCESS,
  LOAD_DRAFTS_FAIL,
  LOAD_MORE_DRAFTS,
  LOAD_MORE_DRAFTS_SUCCESS,
  LOAD_MORE_DRAFTS_FAIL
};

export default DraftsReducer;
