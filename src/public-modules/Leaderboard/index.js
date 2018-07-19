const initialState = {
  loading: true,
  loaded: false,
  error: false,
  leaderboard: {},
  toggleValue: 'fulfiller'
};

const LOAD_LEADERBOARD = 'leaderboard/LOAD_LEADERBOARD';
const LOAD_LEADERBOARD_SUCCESS = 'leaderboard/LOAD_LEADERBOARD_SUCCESS';
const LOAD_LEADERBOARD_FAIL = 'leaderboard/LOAD_LEADERBOARD_FAIL';
const LEADERBOARD_TOGGLE = 'leaderboard/LEADERBOARD_TOGGLE';

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

function leaderboardToggle() {
  return { type: LEADERBOARD_TOGGLE };
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
    case LEADERBOARD_TOGGLE: {
      const toggleValue =
        state.toggleValue === 'fulfiller' ? 'issuer' : 'fulfiller';

      return {
        ...state,
        toggleValue
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
  leaderboardToggle
};

export const actionTypes = {
  LOAD_LEADERBOARD,
  LOAD_LEADERBOARD_SUCCESS,
  LOAD_LEADERBOARD_FAIL,
  LEADERBOARD_TOGGLE
};

export default LeaderboardReducer;
