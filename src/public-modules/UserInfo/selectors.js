import { createSelector } from 'reselect';

export const rootCurrentUserSelector = state => state.userInfo;

export const currentUserSelector = createSelector(
  rootCurrentUserSelector,
  rootCurrentUser => rootCurrentUser
);
