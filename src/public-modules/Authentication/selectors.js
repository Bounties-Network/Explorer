import { createSelector } from 'reselect';

export const rootAuthSelector = state => state.authentication;

export const publicAddressSelector = state => {
  if (state.status) {
    return state.status.public_address;
  } else {
    return '';
  }
};

export const authStateSelector = createSelector(rootAuthSelector, rootAuth => ({
  user: rootAuth.user,
  nonce: rootAuth.nonce,
  loading: rootAuth.loading,
  loaded: rootAuth.loaded,
  error: rootAuth.error,
  loginStatus: rootAuth.loginStatus
}));
