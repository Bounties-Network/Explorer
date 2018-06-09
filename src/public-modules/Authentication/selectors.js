import { createSelector } from 'reselect';

export const rootAuthSelector = state => state.authentication;

export const authStateSelector = createSelector(rootAuthSelector, rootAuth => ({
  nonce: rootAuth.nonce,
  loading: rootAuth.loading,
  loaded: rootAuth.loaded,
  error: rootAuth.error
}));
