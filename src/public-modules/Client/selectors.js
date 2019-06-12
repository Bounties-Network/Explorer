import { createSelector } from 'reselect';

export const rootClientSelector = state => state.client;

export const networkSelector = createSelector(
  rootClientSelector,
  client => client.network
);

export const addressSelector = createSelector(rootClientSelector, client =>
  client.address.toLowerCase()
);

export const walletLockedSelector = createSelector(
  rootClientSelector,
  client => client.locked
);

export const hasWalletSelector = createSelector(
  rootClientSelector,
  client => client.hasWallet
);

export const hasPortisSelector = createSelector(
  rootClientSelector,
  client => client.hasPortis
);

export const signingInToPortisSelector = createSelector(
  rootClientSelector,
  client => client.signingInToPortis
);

export const initializedSelector = createSelector(
  rootClientSelector,
  client => client.initialized
);

export const balanceInfoSelector = createSelector(
  rootClientSelector,
  client => client.balanceInfo
);
