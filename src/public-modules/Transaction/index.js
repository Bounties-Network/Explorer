import { map as fpMap } from 'lodash';

const map = fpMap.convert({ cap: false });

const defaultWalkthroughState = {
  walkthroughStage: 'initiatePrompt',
  walkthroughVisible: false,
  pendingReceiptHash: ''
};

const initialState = {
  transactions: {},
  ...defaultWalkthroughState
};

const SET_TRANSACTION_COMPLETED = 'transaction/SET_TRANSACTION_COMPLETED';
const SET_TRANSACTION_VIEWED = 'transaction/SET_TRANSACTION_VIEWED';

function setTransactionCompleted(txHash) {
  return { type: SET_TRANSACTION_COMPLETED, txHash };
}

function setTransactionViewed(txHash) {
  return { type: SET_TRANSACTION_VIEWED, txHash };
}

function TransactionReducer(state = {}, action) {
  switch (action.type) {
    case SET_TRANSACTION_COMPLETED: {
      return {
        ...state,
        completed: true
      };
    }
    case SET_TRANSACTION_VIEWED: {
      return {
        ...state,
        viewed: true
      };
    }
    default:
      return state;
  }
}

const ADD_TRANSACTION = 'transaction/ADD_TRANSACTION';

function addTransaction(transaction) {
  return { type: ADD_TRANSACTION, transaction };
}

function TransactionsReducer(state = {}, action) {
  switch (action.type) {
    case ADD_TRANSACTION: {
      const { txHash, transaction } = action;

      return {
        ...state,
        [txHash]: transaction
      };
    }
    case SET_TRANSACTION_VIEWED:
    case SET_TRANSACTION_COMPLETED: {
      const { txHash } = action;

      return {
        ...state,
        [txHash]: TransactionReducer(state[txHash], action)
      };
    }
    default:
      return state;
  }
}

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

function setTransactionError() {
  return { type: SET_ERROR };
}

function setPendingReceipt(txHash) {
  return { type: SET_PENDING_RECEIPT, txHash };
}

function closeWalkthrough() {
  return { type: CLOSE_WALKTHROUGH };
}

function ManageTransactionReducer(state = initialState, action) {
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
        walkthroughVisible: false
      };
    }
    case SET_TRANSACTION_VIEWED:
    case SET_TRANSACTION_COMPLETED:
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: TransactionsReducer(state.transactions, action)
      };
    default:
      return state;
  }
}

export const actions = {
  loadTransactions,
  loadTransactionSuccess,
  loadTransactionFail,
  addTransaction,
  setTransactionViewed,
  setTransactionCompleted,
  setPendingReceipt,
  setPendingWalletConfirm,
  setTransactionError,
  initiateWalkthrough,
  closeWalkthrough
};

export const actionTypes = {
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_FAIL,
  ADD_TRANSACTION,
  SET_TRANSACTION_COMPLETED,
  SET_TRANSACTION_VIEWED,
  SET_PENDING_RECEIPT,
  SET_PENDING_WALLET_CONFIRM,
  SET_ERROR,
  INITIATE_WALKTHROUGH
};

export default ManageTransactionReducer;
