const initialState = {
  bountyId: -1,
  modalType: '',
  modalVisible: false,
  modalProps: {},
  currentTab: 'comments',
  openComments: -1,
  ratingModal: {
    fulfillmentId: -1,
    reviewee: {
      name: '',
      address: '',
      img: ''
    }
  },
  rejectionModal: {
    id: -1
  }
};

const SHOW_MODAL = 'BountyPage/SHOW_MODAL';
const CLOSE_MODAL = 'BountyPage/CLOSE_MODAL';
const CLOSE_COMMENTS = 'BountyPage/CLOSE_COMMENTS';
const SET_BOUNTY_ID = 'BountyPage/SET_BOUNTY_ID';
const SET_ACTIVE_TAB = 'BountyPage/SET_ACTIVE_TAB';
const SET_OPEN_COMMENTS = 'BountyPage/SET_OPEN_COMMENTS';
const SET_RATING_MODAL = 'BountyPage/SET_RATING_MODAL';
const SET_REJECTION_MODAL = 'BountyPage/SET_REJECTION_MODAL';
const EDIT_FULFILLMENT = 'BountyPage/EDIT_FULFILLMENT';

function showModal(modalType, modalProps = {}) {
  return { type: SHOW_MODAL, modalType, modalProps };
}

function closeModal() {
  return { type: CLOSE_MODAL };
}

function closeComments() {
  return { type: CLOSE_COMMENTS };
}

function setBountyId(bountyId) {
  return { type: SET_BOUNTY_ID, bountyId };
}

function setActiveTab(tabKey) {
  return { type: SET_ACTIVE_TAB, tabKey };
}

function setOpenComments(id, autoFocus) {
  return { type: SET_OPEN_COMMENTS, id, autoFocus };
}

function setRatingModal(fulfillmentId, reviewee) {
  return { type: SET_RATING_MODAL, fulfillmentId, reviewee };
}

function setRejectionModal(id) {
  return { type: SET_RATING_MODAL, id };
}

function editFulfillment(fulfillment) {
  return { type: EDIT_FULFILLMENT, fulfillment };
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
        modalType: ''
      };
    case CLOSE_COMMENTS:
      return {
        ...state,
        openComments: -1
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

    case SET_OPEN_COMMENTS: {
      const { id, autoFocus } = action;
      return {
        ...state,
        openComments: id,
        autoFocus: autoFocus
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

    case SET_REJECTION_MODAL: {
      const { id } = action;

      return {
        ...state,
        rejectionModal: {
          id
        }
      };
    }

    case EDIT_FULFILLMENT: {
      const { fulfillment } = action;
      return {
        ...state,
        fulfillmentToEdit: fulfillment
      };
    }
    default:
      return state;
  }
}

export const actions = {
  showModal,
  closeModal,
  closeComments,
  setBountyId,
  setActiveTab,
  setOpenComments,
  setRatingModal,
  setRejectionModal,
  editFulfillment
};

export const actionTypes = {
  SHOW_MODAL,
  CLOSE_MODAL,
  CLOSE_COMMENTS,
  SET_BOUNTY_ID,
  SET_ACTIVE_TAB,
  SET_OPEN_COMMENTS,
  SET_RATING_MODAL,
  SET_REJECTION_MODAL,
  EDIT_FULFILLMENT
};

export default BountyPageUIReducer;
