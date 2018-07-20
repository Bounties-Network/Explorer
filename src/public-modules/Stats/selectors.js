import { createSelector } from 'reselect';

export const rootStatsSelector = state => state.stats;

export const statsSelector = createSelector(
  rootStatsSelector,
  rootStats => rootStats
);
