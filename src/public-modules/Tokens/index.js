const initialState = {
  loading: true,
  loaded: false,
  error: false,
  tokens: []
};

const LOAD_TOKENSINFO = 'tokens/LOAD_TOKENSINFO';
const LOAD_TOKENSINFO_SUCCESS = 'tokens/LOAD_TOKENSINFO_SUCCESS';
const LOAD_TOKENSINFO_FAIL = 'tokens/LOAD_TOKENSINFO_FAIL';

function loadTokensInfo() {
  return { type: LOAD_TOKENSINFO };
}

function loadTokensInfoSuccess(tokens) {
  return {
    type: LOAD_TOKENSINFO_SUCCESS,
    tokens
  };
}

function loadTokensInfoFail(error) {
  return { type: LOAD_TOKENSINFO_FAIL, error };
}

function TokensInfoReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TOKENSINFO: {
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false
      };
    }
    case LOAD_TOKENSINFO_SUCCESS: {
      const { tokens } = action;

      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        tokens
      };
    }
    case LOAD_TOKENSINFO_FAIL: {
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
  loadTokensInfo,
  loadTokensInfoSuccess,
  loadTokensInfoFail
};

export const actionTypes = {
  LOAD_TOKENSINFO,
  LOAD_TOKENSINFO_SUCCESS,
  LOAD_TOKENSINFO_FAIL
};

export default TokensInfoReducer;
