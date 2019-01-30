import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import { createSelector } from 'reselect';
import { isEmpty, reduce } from 'lodash';

export const profileUISelector = state => state.profileUI;

const profileSections = [
  ['small_profile_image_url'],
  ['name', 'organization', 'languages'],
  ['skills'],
  ['website', 'twitter', 'github', 'linkedin'],
  ['email']
];

export const profileStrengthSelector = createSelector(
  getCurrentUserSelector,
  currentUser => {
    return Math.round(
      (reduce(
        (sectionsFilled, sectionFields) => {
          return (
            sectionsFilled +
            (reduce(
              (fieldsFilled, field) =>
                !isEmpty(currentUser[field]) || fieldsFilled,
              false,
              sectionFields
            )
              ? 1
              : 0)
          );
        },
        0,
        profileSections
      ) /
        profileSections.length) *
        100
    );
  }
);
