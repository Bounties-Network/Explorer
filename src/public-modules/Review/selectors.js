import { createSelector } from 'reselect';

export const rootReviewSelector = state => state.review;

export const reviewSelector = createSelector(
  rootReviewSelector,
  rootReview => rootReview
);
