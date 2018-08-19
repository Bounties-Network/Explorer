const initialState = {
  settings: {
    saving: false,
    error: false
  },
  emailPreferences: {
    saving: false,
    error: false
  }
};

const SAVE_SETTINGS = 'settings/SAVE_SETTINGS';
const SAVE_SETTINGS_SUCCESS = 'settings/SAVE_SETTINGS_SUCCESS';
const SAVE_SETTINGS_FAIL = 'settings/SAVE_SETTINGS_FAIL';

function saveSettings(values) {
  return { type: SAVE_SETTINGS, values };
}

function saveSettingsSuccess() {
  return { type: SAVE_SETTINGS_SUCCESS };
}

function saveSettingsFail(error) {
  return { type: SAVE_SETTINGS_FAIL, error };
}

const SAVE_EMAIL_PREFERENCES = 'settings/SAVE_EMAIL_PREFERENCES';
const SAVE_EMAIL_PREFERENCES_SUCCESS =
  'settings/SAVE_EMAIL_PREFERENCES_SUCCESS';
const SAVE_EMAIL_PREFERENCES_FAIL = 'settings/SAVE_EMAIL_PREFERENCES_FAIL';

function saveEmailPreferences(values) {
  return { type: SAVE_EMAIL_PREFERENCES, values };
}

function saveEmailPreferencesSuccess() {
  return { type: SAVE_EMAIL_PREFERENCES_SUCCESS };
}

function saveEmailPreferencesFail(error) {
  return { type: SAVE_EMAIL_PREFERENCES_FAIL, error };
}

function SettingsReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_SETTINGS: {
      return {
        ...state,
        settings: {
          saving: true,
          error: false
        }
      };
    }
    case SAVE_SETTINGS_SUCCESS: {
      return {
        ...state,
        settings: {
          saving: false,
          error: false
        }
      };
    }
    case SAVE_SETTINGS_FAIL: {
      return {
        ...state,
        emailPreferences: {
          saving: false,
          error: true
        }
      };
    }
    case SAVE_EMAIL_PREFERENCES: {
      return {
        ...state,
        emailPreferences: {
          saving: true,
          error: false
        }
      };
    }
    case SAVE_EMAIL_PREFERENCES_SUCCESS: {
      return {
        ...state,
        emailPreferences: {
          saving: false,
          error: false
        }
      };
    }
    case SAVE_EMAIL_PREFERENCES_FAIL: {
      return {
        ...state,
        emailPreferences: {
          saving: false,
          error: true
        }
      };
    }
    default:
      return state;
  }
}

export const actions = {
  saveSettings,
  saveSettingsSuccess,
  saveSettingsFail,
  saveEmailPreferences,
  saveEmailPreferencesSuccess,
  saveEmailPreferencesFail
};

export const actionTypes = {
  SAVE_SETTINGS,
  SAVE_SETTINGS_SUCCESS,
  SAVE_SETTINGS_FAIL,
  SAVE_EMAIL_PREFERENCES,
  SAVE_EMAIL_PREFERENCES_SUCCESS,
  SAVE_EMAIL_PREFERENCES_FAIL
};

export default SettingsReducer;
