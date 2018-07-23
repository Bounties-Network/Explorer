import { createSelector } from 'reselect';
import { LIMIT } from './constants';
import config from 'public-modules/config';

export const rootLeaderboardSelector = state => state.leaderboard;

export const leaderboardSelector = createSelector(
  rootLeaderboardSelector,
  rootLeaderboard => rootLeaderboard
);

export const leaderboardStateSelector = createSelector(
  leaderboardSelector,
  rootLeaderboard => ({
    loading: rootLeaderboard.loading,
    loadingMore: rootLeaderboard.loadingMore,
    loaded: rootLeaderboard.loaded,
    loadingMoreError: rootLeaderboard.loadingMoreError,
    error: rootLeaderboard.error
  })
);

export const leaderboardQuerySelector = createSelector(
  rootLeaderboardSelector,
  rootLeaderboard => {
    const query = {
      limit: LIMIT
      // platform: config.platform
    };

    return query;
  }
);
