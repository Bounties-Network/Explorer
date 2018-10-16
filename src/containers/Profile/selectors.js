import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import { createSelector } from 'reselect';
import { isEmpty } from 'lodash';

export const profileUISelector = state => state.profileUI;

const profileSections = [
  // would there be a difference here between small and large for determining whether they've uploaded a profile pic?
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
      (profileSections.reduce((sectionsFilled, sectionFields) => {
        return (
          sectionsFilled +
          (sectionFields.reduce(
            (fieldsFilled, field) =>
              !isEmpty(currentUser[field]) || fieldsFilled,
            false
          )
            ? 1
            : 0)
        );
      }, 0) /
        profileSections.length) *
        100
    );
  }
);
