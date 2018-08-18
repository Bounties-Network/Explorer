const defaultLoginState = {
  loading: false,
  error: false
};

const defaultLogoutState = {
  loading: false,
  error: false
};

const defaultGetCurrentUserState = {
  loading: false,
  error: false,
  loaded: false
};

const initialState = {
  user: null,
  nonce: '',
  signedUp: false,
  getCurrentUserState: defaultGetCurrentUserState,
  loginState: defaultLoginState,
  logoutState: defaultLogoutState
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

const LOGIN = 'authentication/LOGIN';
const LOGIN_SUCCESS = 'authentication/LOGIN_SUCCESS';
const LOGIN_FAIL = 'authentication/LOGIN_FAIL';
const RESET_LOGIN_STATE = 'authentication/RESET_LOGIN_STATE';

function login() {
  return { type: LOGIN };
}

function loginSuccess(user, signedUp) {
  return {
    type: LOGIN_SUCCESS,
    user,
    signedUp
  };
}

function loginFail(error) {
  return { type: LOGIN_FAIL, error };
}

function resetLoginState() {
  return { type: RESET_LOGIN_STATE };
}

const LOGOUT = 'authentication/LOGOUT';
const LOGOUT_SUCCESS = 'authentication/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'authentication/LOGIN_FAIL';
const RESET_LOGOUT_STATE = 'authentication/RESET_LOGOUT_STATE';

function logout() {
  return { type: LOGOUT };
}

function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS
  };
}

function logoutFail(error) {
  return { type: LOGOUT_FAIL, error };
}

function resetLogoutState() {
  return { type: RESET_LOGOUT_STATE };
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
      const { user, signedUp } = action;
      return {
        ...state,
        user,
        signedUp,
        loginState: {
          ...state.loginState,
          loading: false
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
    case RESET_LOGIN_STATE: {
      return {
        ...state,
        loginState: { ...defaultLoginState }
      };
    }
    case RESET_LOGOUT_STATE: {
      return {
        ...state,
        loginState: { ...defaultLogoutState }
      };
    }
    case LOGOUT: {
      return {
        ...state,
        logoutState: {
          ...state.logoutState,
          loading: true,
          error: false
        }
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        user: null,
        logoutState: {
          ...state.logoutState,
          loading: false
        }
      };
    }
    case LOGOUT_FAIL: {
      return {
        ...state,
        logoutState: {
          ...state.logoutState,
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
  resetLoginState,
  login,
  loginSuccess,
  loginFail,
  logout,
  logoutSuccess,
  logoutFail,
  resetLogoutState
};

export const actionTypes = {
  GET_CURRENT_USER,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAIL,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  RESET_LOGIN_STATE,
  RESET_LOGOUT_STATE
};

export default AuthenticationReducer;
