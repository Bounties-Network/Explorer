const initialState = {
  address: '0x0000000000000000000000000000000000000000',
  switchValue: 'fulfiller'
};

const SET_PROFILE_ADDRESS = 'profileUI/SET_PROFILE_ADDRESS';
const TOGGLE_NETWORK_SWITCH = 'profileUI/TOGGLE_NETWORK_SWITCH';

function setProfileAddress(address) {
  return { type: SET_PROFILE_ADDRESS, address };
}

function toggleNetworkSwitch() {
  return { type: TOGGLE_NETWORK_SWITCH };
}

function profileUIReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_NETWORK_SWITCH: {
      return {
        ...state,
        switchValue: state.switchValue == 'issuer' ? 'fulfiller' : 'issuer'
      };
    }
    case SET_PROFILE_ADDRESS: {
      const { address } = action;
      console.log('setting', action);
      return {
        ...state,
        address
      };
    }
    default:
      return state;
  }
}

export const actions = {
  setProfileAddress,
  toggleNetworkSwitch
};

export const actionTypes = {
  SET_PROFILE_ADDRESS,
  TOGGLE_NETWORK_SWITCH
};

export default profileUIReducer;
