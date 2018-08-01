import { createSelector } from 'reselect';

export const rootSettingsSelector = state => state.settings;

export const settingsSelector = createSelector(
  rootSettingsSelector,
  rootSettings => rootSettings.settings
);

export const emailPreferencesSelector = createSelector(
  rootSettingsSelector,
  rootSettings => rootSettings.emailPreferences
);
