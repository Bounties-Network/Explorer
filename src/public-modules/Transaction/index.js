const defaultWalkthroughState = {
  walkthroughStage: 'initiatePrompt',
  walkthroughVisible: false,
  pendingReceiptHash: ''
};

const initialState = {
  transactions: {},
  ...defaultWalkthroughState
};

const INITIATE_WALKTHROUGH = 'transaction/INITIATE_WALKTHROUGH';
const SET_PENDING_WALLET_CONFIRM = 'transaction/SET_PENDING_WALLET_CONFIRM';
const SET_ERROR = 'transaction/SET_ERROR';
const SET_PENDING_RECEIPT = 'transaction/PENDING_RECEIPT';
const CLOSE_WALKTHROUGH = 'transaction/CLOSE_WALKTHROUGH';

function initiateWalkthrough() {
  return { type: INITIATE_WALKTHROUGH };
}

function setPendingWalletConfirm() {
  return { type: SET_PENDING_WALLET_CONFIRM };
}

function setError() {
  return { type: SET_ERROR };
}

function setPendingReceipt(txHash) {
  return { type: SET_PENDING_RECEIPT, txHash };
}

function closeWalkthrough() {
  return { type: CLOSE_WALKTHROUGH };
}

const SET_TRANSACTION = 'transaction/SET_TRANSACTION';

function setTransaction(txHash) {
  return { type: SET_TRANSACTION, txHash };
}

function TransactionReducer(state = initialState, action) {
  switch (action.type) {
    case INITIATE_WALKTHROUGH: {
      return {
        ...state,
        ...defaultWalkthroughState,
        walkthroughVisible: true
      };
    }
    case SET_PENDING_WALLET_CONFIRM: {
      return {
        ...state,
        walkthroughStage: 'pendingWalletConfirm'
      };
    }
    case SET_PENDING_RECEIPT: {
      const { txHash } = action;

      return {
        ...state,
        walkthroughStage: 'pendingReceipt',
        pendingReceiptHash: txHash
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        walkthroughStage: 'error'
      };
    }
    case CLOSE_WALKTHROUGH: {
      return {
        ...state,
        walkthroughVisible: true
      };
    }
    case SET_TRANSACTION: {
      const { txHash } = action;
      return {
        ...state,
        transactions: [
          ...state.transactions,
          {
            txHash,
            failed: false,
            completed: false,
            viewed: false
          }
        ]
      };
    }
    default:
      return state;
  }
}

export const actions = {
  setTransaction,
  setPendingReceipt,
  setPendingWalletConfirm,
  setError,
  initiateWalkthrough
};

export const actionTypes = {
  SET_TRANSACTION,
  SET_PENDING_RECEIPT,
  SET_PENDING_WALLET_CONFIRM,
  SET_ERROR,
  INITIATE_WALKTHROUGH
};

export default TransactionReducer;
