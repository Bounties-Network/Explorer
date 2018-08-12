import { createSelector } from 'reselect';

export const rootBountyPageSelector = state => state.bountyPageUI;

export const bountyIdSelector = createSelector(
  rootBountyPageSelector,
  rootBounty => rootBounty.bountyId
);

export const modalPropsSelector = createSelector(
  rootBountyPageSelector,
  rootBounty => rootBounty.modalProps
);
