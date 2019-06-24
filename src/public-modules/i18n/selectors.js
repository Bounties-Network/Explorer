import { createSelector } from 'reselect';

export const translationSelector = state => state.i18n;

export const currentLocaleSelector = createSelector(
  translationSelector,
  translation => translation.currentLocale
);
