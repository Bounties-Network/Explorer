const initialState = {
  loading: true,
  loaded: false,
  error: false,
  tokens: []
};

const LOAD_TOKENS = 'tokens/LOAD_TOKENS';
const LOAD_TOKENS_SUCCESS = 'tokens/LOAD_TOKENS_SUCCESS';
const LOAD_TOKENS_FAIL = 'tokens/LOAD_TOKENS_FAIL';

function loadTokens() {
  return { type: LOAD_TOKENS };
}

function loadTokensSuccess(tokens) {
  return {
    type: LOAD_TOKENS_SUCCESS,
    tokens
  };
}

function loadTokensFail(error) {
  return { type: LOAD_TOKENS_FAIL, error };
}

function TokensReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TOKENS: {
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false
      };
    }
    case LOAD_TOKENS_SUCCESS: {
      const { tokens } = action;

      return {
        ...state,
        loading: false,
        loaded: true,
        tokens
      };
    }
    case LOAD_TOKENS_FAIL: {
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
  loadTokens,
  loadTokensSuccess,
  loadTokensFail
};

export const actionTypes = {
  LOAD_TOKENS,
  LOAD_TOKENS_SUCCESS,
  LOAD_TOKENS_FAIL
};

export default TokensReducer;
