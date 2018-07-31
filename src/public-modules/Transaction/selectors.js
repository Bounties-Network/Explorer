import { createSelector } from 'reselect';

export const rootTransactionSelector = state => state.transaction;

export const transactionsSelector = createSelector(
  rootTransactionSelector,
  rootTransactions => rootTransactions.transactions
);
