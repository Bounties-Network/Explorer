const initialState = {
  bountyId: -1,
  modalType: '',
  modalVisible: false,
  modalProps: {},
  currentTab: 'submissions',
  ratingModal: {
    fulfillmentId: -1,
    reviewee: {
      name: '',
      address: '',
      img: ''
    }
  }
};

const SHOW_MODAL = 'BountyPage/SHOW_MODAL';
const CLOSE_MODAL = 'BountyPage/CLOSE_MODAL';
const SET_BOUNTY_ID = 'BountyPage/SET_BOUNTY_ID';
const SET_ACTIVE_TAB = 'BountyPage/SET_ACTIVE_TAB';
const SET_RATING_MODAL = 'BountyPage/SET_RATING_MODAL';

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

function setRatingModal(fulfillmentId, reviewee) {
  return { type: SET_RATING_MODAL, fulfillmentId, reviewee };
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
    case SET_RATING_MODAL: {
      const { fulfillmentId, reviewee } = action;

      return {
        ...state,
        ratingModal: {
          fulfillmentId,
          reviewee
        }
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
  setRatingModal
};

export const actionTypes = {
  SHOW_MODAL,
  CLOSE_MODAL,
  SET_BOUNTY_ID,
  SET_ACTIVE_TAB,
  SET_RATING_MODAL
};

export default BountyPageUIReducer;
