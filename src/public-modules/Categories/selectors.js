import { createSelector } from 'reselect';
import { map } from 'lodash';

export const rootCategoriesSelector = state => state.categories;

export const categoriesSelector = createSelector(
  rootCategoriesSelector,
  rootCategories => rootCategories.categories
);

export const categoriesListSelector = createSelector(
  categoriesSelector,
  categories => map(category => category.normalized_name, categories)
);
