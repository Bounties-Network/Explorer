import { createSelector } from 'reselect';

export const rootAuthSelector = state => state.authentication;

export const loadNonceStateSelector = createSelector(
  rootAuthSelector,
  rootAuth => rootAuth.loadNonceState
);

export const loginStateSelector = createSelector(
  rootAuthSelector,
  rootAuth => rootAuth.loginState
);

export const getCurrentUserStateSelector = createSelector(
  rootAuthSelector,
  rootAuth => rootAuth.getCurrentUserState
);

export const getCurrentUser = createSelector(
  rootAuthSelector,
  rootAuth => rootAuth.user
);
