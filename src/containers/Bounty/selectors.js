import { createSelector } from 'reselect';

export const rootBountyPageSelector = state => state.bountyPageUI;

export const bountyPageSelector = createSelector(
  rootBountyPageSelector,
  rootBounty => rootBounty
);

export const bountyIdSelector = createSelector(
  rootBountyPageSelector,
  rootBounty => rootBounty.bountyId
);

export const ratingModalSelector = createSelector(
  bountyPageSelector,
  bountyPage => bountyPage.ratingModal
);

export const rejectionModalSelector = createSelector(
  bountyPageSelector,
  bountyPage => bountyPage.rejectionModal
);
