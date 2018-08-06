import { createSelector } from 'reselect';

export const rootBountySelector = state => state.bounty;

export const createDraftStateSelector = createSelector(
  rootBountySelector,
  rootBounty => rootBounty.createDraftState
);

export const stdBountyStateSelector = createSelector(
  rootBountySelector,
  rootBounty => rootBounty.stdBountyState
);

export const getDraftStateSelector = createSelector(
  rootBountySelector,
  rootBounty => rootBounty.getDraftState
);

export const getBountyStateSelector = createSelector(
  rootBountySelector,
  rootBounty => rootBounty.getBountyState
);

export const getBountySelector = createSelector(
  rootBountySelector,
  rootBounty => rootBounty.bounty
);

export const getDraftBountySelector = createSelector(
  rootBountySelector,
  rootBounty => rootBounty.draftBounty
);
