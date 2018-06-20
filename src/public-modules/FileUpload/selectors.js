import { createSelector } from 'reselect';

export const rootFileUploadSelector = state => state.fileUpload;

export const filesSelector = createSelector(
  rootFileUploadSelector,
  rootFiles => rootFiles.files
);
