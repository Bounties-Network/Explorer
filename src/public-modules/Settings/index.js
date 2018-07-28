const initialState = {
  saving: false,
  error: false
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

function SettingsReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_SETTINGS: {
      return {
        ...state,
        saving: true,
        error: false
      };
    }
    case SAVE_SETTINGS_SUCCESS: {
      return {
        ...state,
        saving: false
      };
    }
    case SAVE_SETTINGS_FAIL: {
      return {
        ...state,
        saving: false,
        error: true
      };
    }
    default:
      return state;
  }
}

export const actions = {
  saveSettings,
  saveSettingsSuccess,
  saveSettingsFail
};

export const actionTypes = {
  SAVE_SETTINGS,
  SAVE_SETTINGS_SUCCESS,
  SAVE_SETTINGS_FAIL
};

export default SettingsReducer;
