import { createSelector } from 'reselect';

export const rootAppSelector = state => state.app;
export const routerSelector = state => state.router;

export const locationNonceSelector = createSelector(
  rootAppSelector,
  rootApp => rootApp.locationNonce
);

export const lastLocationSelector = createSelector(
  rootAppSelector,
  rootApp => rootApp.lastLocation
);
