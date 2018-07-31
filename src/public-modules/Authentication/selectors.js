import { createSelector } from 'reselect';

export const rootAuthSelector = state => state.authentication;

export const loginStateSelector = createSelector(
  rootAuthSelector,
  rootAuth => rootAuth.loginState
);

export const logoutStateSelector = createSelector(
  rootAuthSelector,
  rootAuth => rootAuth.logoutState
);

export const getCurrentUserStateSelector = createSelector(
  rootAuthSelector,
  rootAuth => rootAuth.getCurrentUserState
);

export const getCurrentUserSelector = createSelector(
  rootAuthSelector,
  rootAuth => rootAuth.user
);

export const hasUserSignedUp = createSelector(
  rootAuthSelector,
  rootAuth => rootAuth.signedUp
);
