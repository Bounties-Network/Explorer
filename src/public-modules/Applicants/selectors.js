import { createSelector } from 'reselect';

export const rootApplicantsSelector = state => state.applicants;

export const applicantsSelector = createSelector(
  rootApplicantsSelector,
  rootApplicants => rootApplicants
);
