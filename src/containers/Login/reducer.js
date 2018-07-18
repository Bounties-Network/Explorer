const initialState = {
  visible: false,
  stage: 'login'
};

const SHOW_LOGIN = 'containers_login/SHOW_LOGIN';

function showLogin(show) {
  return { type: SHOW_LOGIN, show };
}

function Login(state = initialState, action) {
  switch (action.type) {
    case SHOW_LOGIN: {
      return {
        ...state,
        visible: true,
        stage: 'login'
      };
    }
    default:
      return state;
  }
}

export const actions = {
  showLogin
};

export const actionTypes = {
  SHOW_LOGIN
};

export default Login;
