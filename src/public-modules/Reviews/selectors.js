import { createSelector } from 'reselect';

export const rootReviewsSelector = state => state.reviews;

export const reviewsStateSelector = createSelector(
  rootReviewsSelector,
  rootReviews => rootReviews
);

export const reviewsSelector = createSelector(
  reviewsStateSelector,
  reviewsState => reviewsState.reviews
);
