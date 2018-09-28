const initialState = {
  settings: {
    saving: false,
    error: false
  },
  emailPreferences: {
    saving: false,
    error: false
  },
  uploadState: {
    uploading: false,
    error: false,
    smallUrl: null,
    largeUrl: null
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

const UPLOAD_PROFILE_IMAGE = 'settings/UPLOAD_PROFILE_IMAGE';
const UPLOAD_PROFILE_IMAGE_SUCCESS = 'settings/UPLOAD_PROFILE_IMAGE_SUCCESS';
const UPLOAD_PROFILE_IMAGE_FAIL = 'settings/UPLOAD_PROFILE_IMAGE_FAIL';

function uploadProfileImage(smallImage, largeImage) {
  return { type: UPLOAD_PROFILE_IMAGE, smallImage, largeImage };
}

function uploadProfileImageSuccess(smallUrl, largeUrl) {
  return { type: UPLOAD_PROFILE_IMAGE_SUCCESS, smallUrl, largeUrl };
}

function uploadProfileImageFail() {
  return { type: UPLOAD_PROFILE_IMAGE_FAIL };
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
        settings: {
          saving: false,
          error: true
        }
      };
    }
    case UPLOAD_PROFILE_IMAGE: {
      return {
        ...state,
        uploadState: {
          uploading: true,
          error: false
        }
      };
    }
    case UPLOAD_PROFILE_IMAGE_SUCCESS: {
      const { smallUrl, largeUrl } = action;

      return {
        ...state,
        uploadState: {
          ...state.uploadState,
          uploading: false,
          smallUrl,
          largeUrl
        }
      };
    }
    case UPLOAD_PROFILE_IMAGE_FAIL: {
      return {
        ...state,
        uploadState: {
          uploading: false,
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
  saveEmailPreferencesFail,
  uploadProfileImage,
  uploadProfileImageSuccess,
  uploadProfileImageFail
};

export const actionTypes = {
  SAVE_SETTINGS,
  SAVE_SETTINGS_SUCCESS,
  SAVE_SETTINGS_FAIL,
  SAVE_EMAIL_PREFERENCES,
  SAVE_EMAIL_PREFERENCES_SUCCESS,
  SAVE_EMAIL_PREFERENCES_FAIL,
  UPLOAD_PROFILE_IMAGE,
  UPLOAD_PROFILE_IMAGE_SUCCESS,
  UPLOAD_PROFILE_IMAGE_FAIL
};

export default SettingsReducer;
