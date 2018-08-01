import { createSelector } from 'reselect';

export const rootTransactionSelector = state => state.transaction;

export const transactionsSelector = createSelector(
  rootTransactionSelector,
  rootTransactions => rootTransactions.transactions
);

export const walkthroughVisibleSelector = createSelector(
  rootTransactionSelector,
  rootTransactions => rootTransactions.walkthroughVisible
);

export const pendingReceiptHashSelector = createSelector(
  rootTransactionSelector,
  rootTransactions => rootTransactions.pendingReceiptHash
);

export const getTransactionSelector = txHash => {
  return createSelector(
    transactionsSelector,
    transactions => transactions[txHash]
  );
};

export const transactionsInitiatedSelector = createSelector(
  rootTransactionSelector,
  rootTransactions => rootTransactions.transactionsInitiated
);
