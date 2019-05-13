const initialState = {
  locked: false,
  hasWallet: true,
  network: '',
  initialized: false,
  address: '',
  balanceInfo: {
    loading: false,
    loaded: false,
    error: false,
    tokenAddress: '0x0000000000000000000000000000000000000000',
    balance: 0
  }
};

const SET_LOCKED = 'web3client/SET_LOCKED';
const SET_HAS_WALLET = 'web3client/SET_HAS_WALLET';
const SET_HAS_PORTIS = 'web3client/SET_HAS_PORTIS';
const SET_SIGNING_IN_TO_PORTIS = 'web3client/SET_SIGNING_IN_TO_PORTIS';
const SET_ADDRESS = 'web3client/SET_ADDRESS';
const SET_NETWORK = 'web3client/SET_NETWORK';
const SET_INITIALIZED = 'web3client/SET_INITIALIZED';

function setLocked(isLocked) {
  return { type: SET_LOCKED, locked: isLocked };
}

function setHasWallet(hasWallet) {
  return { type: SET_HAS_WALLET, hasWallet };
}

function setHasPortis() {
  return { type: SET_HAS_PORTIS, hasPortis: true, signingInToPortis: true };
}

function setSigningInToPortis(signingInToPortis) {
  return { type: SET_SIGNING_IN_TO_PORTIS, signingInToPortis };
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

const GET_TOKEN_BALANCE = 'web3client/GET_TOKEN_BALANCE';
const GET_TOKEN_BALANCE_SUCCESS = 'web3client/GET_TOKEN_BALANCE_SUCCESS';
const GET_TOKEN_BALANCE_FAIL = 'web3client/GET_TOKEN_BALANCE_FAIL';

function getTokenBalance(address) {
  return { type: GET_TOKEN_BALANCE, address };
}

function getTokenBalanceSuccess(balance, symbol) {
  return { type: GET_TOKEN_BALANCE_SUCCESS, balance, symbol };
}

function getTokenBalanceFail(error) {
  return { type: GET_TOKEN_BALANCE_FAIL, error };
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
    case SET_HAS_PORTIS: {
      return {
        ...state,
        hasPortis: action.hasPortis,
        signingInToPortis: action.signingInToPortis
      };
    }
    case SET_SIGNING_IN_TO_PORTIS: {
      return {
        ...state,
        signingInToPortis: action.signingInToPortis
      };
    }
    case SET_NETWORK: {
      return {
        ...state,
        network: action.network
      };
    }
    case GET_TOKEN_BALANCE: {
      const { address } = action;

      return {
        ...state,
        balanceInfo: {
          ...initialState.balanceInfo,
          loading: true,
          address
        }
      };
    }
    case GET_TOKEN_BALANCE_SUCCESS: {
      const { balance } = action;

      return {
        ...state,
        balanceInfo: {
          ...state.balanceInfo,
          loading: false,
          loaded: true,
          balance
        }
      };
    }
    default:
      return state;
  }
}

export const actions = {
  setLocked,
  setHasWallet,
  setHasPortis,
  setSigningInToPortis,
  setNetwork,
  setInitialized,
  setAddress,
  getTokenBalance,
  getTokenBalanceSuccess,
  getTokenBalanceFail
};

export const actionTypes = {
  SET_INITIALIZED,
  SET_ADDRESS,
  SET_LOCKED,
  SET_HAS_WALLET,
  SET_HAS_PORTIS,
  SET_SIGNING_IN_TO_PORTIS,
  SET_NETWORK,
  GET_TOKEN_BALANCE,
  GET_TOKEN_BALANCE_SUCCESS,
  GET_TOKEN_BALANCE_FAIL
};

export default ClientReducer;
