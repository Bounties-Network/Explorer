import config from 'public-modules/config';

const initialState = {
  loading: true,
  loadingMore: false,
  loadingMoreError: false,
  loaded: false,
  error: false,
  count: { issuer: 0, fulfiller: 0 },
  leaderboard: { issuer: [], fulfiller: [] },
  platformFilters: new Set([config.postingPlatform])
};

const LOAD_LEADERBOARD = 'leaderboard/LOAD_LEADERBOARD';
const LOAD_LEADERBOARD_SUCCESS = 'leaderboard/LOAD_LEADERBOARD_SUCCESS';
const LOAD_MORE_LEADERBOARD = 'leaderboard/LOAD_MORE_LEADERBOARD';
const LOAD_MORE_LEADERBOARD_SUCCESS =
  'leaderboard/LOAD_MORE_LEADERBOARD_SUCCESS';
const LOAD_LEADERBOARD_FAIL = 'leaderboard/LOAD_LEADERBOARD_FAIL';

function loadLeaderboard() {
  return { type: LOAD_LEADERBOARD };
}

function loadMoreLeaderboard() {
  return { type: LOAD_MORE_LEADERBOARD };
}

function loadLeaderboardSuccess(leaderboard, count) {
  return {
    type: LOAD_LEADERBOARD_SUCCESS,
    leaderboard,
    count
  };
}

function loadMoreLeaderboardSuccess(leaderboard) {
  return {
    type: LOAD_MORE_LEADERBOARD_SUCCESS,
    leaderboard
  };
}

function loadLeaderboardFail(error) {
  return { type: LOAD_LEADERBOARD_FAIL, error };
}

const SET_PLATFORM_FILTER = 'leaderboard/SET_PLATFORM_FILTER';
const ADD_PLATFORM_FILTER = 'leaderboard/ADD_PLATFORM_FILTER';
const REMOVE_PLATFORM_FILTER = 'leaderboard/REMOVE_PLATFORM_FILTER';

function setPlatformFilter(platform) {
  return { type: SET_PLATFORM_FILTER, platform };
}

function addPlatformFilter(platform) {
  return { type: ADD_PLATFORM_FILTER, platform };
}

function removePlatformFilter(platform) {
  return { type: REMOVE_PLATFORM_FILTER, platform };
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
    case LOAD_MORE_LEADERBOARD: {
      return {
        ...state,
        loadingMore: true,
        loadingMoreError: false
      };
    }
    case LOAD_LEADERBOARD_SUCCESS: {
      const { leaderboard: leaderboards } = action;
      const { issuer, fulfiller } = leaderboards;
      const leaderboard = {
        issuer: issuer.results,
        fulfiller: fulfiller.results
      };
      const count = { issuer: issuer.count, fulfiller: fulfiller.count };
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        leaderboard,
        count
      };
    }
    case LOAD_MORE_LEADERBOARD_SUCCESS: {
      const { leaderboard } = action;
      const issuer = [...state.leaderboard.issuer, ...leaderboard.issuer];
      const fulfiller = [
        ...state.leaderboard.fulfiller,
        ...leaderboard.fulfiller
      ];

      return {
        ...state,
        loadingMore: false,
        leaderboard: { issuer, fulfiller }
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
    case SET_PLATFORM_FILTER: {
      const { platform } = action;
      const updated_filters = new Set([platform]);

      return {
        ...state,
        platformFilters: updated_filters
      };
    }
    case ADD_PLATFORM_FILTER: {
      const { platform } = action;
      const updated_filters = new Set(state.platformFilters);
      updated_filters.add(platform);

      return {
        ...state,
        platformFilters: updated_filters
      };
    }
    case REMOVE_PLATFORM_FILTER: {
      const { platform } = action;
      const updated_filters = new Set(state.platformFilters);
      updated_filters.delete(platform);

      return {
        ...state,
        platformFilters: updated_filters
      };
    }
    default:
      return state;
  }
}

export const actions = {
  loadLeaderboard,
  loadMoreLeaderboard,
  loadLeaderboardSuccess,
  loadMoreLeaderboardSuccess,
  loadLeaderboardFail,
  setPlatformFilter,
  addPlatformFilter,
  removePlatformFilter
};

export const actionTypes = {
  LOAD_LEADERBOARD,
  LOAD_MORE_LEADERBOARD,
  LOAD_LEADERBOARD_SUCCESS,
  LOAD_MORE_LEADERBOARD_SUCCESS,
  LOAD_LEADERBOARD_FAIL,
  SET_PLATFORM_FILTER,
  ADD_PLATFORM_FILTER,
  REMOVE_PLATFORM_FILTER
};

export default LeaderboardReducer;
