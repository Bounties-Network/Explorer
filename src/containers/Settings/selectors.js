import { createSelector } from 'reselect';

export const rootSettingsUISelector = state => state.settingsUI;

export const settingsUISelector = createSelector(
  rootSettingsUISelector,
  rootSettingsUI => rootSettingsUI
);
