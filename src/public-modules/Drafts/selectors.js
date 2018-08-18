import { createSelector } from 'reselect';

export const rootDraftsSelector = state => state.drafts;

export const draftsSelector = createSelector(
  rootDraftsSelector,
  rootDrafts => rootDrafts.drafts
);

export const draftsCountSelector = createSelector(
  rootDraftsSelector,
  rootDrafts => rootDrafts.count
);
