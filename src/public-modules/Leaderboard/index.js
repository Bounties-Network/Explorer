const initialState = {
  loading: true,
  loaded: false,
  error: false,
  leaderboard: []
};

const LOAD_LEADERBOARD = 'leaderboard/LOAD_LEADERBOARD';
const LOAD_LEADERBOARD_SUCCESS = 'leaderboard/LOAD_LEADERBOARD_SUCCESS';
const LOAD_LEADERBOARD_FAIL = 'leaderboard/LOAD_LEADERBOARD_FAIL';

const LOAD_MORE_LEADERBOARD = 'leaderboard/LOAD_MORE_LEADERBOARD';
const LOAD_MORE_LEADERBOARD_SUCCESS =
  'leaderboard/LOAD_MORE_LEADERBOARD_SUCCESS';
const LOAD_MORE_LEADERBOARD_FAIL = 'leaderboard/LOAD_MORE_LEADERBOARD_FAIL';

function loadLeaderboard(category) {
  return { type: LOAD_LEADERBOARD, leaderboardCategory: category };
}

function loadLeaderboardSuccess(leaderboard) {
  return {
    type: LOAD_LEADERBOARD_SUCCESS,
    leaderboard
  };
}

function loadLeaderboardFail(error) {
  return { type: LOAD_LEADERBOARD_FAIL, error };
}

function loadMoreLeaderboard(category, offset) {
  return { type: LOAD_MORE_LEADERBOARD, leaderboardCategory: category, offset };
}

function loadMoreLeaderboardSuccess(leaderboard) {
  return {
    type: LOAD_MORE_LEADERBOARD_SUCCESS,
    leaderboard
  };
}

function loadMoreLeaderboardFail(error) {
  return { type: LOAD_MORE_LEADERBOARD_FAIL, error };
}

function LeaderboardReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_LEADERBOARD: {
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false
      };
    }
    case LOAD_LEADERBOARD_SUCCESS: {
      const { leaderboard } = action;

      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        leaderboard
      };
    }
    case LOAD_LEADERBOARD_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: true
      };
    }
    case LOAD_MORE_LEADERBOARD: {
      return {
        ...state,
        loadingMore: true,
        loaded: false,
        error: false
      };
    }
    case LOAD_MORE_LEADERBOARD_SUCCESS: {
      const { leaderboard } = action;
      return {
        ...state,
        loadingMore: false,
        loaded: true,
        error: false,
        leaderboard
      };
    }
    case LOAD_MORE_LEADERBOARD_FAIL: {
      return {
        ...state,
        loadingMore: false,
        loaded: true,
        error: true
      };
    }
    default:
      return state;
  }
}

export const actions = {
  loadLeaderboard,
  loadLeaderboardSuccess,
  loadLeaderboardFail,
  loadMoreLeaderboard,
  loadMoreLeaderboardSuccess,
  loadMoreLeaderboardFail
};

export const actionTypes = {
  LOAD_LEADERBOARD,
  LOAD_LEADERBOARD_SUCCESS,
  LOAD_LEADERBOARD_FAIL,
  LOAD_MORE_LEADERBOARD,
  LOAD_MORE_LEADERBOARD_SUCCESS,
  LOAD_MORE_LEADERBOARD_FAIL
};

export default LeaderboardReducer;
