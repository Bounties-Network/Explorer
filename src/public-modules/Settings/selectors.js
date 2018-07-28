import { createSelector } from 'reselect';

export const rootBountySelector = state => state.bounty;

export const createDraftStateSelector = createSelector(
  rootBountySelector,
  rootBounty => rootBounty.createDraftState
);

export const createBountyStateSelector = createSelector(
  rootBountySelector,
  rootBounty => rootBounty.createBountyState
);
