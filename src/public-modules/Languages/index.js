const initialState = {
  loading: true,
  loaded: false,
  error: false,
  count: 0,
  languages: []
};

const LOAD_LANGUAGES = 'languages/LOAD_LANGUAGES';
const LOAD_LANGUAGES_SUCCESS = 'languages/LOAD_LANGUAGES_SUCCESS';
const LOAD_LANGUAGES_FAIL = 'languages/LOAD_LANGUAGES_FAIL';

function loadLanguages() {
  return { type: LOAD_LANGUAGES };
}

function loadLanguagesSuccess(languages) {
  return {
    type: LOAD_LANGUAGES_SUCCESS,
    languages: languages.results,
    count: languages.count
  };
}

function loadLanguagesFail(error) {
  return { type: LOAD_LANGUAGES_FAIL, error };
}

function LanguagesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_LANGUAGES: {
      return {
        ...state,
        loading: true,
        loaded: false,
        count: 0,
        error: false
      };
    }
    case LOAD_LANGUAGES_SUCCESS: {
      const { languages, count } = action;
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        languages,
        count
      };
    }
    case LOAD_LANGUAGES_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: true
      };
    }
    default:
      return state;
  }
}

export const actions = {
  loadLanguages,
  loadLanguagesSuccess,
  loadLanguagesFail
};

export const actionTypes = {
  LOAD_LANGUAGES,
  LOAD_LANGUAGES_SUCCESS,
  LOAD_LANGUAGES_FAIL
};

export default LanguagesReducer;
