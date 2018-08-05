import { createSelector } from 'reselect';
import { LIMIT } from './constants';
import config from 'public-modules/config';

export const rootFulfillmentsSelector = state => state.fulfillments;

export const fulfillmentsSelector = createSelector(
  rootFulfillmentsSelector,
  rootFulfillments => rootFulfillments
);

export const fulfillmentsQuerySelector = createSelector(
  fulfillmentsSelector,
  fulfillmentsState => {
    const query = {
      limit: LIMIT,
      platform__in: config.platform
    };

    if (fulfillmentsState.filters) {
      const { fulfiller, issuer } = fulfillmentsState.filters;
      query['fulfiller'] = fulfiller;
      query['bounty__issuer_address'] = issuer;
    }

    return query;
  }
);
