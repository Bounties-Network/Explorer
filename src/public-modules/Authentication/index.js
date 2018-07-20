const initialState = {
  user: null,
  nonce: '',
  getCurrentUserState: {
    loading: true,
    loaded: false,
    error: false
  },
  loginState: {
    loading: false,
    error: false
  },
  logoutState: {
    loading: false,
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

const LOGIN = 'authentication/LOGIN';
const LOGIN_SUCCESS = 'authentication/LOGIN_SUCCESS';
const LOGIN_FAIL = 'authentication/LOGIN_FAIL';

function login() {
  return { type: LOGIN };
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

const LOGOUT = 'authentication/LOGOUT';
const LOGOUT_SUCCESS = 'authentication/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'authentication/LOGIN_FAIL';

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
      const { user } = action;
      return {
        ...state,
        user,
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
      const { user } = action;
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
  login,
  loginSuccess,
  loginFail,
  logout,
  logoutSuccess,
  logoutFail
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
  LOGOUT_FAIL
};

export default AuthenticationReducer;
