import { createSelector } from 'reselect';
import { map } from 'lodash';

export const rootLanguagesSelector = state => state.languages;

export const languagesSelector = createSelector(
  rootLanguagesSelector,
  languagesSelector => languagesSelector.languages
);

export const languagesListSelector = createSelector(
  languagesSelector,
  languages => map(language => language.normalized_name, languages)
);
