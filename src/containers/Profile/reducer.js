const initialState = {
  address: '0x0000000000000000000000000000000000000000',
  switchValue: 'issuer',
  currentTab: 'issued'
};

const SET_PROFILE_ADDRESS = 'profileUI/SET_PROFILE_ADDRESS';
const TOGGLE_NETWORK_SWITCH = 'profileUI/TOGGLE_NETWORK_SWITCH';
const SET_ACTIVE_TAB = 'profileUI/SET_ACTIVE_TAB';

function setProfileAddress(address) {
  return { type: SET_PROFILE_ADDRESS, address };
}

function toggleNetworkSwitch() {
  return { type: TOGGLE_NETWORK_SWITCH };
}

function setActiveTab(tabKey) {
  return { type: SET_ACTIVE_TAB, tabKey };
}

function profileUIReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_TAB: {
      const { tabKey } = action;

      return {
        ...state,
        currentTab: tabKey
      };
    }
    case TOGGLE_NETWORK_SWITCH: {
      return {
        ...state,
        switchValue: state.switchValue == 'issuer' ? 'fulfiller' : 'issuer'
      };
    }
    case SET_PROFILE_ADDRESS: {
      const { address } = action;

      return {
        ...state,
        ...initialState,
        address
      };
    }
    default:
      return state;
  }
}

export const actions = {
  setProfileAddress,
  toggleNetworkSwitch,
  setActiveTab
};

export const actionTypes = {
  SET_PROFILE_ADDRESS,
  TOGGLE_NETWORK_SWITCH,
  SET_ACTIVE_TAB
};

export default profileUIReducer;
