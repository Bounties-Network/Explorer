import { createSelector } from 'reselect';
import { map } from 'lodash';

export const rootDraftsSelector = state => state.drafts;

export const draftsSelector = createSelector(
  rootDraftsSelector,
  rootDrafts => rootDrafts.drafts
);
