import { createSelector } from 'reselect';

export const rootFulfillmentSelector = state => state.fulfillment;

export const fulfillmentSelector = createSelector(
  rootFulfillmentSelector,
  rootFulfillment => rootFulfillment
);
