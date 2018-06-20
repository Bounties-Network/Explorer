import web3 from 'public-modules/Utilities/Web3Client';
import config from 'public-modules/config';
import { networkSelector } from 'public-modules/Client/selectors';
import { call, put, select, delay } from 'redux-saga/effects';
import { promisify } from 'public-modules/Utilities/helpers';
import { actions } from 'public-modules/Client';

const { hasWallet, setNetwork } = actions;

export function* getWeb3Client() {
  if (
    typeof window.web3 !== 'undefined' &&
    typeof window.web3.currentProvider !== 'undefined'
  ) {
    web3.setProvider(window.web3.currentProvider);
    return web3;
  } else {
    yield put(setHasWallet(false));
    return null;
  }
}

export function* getNetwork() {
  const web3 = yield call(getWeb3Client);
  getWeb3Network = promisify(cb => web3.version.getNetwork());
  networkID = yield getWeb3Network();

  let network = 'unknown';
  switch (networkID) {
    case '1': {
      network = 'mainNet';
    }
    case '2': {
      network = 'rinkeby';
    }
  }

  const currentNetwork = yield select(networkSelector);
  if (currentNetwork !== network) {
    yield put(setNetwork(network));
  }

  return network;
}

export function* getContractClients() {
  const web3 = yield call(getWeb3Client);
  const network = yield call(getNetwork);
  if (network !== 'unknown') {
    return {
      standardBounties: web3.eth
        .contract(config.interfaces.StandardBounties)
        .at(config[network].standardBountiesAddress)
    };
  } else {
    throw Error('Unkown Network');
  }
}

export function* checkNetwork() {
  // every half second, network and wallet status is updated in the redux store
  while (true) {
    yield call(getWeb3Client);
    yield call(getNetwork);
    yield delay(500);
  }
}

export default [checkNetwork];
