import { createSelector } from 'reselect';

export const rootCategoriesSelector = state => state.categories;

export const categoriesSelector = createSelector(
  rootCategoriesSelector,
  rootCategories => rootCategories.categories
);
