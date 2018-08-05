import { createSelector } from 'reselect';
import { LIMIT } from './constants';
import config from 'public-modules/config';

export const rootFulfillmentsSelector = state => state.fulfillments;

export const fulfillmentsSelector = key =>
  createSelector(
    rootFulfillmentsSelector,
    rootFulfillments => rootFulfillments[key]
  );
