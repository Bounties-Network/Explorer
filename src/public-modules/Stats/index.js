const initialState = {
  loading: true,
  loaded: false,
  error: false,
  currentUser: {}
};

const LOAD_STATS = 'stats/LOAD_STATS';
const LOAD_STATS_SUCCESS = 'stats/LOAD_STATS_SUCCESS';
const LOAD_STATS_FAIL = 'stats/LOAD_STATS_FAIL';

function loadStats() {
  return { type: LOAD_STATS };
}

function loadStatsSuccess(stats) {
  return {
    type: LOAD_STATS_SUCCESS,
    currentUser: stats
  };
}

function loadStatsFail(error) {
  return { type: LOAD_STATS_FAIL, error };
}

function StatsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_STATS: {
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false
      };
    }
    case LOAD_STATS_SUCCESS: {
      const { currentUser } = action;

      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        currentUser
      };
    }
    case LOAD_STATS_FAIL: {
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
  loadStats,
  loadStatsSuccess,
  loadStatsFail
};

export const actionTypes = {
  LOAD_STATS,
  LOAD_STATS_SUCCESS,
  LOAD_STATS_FAIL
};

export default StatsReducer;
