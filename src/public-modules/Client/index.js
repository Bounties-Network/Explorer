const initialState = {
  locked: false,
  hasWallet: true,
  network: 'mainnet'
};

const SET_LOCKED = 'web3client/SET_LOCKED';
const SET_HAS_WALLET = 'web3client/SET_HAS_WALLET';
const SET_NETWORK = 'web3client/SET_NETWORK';

function setLocked(isLocked) {
  return { type: SET_LOCKED, isLocked };
}

function setHasWallet(hasWallet) {
  return { type: SET_HAS_WALLET, hasWallet };
}

function setNetwork(network) {
  return { type: SET_NETWORK, network };
}

function ClientReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOCKED: {
      return {
        ...state,
        isLocked: action.isLocked
      };
    }
    case SET_HAS_WALLET: {
      return {
        ...state,
        hasWallet: action.hasWallet
      };
    }
    case SET_NETWORK: {
      return {
        ...state,
        network: action.network
      };
    }
    default:
      return state;
  }
}

export const actions = {
  setLocked,
  setHasWallet,
  setNetwork
};

export const actionTypes = {
  SET_LOCKED,
  SET_HAS_WALLET,
  SET_NETWORK
};

export default ClientReducer;
