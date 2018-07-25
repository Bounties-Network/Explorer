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

    const calcAcceptance = (accepted, total) => {
      const result = accepted / total;
      return isNaN(result) ? null : result;
    };

    const issuer_acceptance_rate = calcAcceptance(
      issuer_fulfillment_acceptance,
      total_bounties
    );
    const fulfiller_acceptance_rate = calcAcceptance(
      fulfiller_fulfillment_acceptance,
      total_fulfillments
    );

    return {
      issuer: {
        acceptance: issuer_acceptance_rate,
        rating: issuer_ratings_received,
        ratingGiven: issuer_ratings_given
      },
      fulfiller: {
        acceptance: fulfiller_acceptance_rate,
        rating: fulfiller_ratings_received,
        ratingGiven: fulfiller_ratings_given
      }
    };
  }
);
