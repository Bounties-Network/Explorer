const initialState = {
  address: '0x0000000000000000000000000000000000000000',
  switchValue: 'issuer',
  currentTab: 'issued',
  reviewsModalVisible: false
};

const SET_PROFILE_ADDRESS = 'profileUI/SET_PROFILE_ADDRESS';
const TOGGLE_NETWORK_SWITCH = 'profileUI/TOGGLE_NETWORK_SWITCH';
const SET_ACTIVE_TAB = 'profileUI/SET_ACTIVE_TAB';
const SET_REVIEWS_MODAL_VISIBLE = 'profileUI/SET_REVIEWS_MODAL_VISIBLE';

function setProfileAddress(address) {
  return { type: SET_PROFILE_ADDRESS, address };
}

function toggleNetworkSwitch() {
  return { type: TOGGLE_NETWORK_SWITCH };
}

function setActiveTab(tabKey) {
  return { type: SET_ACTIVE_TAB, tabKey };
}

function setReviewsModalVisible(visible) {
  return { type: SET_REVIEWS_MODAL_VISIBLE, visible };
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
        switchValue: state.switchValue === 'issuer' ? 'fulfiller' : 'issuer'
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
    case SET_REVIEWS_MODAL_VISIBLE: {
      const { visible } = action;

      return {
        ...state,
        reviewsModalVisible: visible
      };
    }
    default:
      return state;
  }
}

export const actions = {
  setProfileAddress,
  toggleNetworkSwitch,
  setActiveTab,
  setReviewsModalVisible
};

export const actionTypes = {
  SET_PROFILE_ADDRESS,
  TOGGLE_NETWORK_SWITCH,
  SET_ACTIVE_TAB,
  SET_REVIEWS_MODAL_VISIBLE
};

export default profileUIReducer;
