import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import { createSelector } from 'reselect';
import { isEmpty } from 'lodash';

export const profileUISelector = state => state.profileUI;

const profileSections = [
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
        return sectionsFilled +
          sectionFields.reduce(
            (fieldsFilled, field) => !isEmpty(field) || fieldsFilled,
            false
          )
          ? 1
          : 0;
      }, 0) /
        profileSections.length) *
        100
    );
  }
);
