let initialState = {
  smallProfileImageUrl: null,
  largeProfileImageUrl: null
};

const SET_PROFILE_IMAGE_URLS = 'settingsUI/SET_PROFILE_IMAGE_URLS';
const RESET_PROFILE_IMAGE_URLS = 'settingsUI/RESET_PROFILE_IMAGE_URLS';

function setProfileImageUrls(small, large) {
  return { type: SET_PROFILE_IMAGE_URLS, small, large };
}

function resetProfileImageUrls() {
  return { type: RESET_PROFILE_IMAGE_URLS };
}

function settingsUIReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PROFILE_IMAGE_URLS: {
      const { small, large } = action;

      return {
        ...state,
        smallProfileImageUrl: small,
        largeProfileImageUrl: large
      };
    }
    case RESET_PROFILE_IMAGE_URLS: {
      return {
        ...state,
        smallProfileImageUrl: null,
        largeProfileImageUrl: null
      };
    }
    default: {
      return state;
    }
  }
}

export const actions = {
  setProfileImageUrls,
  resetProfileImageUrls
};

export const actionTypes = {
  SET_PROFILE_IMAGE_URLS,
  RESET_PROFILE_IMAGE_URLS
};

export default settingsUIReducer;
