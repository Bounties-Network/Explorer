import { createSelector } from 'reselect';

export const rootUploadSelector = state => state.fileUpload;

export const getUploadKeySelector = key => {
  return createSelector(rootUploadSelector, upload => upload[key]);
};
