const initialState = {
  loading: true,
  loaded: false,
  error: false,
  leaderboard: []
};

const LOAD_LEADERBOARD = 'leaderboard/LOAD_LEADERBOARD';
const LOAD_LEADERBOARD_SUCCESS = 'leaderboard/LOAD_LEADERBOARD_SUCCESS';
const LOAD_LEADERBOARD_FAIL = 'leaderboard/LOAD_LEADERBOARD_FAIL';

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
      console.log('error?', state, action);
      return {
        ...state,
        loading: false,
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
  loadLeaderboardFail
};

export const actionTypes = {
  LOAD_LEADERBOARD,
  LOAD_LEADERBOARD_SUCCESS,
  LOAD_LEADERBOARD_FAIL
};

export default LeaderboardReducer;
