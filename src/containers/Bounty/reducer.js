const initialState = {
  modal: '',
  modalVisible: false
};

const SHOW_MODAL = 'BountyPage/SHOW_MODAL';
const CLOSE_MODAL = 'BountyPage/CLOSE_MODAL';

function showModal(modal) {
  return { type: SHOW_MODAL, modal };
}

function closeModal() {
  return { type: CLOSE_MODAL };
}

function BountyPageUIReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL: {
      const { modal } = action;

      return {
        ...state,
        modalVisible: true,
        modal
      };
    }
    case CLOSE_MODAL:
      return {
        ...state,
        modalVisible: false,
        modal: ''
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
