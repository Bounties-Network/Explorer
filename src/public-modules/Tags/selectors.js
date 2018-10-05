import { createSelector } from 'reselect';
import { map } from 'lodash';

export const rootTagsSelector = state => state.tags;

export const tagsSelector = createSelector(
  rootTagsSelector,
  rootTags => rootTags.tags
);

export const tagsListSelector = createSelector(tagsSelector, tags =>
  map(tag => tag.normalized_name, tags)
);
