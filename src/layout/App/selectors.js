import { createSelector } from 'reselect';

export const rootAppSelector = state => state.app;

export const locationNonceSelector = createSelector(
  rootAppSelector,
  rootApp => rootApp.locationNonce
);
