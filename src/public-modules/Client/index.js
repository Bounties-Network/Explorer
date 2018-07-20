const initialState = {
  locked: false,
  hasWallet: true,
  network: 'unknown',
  initialized: false,
  address: ''
};

const SET_LOCKED = 'web3client/SET_LOCKED';
const SET_HAS_WALLET = 'web3client/SET_HAS_WALLET';
const SET_ADDRESS = 'web3client/SET_ADDRESS';
const SET_NETWORK = 'web3client/SET_NETWORK';
const SET_INITIALIZED = 'web3client/SET_INITIALIZED';

function setLocked(isLocked) {
  return { type: SET_LOCKED, locked: isLocked };
}

function setHasWallet(hasWallet) {
  return { type: SET_HAS_WALLET, hasWallet };
}

function setNetwork(network) {
  return { type: SET_NETWORK, network };
}

function setAddress(address) {
  return { type: SET_ADDRESS, address };
}

function setInitialized() {
  return { type: SET_INITIALIZED };
}

function ClientReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ADDRESS: {
      const { address } = action;

      return {
        ...state,
        address
      };
    }
    case SET_LOCKED: {
      const { locked } = action;

      return {
        ...state,
        locked
      };
    }
    case SET_INITIALIZED: {
      return {
        ...state,
        initialized: true
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
  setNetwork,
  setInitialized,
  setAddress
};

export const actionTypes = {
  SET_INITIALIZED,
  SET_ADDRESS,
  SET_LOCKED,
  SET_HAS_WALLET,
  SET_NETWORK
};

export default ClientReducer;
