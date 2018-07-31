const defaultWalkthroughState = {
  transactionsInitiated: false,
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

function setTransactionCompleted(txHash, link, linkText, message) {
  return { type: SET_TRANSACTION_COMPLETED, txHash, link, linkText, message };
}

function setTransactionViewed(txHash) {
  return { type: SET_TRANSACTION_VIEWED, txHash };
}

function TransactionReducer(state = {}, action) {
  switch (action.type) {
    case SET_TRANSACTION_COMPLETED: {
      const { link, linkText, message } = action;

      return {
        ...state,
        completed: true,
        viewed: false,
        link,
        linkText,
        message
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

function addTransaction(transaction, txHash) {
  return { type: ADD_TRANSACTION, transaction, txHash };
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

const LOAD_TRANSACTIONS = 'transaction/LOAD_TRANSACTIONS';
const LOAD_TRANSACTIONS_SUCCESS = 'transaction/LOAD_TRANSACTIONS_SUCCESS';
const LOAD_TRANSACTIONS_FAIL = 'transaction/LOAD_TRANSACTIONS_FAIL';

// These actions do not actually make a change to the store right now
// as they do not need to. It's a polled, looping function.
function loadTransactions() {
  return { type: LOAD_TRANSACTIONS };
}

function loadTransactionsSuccess() {
  return { type: LOAD_TRANSACTIONS_SUCCESS };
}

function loadTransactionsFail() {
  return { type: LOAD_TRANSACTIONS_FAIL };
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

// These also have no impact on the state
// IF this fails, we do not do anything about it, as the server will serve up the completed transaction
const POST_TRANSACTION = 'transaction/POST_TRANSACTION';
const POST_TRANSACTION_SUCCESS = 'transaction/POST_TRANSACTION_SUCCESS';
const POST_TRANSACTION_FAIL = 'transaction/POST_TRANSACTION_FAIL';

function postTransaction(txHash) {
  return { type: POST_TRANSACTION, txHash };
}

function postTransactionSuccess(txHash) {
  return { type: POST_TRANSACTION_SUCCESS, txHash };
}

function postTransactionFail(txHash) {
  return { type: POST_TRANSACTION_FAIL, txHash };
}

function ManageTransactionReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TRANSACTIONS_SUCCESS: {
      return {
        ...state,
        transactionsInitiated: true
      };
    }
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
  loadTransactionsSuccess,
  loadTransactionsFail,
  postTransaction,
  postTransactionSuccess,
  postTransactionFail,
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
  POST_TRANSACTION,
  POST_TRANSACTION_SUCCESS,
  POST_TRANSACTION_FAIL,
  ADD_TRANSACTION,
  SET_TRANSACTION_COMPLETED,
  SET_TRANSACTION_VIEWED,
  SET_PENDING_RECEIPT,
  SET_PENDING_WALLET_CONFIRM,
  CLOSE_WALKTHROUGH,
  SET_ERROR,
  INITIATE_WALKTHROUGH
};

export default ManageTransactionReducer;
