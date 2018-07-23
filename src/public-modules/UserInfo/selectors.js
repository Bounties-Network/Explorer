import { createSelector } from 'reselect';

export const rootUserSelector = state => state.userInfo;

export const userSelector = createSelector(
  rootUserSelector,
  rootUser => rootUser
);
