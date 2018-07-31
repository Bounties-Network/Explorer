import { createSelector } from 'reselect';
import { map } from 'lodash';

export const rootSkillsSelector = state => state.skills;

export const skillsSelector = createSelector(
  rootSkillsSelector,
  skillsSelector => skillsSelector.skills
);

export const skillsListSelector = createSelector(skillsSelector, skills =>
  map(skill => skill.normalized_name, skills)
);
