import {
  INIT_TRANSLATIONS,
  UPDATE_LOCALE,
  TRANSLATION_LOADED
} from './constants';

function initTranslations(locale = null) {
  return {
    type: INIT_TRANSLATIONS,
    locale
  };
}

function changeLocale(locale) {
  return {
    type: UPDATE_LOCALE,
    locale
  };
}

function translationLoaded(locale) {
  return {
    type: TRANSLATION_LOADED,
    locale
  };
}

export const actions = {
  initTranslations,
  changeLocale,
  translationLoaded
};

const initialState = {
  loading: true,
  loaded: false,
  currentLocale: undefined
};

function I18nReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_TRANSLATIONS: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case UPDATE_LOCALE: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case TRANSLATION_LOADED: {
      return {
        ...state,
        loading: false,
        loaded: true,
        currentLocale: action.locale
      };
    }
    default:
      return state;
  }
}

export default I18nReducer;
