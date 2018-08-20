import { createSelector } from 'reselect';

export const rootCommentsSelector = state => state.comments;

export const commentsSelector = createSelector(
  rootCommentsSelector,
  rootComments => rootComments
);
