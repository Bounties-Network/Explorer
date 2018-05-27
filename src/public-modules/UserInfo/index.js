const initialState = {
  loading: true,
  loaded: false,
  error: false,
  currentUser: {}
};

const LOAD_USERINFO = 'userInfo/LOAD_USERINFO';
const LOAD_USERINFO_SUCCESS = 'userInfo/LOAD_USERINFO_SUCCESS';
const LOAD_USERINFO_FAIL = 'userInfo/LOAD_USERINFO_FAIL';

function loadUserInfo(address) {
  console.log('address', address);
  return { type: LOAD_USERINFO, address };
}

function loadUserInfoSuccess(userInfo) {
  return {
    type: LOAD_USERINFO_SUCCESS,
    currentUser: userInfo
  };
}

function loadUserInfoFail(error) {
  return { type: LOAD_USERINFO_FAIL, error };
}

function UserInfoReducer(state = initialState, action) {
  console.log(state, action);
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
      const { currentUser } = action;

      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        currentUser
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
