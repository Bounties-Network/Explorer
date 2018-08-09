const initialState = {
  bountyId: -1,
  modalType: '',
  modalVisible: false,
  currentTab: 'submissions'
};

const SHOW_MODAL = 'BountyPage/SHOW_MODAL';
const CLOSE_MODAL = 'BountyPage/CLOSE_MODAL';
const SET_BOUNTY_ID = 'BountyPage/SET_BOUNTY_ID';
const SET_ACTIVE_TAB = 'BountyPage/SET_ACTIVE_TAB';

function showModal(modalType) {
  return { type: SHOW_MODAL, modalType };
}

function closeModal() {
  return { type: CLOSE_MODAL };
}

function setBountyId(bountyId) {
  return { type: SET_BOUNTY_ID, bountyId };
}

function setActiveTab(tabKey) {
  return { type: SET_ACTIVE_TAB, tabKey };
}

function BountyPageUIReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL: {
      const { modalType } = action;

      return {
        ...state,
        modalVisible: true,
        modalType
      };
    }
    case CLOSE_MODAL:
      return {
        ...state,
        modalVisible: false,
        modalType: ''
      };
    case SET_BOUNTY_ID: {
      const { bountyId } = action;

      return {
        ...state,
        bountyId
      };
    }

    case SET_ACTIVE_TAB:
      const { tabKey } = action;

      return {
        ...state,
        currentTab: tabKey
      };
    default:
      return state;
  }
}

export const actions = {
  showModal,
  closeModal,
  setBountyId,
  setActiveTab
};

export const actionTypes = {
  SHOW_MODAL,
  CLOSE_MODAL,
  SET_BOUNTY_ID,
  SET_ACTIVE_TAB
};

export default BountyPageUIReducer;
