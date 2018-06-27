import { createSelector } from 'reselect';

export const rootBountiesSelector = state => state.bounties;

export const bountiesSelector = createSelector(
  rootBountiesSelector,
  rootBounty => rootBounty.bounties
);

export const bountiesCountSelector = createSelector(
  rootBountiesSelector,
  rootBounty => rootBounty.count
);

export const bountiesStateSelector = createSelector(
  rootBountiesSelector,
  rootBounty => ({
    loadingMore: rootBounty.loadingMore,
    loading: rootBounty.loading,
    loaded: rootBounty.loaded,
    error: rootBounty.error
  })
);
