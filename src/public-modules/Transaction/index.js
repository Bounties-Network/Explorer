const initialState = {
  transactions: []
};

const SET_TRANSACTION = 'transaction/SET_TRANSACTION';

function setTransaction(txHash) {
  return { type: SET_TRANSACTION, txHash };
}

function TransactionReducer(state = initialState, action) {
  switch (action.type) {
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
  setTransaction
};

export const actionTypes = {
  SET_TRANSACTION
};

export default TransactionReducer;
