import { createSelector } from 'reselect';

export const rootTokensSelector = state => state.tokens;

export const tokensSelector = createSelector(
  rootTokensSelector,
  rootTokens => rootTokens.tokens
);
