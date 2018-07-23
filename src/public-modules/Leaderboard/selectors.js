import { createSelector } from 'reselect';
import { LIMIT } from './constants';

export const rootLeaderboardSelector = state => state.leaderboard;

export const leaderboardSelector = createSelector(
  rootLeaderboardSelector,
  rootLeaderboard => rootLeaderboard
);

export const leaderboardStateSelector = createSelector(
  leaderboardSelector,
  rootLeaderboard => ({
    loading: rootLeaderboard.loading,
    loaded: rootLeaderboard.loaded,
    error: rootLeaderboard.error,
    toggleValue: rootLeaderboard.toggleValue
  })
);

export const leaderboardQuerySelector = createSelector(
  rootLeaderboardSelector,
  rootLeaderboard => {
    const query = {
      limit: LIMIT,
      offset: rootLeaderboard.offset
    };

    return query;
  }
);
