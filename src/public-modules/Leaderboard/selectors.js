import { createSelector } from 'reselect';

export const rootLeaderboardSelector = state => state.leaderboard;

export const leaderboardSelector = createSelector(
  rootLeaderboardSelector,
  rootLeaderboard => rootLeaderboard
);
