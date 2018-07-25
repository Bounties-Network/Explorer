import { createSelector } from 'reselect';

export const rootUserInfoSelector = state => state.userInfo;

export const userInfoSelector = createSelector(
  rootUserInfoSelector,
  rootUserInfo => rootUserInfo
);

export const loadedUserInfoSelector = createSelector(
  userInfoSelector,
  userInfo => userInfo.loadedUser
);

export const loadedUserSelector = createSelector(
  loadedUserInfoSelector,
  userInfo => userInfo.user
);

export const loadedUserStatsSelector = createSelector(
  loadedUserInfoSelector,
  userInfo => {
    const {
      issuer_ratings_given,
      issuer_ratings_received,
      fulfiller_ratings_given,
      fulfiller_ratings_received,
      issuer_fulfillment_acceptance,
      fulfiller_fulfillment_acceptance,
      total_bounties,
      total_fulfillments
    } = userInfo.stats;

    return {
      issuer: {
        acceptance: issuer_fulfillment_acceptance,
        rating: issuer_ratings_received,
        ratingGiven: issuer_ratings_given
      },
      fulfiller: {
        acceptance: fulfiller_fulfillment_acceptance,
        rating: fulfiller_ratings_received,
        ratingGiven: fulfiller_ratings_given
      }
    };
  }
);
