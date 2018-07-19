const initialState = {
  loading: true,
  loaded: false,
  error: false,
  leaderboard: {},
  switchValue: 'issuer'
};

const LOAD_LEADERBOARD = 'leaderboard/LOAD_LEADERBOARD';
const LOAD_LEADERBOARD_SUCCESS = 'leaderboard/LOAD_LEADERBOARD_SUCCESS';
const LOAD_LEADERBOARD_FAIL = 'leaderboard/LOAD_LEADERBOARD_FAIL';
const USE_LEADERBOARD = 'leaderboard/USE_LEADERBOARD';

function loadLeaderboard() {
  return { type: LOAD_LEADERBOARD };
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

function useLeaderboard(switchValue) {
  return { type: USE_LEADERBOARD, switchValue };
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
    case USE_LEADERBOARD: {
      const { switchValue } = action;
      return {
        ...state,
        switchValue
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
  useLeaderboard
};

export const actionTypes = {
  LOAD_LEADERBOARD,
  LOAD_LEADERBOARD_SUCCESS,
  LOAD_LEADERBOARD_FAIL,
  USE_LEADERBOARD
};

export default LeaderboardReducer;
