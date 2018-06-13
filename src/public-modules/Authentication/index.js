import { PAGE_SIZE, SORT_VALUE } from './constants';

const initialState = {
  loading: true,
  loaded: false,
  error: false,
  offset: 0,
  user: {},
  nonce: '',
  loginStatus: false
};

const LOAD_NONCE = 'authentication/LOAD_NONCE';
const LOAD_NONCE_SUCCESS = 'authentication/LOAD_NONCE_SUCCESS';
const LOAD_NONCE_FAIL = 'authentication/LOAD_NONCE_FAIL';
const LOGIN = 'authentication/LOGIN';
const LOGIN_SUCCESS = 'authentication/LOGIN_SUCCESS';
const LOGIN_FAIL = 'authentication/LOGIN_FAIL';
const CHECK_LOGINSTATUS = 'authentication/CHECK_LOGINSTATUS';
const CHECK_LOGINSTATUS_SUCCESS = 'authentication/CHECK_LOGINSTATUS_SUCCESS';
const CHECK_LOGINSTATUS_FAIL = 'authentication/CHECK_LOGINSTATUS_FAIL';
const SET_LOGINSTATUS = 'authentication/SET_LOGINSTATUS';

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

// check login status

function setLoginStatus(loginStatus, user) {
  return { type: SET_LOGINSTATUS, loginStatus: true, user: {} };
}

function checkLoginStatus() {
  return { type: CHECK_LOGINSTATUS };
}

function checkLoginStatusSuccess(status) {
  return {
    type: CHECK_LOGINSTATUS_SUCCESS,
    status
  };
}

function checkLoginStatusFail(error) {
  return { type: CHECK_LOGINSTATUS_FAIL, error };
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
        user,
        loginStatus: true
      };
    }
    case LOGIN_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: true,
        loginStatus: false
      };
    }
    case CHECK_LOGINSTATUS: {
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false
      };
    }
    case CHECK_LOGINSTATUS_SUCCESS: {
      const { status } = action;
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        loginStatus: true,
        status
      };
    }
    case CHECK_LOGINSTATUS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: true,
        loginStatus: false
      };
    }
    case SET_LOGINSTATUS: {
      const { loginStatus, user } = action;
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false,
        loginStatus,
        user
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
  loginFail,
  checkLoginStatus,
  checkLoginStatusSuccess,
  checkLoginStatusFail,
  setLoginStatus
};

export const actionTypes = {
  LOAD_NONCE,
  LOAD_NONCE_SUCCESS,
  LOAD_NONCE_FAIL,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CHECK_LOGINSTATUS,
  CHECK_LOGINSTATUS_SUCCESS,
  CHECK_LOGINSTATUS_FAIL,
  SET_LOGINSTATUS
};

export default AuthenticationReducer;
