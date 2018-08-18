const initialState = {
  bountyId: -1,
  modalType: '',
  modalVisible: false,
  modalProps: {},
  currentTab: 'submissions',
  reviewee: {
    name: '',
    address: '',
    img: ''
  }
};

const SHOW_MODAL = 'BountyPage/SHOW_MODAL';
const CLOSE_MODAL = 'BountyPage/CLOSE_MODAL';
const SET_BOUNTY_ID = 'BountyPage/SET_BOUNTY_ID';
const SET_ACTIVE_TAB = 'BountyPage/SET_ACTIVE_TAB';
const SET_REVIEWEE = 'BountyPage/SET_REVIEWEE';

function showModal(modalType, modalProps = {}) {
  return { type: SHOW_MODAL, modalType, modalProps };
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

function setReviewee(reviewee) {
  return { type: SET_REVIEWEE, reviewee };
}

function BountyPageUIReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL: {
      const { modalType, modalProps } = action;

      return {
        ...state,
        modalVisible: true,
        modalType,
        modalProps
      };
    }
    case CLOSE_MODAL:
      return {
        ...state,
        modalVisible: false,
        modalType: '',
        modalProps: {}
      };
    case SET_BOUNTY_ID: {
      const { bountyId } = action;

      return {
        ...state,
        bountyId
      };
    }

    case SET_ACTIVE_TAB: {
      const { tabKey } = action;

      return {
        ...state,
        currentTab: tabKey
      };
    }
    case SET_REVIEWEE: {
      const { reviewee } = action;

      return {
        ...state,
        reviewee
      };
    }
    default:
      return state;
  }
}

export const actions = {
  showModal,
  closeModal,
  setBountyId,
  setActiveTab,
  setReviewee
};

export const actionTypes = {
  SHOW_MODAL,
  CLOSE_MODAL,
  SET_BOUNTY_ID,
  SET_ACTIVE_TAB,
  SET_REVIEWEE
};

export default BountyPageUIReducer;
