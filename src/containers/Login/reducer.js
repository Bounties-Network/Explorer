import { actionTypes as authActionTypes } from 'public-modules/Authentication';

const { RESET_LOGIN_STATE } = authActionTypes;

const initialState = {
  visible: false,
  stage: 'login'
};

const SHOW_LOGIN = 'containers_login/SHOW_LOGIN';
const SET_STAGE = 'containers_login/SET_STAGE';

function showLogin(show) {
  return { type: SHOW_LOGIN, show };
}

function setStage(stage) {
  return { type: SET_STAGE, stage };
}

function Login(state = initialState, action) {
  switch (action.type) {
    case SHOW_LOGIN: {
      const { show } = action;

      return {
        ...state,
        visible: show,
        stage: 'login'
      };
    }
    case SET_STAGE: {
      const { stage } = action;

      return {
        ...state,
        stage
      };
    }
    case RESET_LOGIN_STATE: {
      return {
        ...state,
        visible: false
      };
    }
    default:
      return state;
  }
}

export const actions = {
  showLogin,
  setStage
};

export const actionTypes = {
  SHOW_LOGIN,
  SET_STAGE
};

export default Login;
