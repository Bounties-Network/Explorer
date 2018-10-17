import { createSelector } from 'reselect';
import { LIMIT } from './constants';
import { expandPlatforms } from 'utils/global';
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

export const leaderboardPlatformFiltersSelector = createSelector(
  leaderboardSelector,
  rootLeaderboard => [...rootLeaderboard.platformFilters]
);

export const leaderboardQuerySelector = createSelector(
  leaderboardSelector,
  rootLeaderboard => {
    const query = {
      limit: LIMIT,
      platform__in: rootLeaderboard.platformFilters.size
        ? expandPlatforms([...rootLeaderboard.platformFilters])
        : config.platform
    };

    return query;
  }
);
