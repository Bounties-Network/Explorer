import { PAGE_SIZE, SORT_VALUE } from './constants';

const initialState = {
  loading: true,
  loaded: false,
  error: false,
  offset: 0,
  user: {},
  nonce: ''
};

const LOAD_NONCE = 'authentication/LOAD_NONCE';
const LOAD_NONCE_SUCCESS = 'authentication/LOAD_NONCE_SUCCESS';
const LOAD_NONCE_FAIL = 'authentication/LOAD_NONCE_FAIL';
const LOGIN = 'authentication/LOGIN';
const LOGIN_SUCCESS = 'authentication/LOGIN_SUCCESS';
const LOGIN_FAIL = 'authentication/LOGIN_FAIL';

// load nonce
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

// login
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
    case LOAD_NONCE: {
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false
      };
    }
    case LOAD_NONCE_SUCCESS: {
      const { nonce } = action;
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        nonce: nonce.nonce
      };
    }
    case LOAD_NONCE_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: true
      };
    }
    case LOGIN: {
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false
      };
    }
    case LOGIN_SUCCESS: {
      const { user } = action;
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        user
      };
    }
    case LOGIN_FAIL: {
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
  loadNonce,
  loadNonceSuccess,
  loadNonceFail,
  login,
  loginSuccess,
  loginFail
};

export const actionTypes = {
  LOAD_NONCE,
  LOAD_NONCE_SUCCESS,
  LOAD_NONCE_FAIL,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL
};

export default AuthenticationReducer;
