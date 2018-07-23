const initialState = {
  loading: true,
  loaded: false,
  error: false,
  user: {}
};

const LOAD_USERINFO = 'userInfo/LOAD_USERINFO';
const LOAD_USERINFO_SUCCESS = 'userInfo/LOAD_USERINFO_SUCCESS';
const LOAD_USERINFO_FAIL = 'userInfo/LOAD_USERINFO_FAIL';

function loadUserInfo(address) {
  return { type: LOAD_USERINFO, address };
}

function loadUserInfoSuccess(user) {
  console.log('hai from loaduserinfosuccess');
  return {
    type: LOAD_USERINFO_SUCCESS,
    user
  };
}

function loadUserInfoFail(error) {
  return { type: LOAD_USERINFO_FAIL, error };
}

function UserInfoReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USERINFO: {
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false
      };
    }
    case LOAD_USERINFO_SUCCESS: {
      const { user } = action;

      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        user
      };
    }
    case LOAD_USERINFO_FAIL: {
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
  loadUserInfo,
  loadUserInfoSuccess,
  loadUserInfoFail
};

export const actionTypes = {
  LOAD_USERINFO,
  LOAD_USERINFO_SUCCESS,
  LOAD_USERINFO_FAIL
};

export default UserInfoReducer;
