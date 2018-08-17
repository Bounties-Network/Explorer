import web3 from 'public-modules/Utilities/Web3Client';
import config from 'public-modules/config';
import { proxiedWeb3Handler } from 'public-modules/Utilities/helpers';
import {
  networkSelector,
  addressSelector,
  walletLockedSelector,
  hasWalletSelector,
  initializedSelector
} from 'public-modules/Client/selectors';
import { call, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { apiEndpoint } from 'utils/constants';
import { actions } from 'public-modules/Client';

let proxiedWeb3;

const {
  setHasWallet,
  setNetwork,
  setLocked,
  setAddress,
  setInitialized
} = actions;

function* getWalletAddress() {
  const accounts = yield proxiedWeb3.eth.getAccounts();
  return accounts[0];
}

function* isWalletLocked() {
  const accounts = yield proxiedWeb3.eth.getAccounts();
  return accounts.length === 0;
}

export function* getNetwork() {
  const networkID = yield proxiedWeb3.eth.net.getId();

  let network = 'unknown';
  if (networkID === 1) {
    network = 'mainNet';
    apiEndpoint.set('https://staging.api.bounties.network');
  }
  if (networkID === 4) {
    network = 'rinkeby';
    apiEndpoint.set('https://rinkebystaging.api.bounties.network');
  }

  return network;
}

export function* getWeb3Client() {
  let currentAddress = '';
  let isLocked = false;
  let currentNetwork = 'unknown';
  const wasLocked = yield select(walletLockedSelector);
  const prevAddress = yield select(addressSelector);
  const hadWallet = yield select(hasWalletSelector);
  const hasWallet =
    typeof window.web3 !== 'undefined' &&
    typeof window.web3.currentProvider !== 'undefined';
  const networkPrev = yield select(networkSelector);
  if (hasWallet !== hadWallet) {
    yield put(setHasWallet(hasWallet));
  }
  if (hasWallet) {
    web3.setProvider(window.web3.currentProvider);
    proxiedWeb3 = new Proxy(web3, proxiedWeb3Handler);
    isLocked = yield call(isWalletLocked);
  }

  if (!hasWallet) {
    return null;
  }

  if (!isLocked) {
    currentNetwork = yield call(getNetwork);
    currentAddress = yield call(getWalletAddress);
  }
  if (isLocked !== wasLocked) {
    yield put(setLocked(isLocked));
  }
  if (currentAddress !== prevAddress) {
    yield put(setAddress(currentAddress));
  }

  if (currentNetwork !== networkPrev) {
    yield put(setNetwork(currentNetwork));
  }

  return { web3, proxiedWeb3 };
}

export function* getContractClient() {
  const { web3 } = yield call(getWeb3Client);
  const network = yield select(networkSelector);

  if (network !== 'unknown') {
    return {
      standardBounties: new web3.eth.Contract(
        config.interfaces.StandardBounties,
        config[network].standardBountiesAddress
      ).methods,
      ethProfiles: new web3.eth.Contract(
        config.interfaces.ETHProfiles,
        config[network].ethProfilesAddress
      ).methods
    };
  }
  return null;
}

export function* getTokenClient(tokenAddress) {
  const { web3 } = yield call(getWeb3Client);
  const network = yield select(networkSelector);

  if (network !== 'unknown') {
    return {
      tokenContract: new web3.eth.Contract(
        config.interfaces.HumanStandardToken,
        tokenAddress
      ).methods
    };
  }
  return null;
}

export function* updateWalletData() {
  // every second and a half, network and wallet status is updated in the redux store
  while (true) {
    const isInitialized = yield select(initializedSelector);
    yield call(getWeb3Client);
    if (!isInitialized) {
      yield put(setInitialized());
    }
    yield delay(1000);
  }
}

export default [updateWalletData];
