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
      const { fulfiller, issuer, bounty_id } = fulfillmentsState.filters;
      query['fulfiller'] = fulfiller;
      query['bounty__user__public_address'] = issuer;
      query['bounty'] = bounty_id;
    }

    return query;
  }
);
