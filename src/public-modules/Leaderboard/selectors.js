import { createSelector } from 'reselect';

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
    switchValue: rootLeaderboard.switchValue
  })
);
