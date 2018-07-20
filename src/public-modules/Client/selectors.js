import { createSelector } from 'reselect';

export const rootClientSelector = state => state.client;

export const networkSelector = createSelector(
  rootClientSelector,
  client => client.network
);

export const addressSelector = createSelector(
  rootClientSelector,
  client => client.address
);

export const walletLockedSelector = createSelector(
  rootClientSelector,
  client => client.locked
);

export const hasWalletSelector = createSelector(
  rootClientSelector,
  client => client.hasWallet
);

export const initializedSelector = createSelector(
  rootClientSelector,
  client => client.initialized
);
