import { createSelector } from 'reselect';
import { map } from 'lodash';

export const rootCommentsSelector = state => state.comments;

export const commentsSelector = createSelector(
  rootCommentsSelector,
  rootComments => rootComments
);
