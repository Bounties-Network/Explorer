const initialState = {
  user: null,
  nonce: '',
  getCurrentUserState: {
    loading: true,
    loaded: false,
    error: false
  },
  loadNonceState: {
    loading: false,
    loaded: false,
    error: false
  },
  loginState: {
    loading: false,
    loaded: false,
    error: false
  }
};

const GET_CURRENT_USER = 'authentication/GET_CURRENT_USER';
const GET_CURRENT_USER_SUCCESS = 'authentication/GET_CURRENT_USER_SUCCESS';
const GET_CURRENT_USER_FAIL = 'authentication/GET_CURRENT_USER_FAIL';

function getCurrentUser() {
  return { type: GET_CURRENT_USER };
}

function getCurrentUserSuccess(user) {
  return { type: GET_CURRENT_USER_SUCCESS, user };
}

function getCurrentUserFail(error) {
  return { type: GET_CURRENT_USER_FAIL, error };
}

const LOAD_NONCE = 'authentication/LOAD_NONCE';
const LOAD_NONCE_SUCCESS = 'authentication/LOAD_NONCE_SUCCESS';
const LOAD_NONCE_FAIL = 'authentication/LOAD_NONCE_FAIL';

function loadNonce(address) {
  return { type: LOAD_NONCE, address };
}

function loadNonceSuccess(nonce) {
  return {
    type: LOAD_NONCE_SUCCESS,
    nonce
  };
}

function loadNonceFail(error) {
  return { type: LOAD_NONCE_FAIL, error };
}

const LOGIN = 'authentication/LOGIN';
const LOGIN_SUCCESS = 'authentication/LOGIN_SUCCESS';
const LOGIN_FAIL = 'authentication/LOGIN_FAIL';

function login(address, signature) {
  return { type: LOGIN, address, signature };
}

function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user
  };
}

function loginFail(error) {
  return { type: LOGIN_FAIL, error };
}

function AuthenticationReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_USER: {
      return {
        ...state,
        getCurrentUserState: {
          ...state.getCurrentUserState,
          loading: true,
          error: false
        }
      };
    }
    case GET_CURRENT_USER_SUCCESS: {
      const { user } = action;

      return {
        ...state,
        user,
        getCurrentUserState: {
          ...state.getCurrentUserState,
          loading: false,
          loaded: true,
          error: false
        }
      };
    }
    case GET_CURRENT_USER_FAIL: {
      return {
        ...state,
        getCurrentUserState: {
          ...state.getCurrentUserState,
          loading: false,
          error: true
        }
      };
    }
    case LOAD_NONCE: {
      return {
        ...state,
        nonce: '',
        loadNonceState: {
          ...state.loadNonceState,
          loading: true,
          error: false
        }
      };
    }
    case LOAD_NONCE_SUCCESS: {
      const { nonce } = action;
      return {
        ...state,
        nonce,
        loadNonceState: {
          ...state.loadNonceState,
          loading: false,
          loaded: true
        }
      };
    }
    case LOAD_NONCE_FAIL: {
      return {
        ...state,
        loadNonceState: {
          ...state.loadNonceState,
          loading: false,
          error: true
        }
      };
    }
    case LOGIN: {
      return {
        ...state,
        loginState: {
          ...state.loginState,
          loading: true,
          error: false
        }
      };
    }
    case LOGIN_SUCCESS: {
      const { user } = action;
      return {
        ...state,
        user,
        loginState: {
          ...state.loginState,
          loading: false,
          loaded: true
        }
      };
    }
    case LOGIN_FAIL: {
      return {
        ...state,
        loginState: {
          ...state.loginState,
          loading: false,
          error: true
        }
      };
    }
    default:
      return state;
  }
}

export const actions = {
  getCurrentUser,
  getCurrentUserSuccess,
  getCurrentUserFail,
  loadNonce,
  loadNonceSuccess,
  loadNonceFail,
  login,
  loginSuccess,
  loginFail
};

export const actionTypes = {
  GET_CURRENT_USER,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAIL,
  LOAD_NONCE,
  LOAD_NONCE_SUCCESS,
  LOAD_NONCE_FAIL,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL
};

export default AuthenticationReducer;
