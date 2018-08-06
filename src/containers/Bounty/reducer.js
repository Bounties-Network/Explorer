const initialState = {
  modalType: '',
  modalVisible: false
};

const SHOW_MODAL = 'BountyPage/SHOW_MODAL';
const CLOSE_MODAL = 'BountyPage/CLOSE_MODAL';

function showModal(modalType) {
  return { type: SHOW_MODAL, modalType };
}

function closeModal() {
  return { type: CLOSE_MODAL };
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
    default:
      return state;
  }
}

export const actions = {
  showModal,
  closeModal
};

export const actionTypes = {
  SHOW_MODAL,
  CLOSE_MODAL
};

export default BountyPageUIReducer;
