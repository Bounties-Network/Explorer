import { createSelector } from 'reselect';

export const rootSubmissionsPanelSelector = state => state.submissionsPanel;

export const submissionsPanelSelector = createSelector(
  rootSubmissionsPanelSelector,
  submissionsPanel => submissionsPanel
);
