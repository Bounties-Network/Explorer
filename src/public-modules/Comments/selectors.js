import { createSelector } from 'reselect';

export const rootCommentsSelector = state => state.comments;
export const rootFulCommentsSelector = state => state.fulComments;

export const commentsSelector = createSelector(
  rootCommentsSelector,
  rootComments => rootComments
);
export const fulCommentsSelector = createSelector(
  rootFulCommentsSelector,
  rootFulComments => rootFulComments
);
