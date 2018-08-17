const initialState = {
  loading: true,
  loaded: false,
  error: false,
  loadingMore: false,
  loadingMoreError: false,
  offset: 0,
  count: 0,
  activity: []
};

const LOAD_ACTIVITY = 'notifications/LOAD_ACTIVITY';
const LOAD_ACTIVITY_SUCCESS = 'notifications/LOAD_ACTIVITY_SUCCESS';
const LOAD_ACTIVITY_FAIL = 'notifications/LOAD_ACTIVITY_FAIL';

const LOAD_MORE_ACTIVITY = 'notifications/LOAD_MORE_ACTIVITY';
const LOAD_MORE_ACTIVITY_SUCCESS = 'notifications/LOAD_MORE_ACTIVITY_SUCCESS';
const LOAD_MORE_ACTIVITY_FAIL = 'notifications/LOAD_MORE_ACTIVITY_FAIL';

function loadActivity(address) {
  return { type: LOAD_ACTIVITY, address };
}

function loadActivitySuccess(activity, count) {
  return {
    type: LOAD_ACTIVITY_SUCCESS,
    activity,
    count
  };
}

function loadActivityFail(error) {
  return { type: LOAD_ACTIVITY_FAIL, error };
}

function loadMoreActivity(address) {
  return { type: LOAD_MORE_ACTIVITY, address };
}

function loadMoreActivitySuccess(activity, count) {
  return {
    type: LOAD_MORE_ACTIVITY_SUCCESS,
    activity
  };
}

function loadMoreActivityFail(error) {
  return { type: LOAD_MORE_ACTIVITY_FAIL, error };
}

function ActivityReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ACTIVITY: {
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false
      };
    }
    case LOAD_ACTIVITY_SUCCESS: {
      const { activity, count } = action;

      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        activity,
        count
      };
    }
    case LOAD_ACTIVITY_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: true
      };
    }
    case LOAD_MORE_ACTIVITY: {
      return {
        ...state,
        loadingMore: true,
        loadingMoreError: false
      };
    }
    case LOAD_MORE_ACTIVITY_SUCCESS: {
      const { activity, count } = action;

      return {
        ...state,
        loadingMore: false,
        activity: [...state.activity, ...activity]
      };
    }
    case LOAD_MORE_ACTIVITY_FAIL: {
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
  loadActivity,
  loadActivitySuccess,
  loadActivityFail,
  loadMoreActivity,
  loadMoreActivitySuccess,
  loadMoreActivityFail
};

export const actionTypes = {
  LOAD_ACTIVITY,
  LOAD_ACTIVITY_SUCCESS,
  LOAD_ACTIVITY_FAIL,
  LOAD_MORE_ACTIVITY,
  LOAD_MORE_ACTIVITY_SUCCESS,
  LOAD_MORE_ACTIVITY_FAIL
};

export default ActivityReducer;
