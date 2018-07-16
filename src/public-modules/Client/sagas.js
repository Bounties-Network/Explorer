import web3 from 'public-modules/Utilities/Web3Client';
import config from 'public-modules/config';
import { networkSelector } from 'public-modules/Client/selectors';
import { call, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { promisify } from 'public-modules/Utilities/helpers';
import { actions } from 'public-modules/Client';

const { setHasWallet, setNetwork } = actions;

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
  const networkID = yield promisify(web3.eth.net.getId);

  let network = 'unknown';
  if (networkID === 1) {
    network = 'mainNet';
  }
  if (networkID === 4) {
    network = 'rinkeby';
  }

  const currentNetwork = yield select(networkSelector);
  if (currentNetwork !== network) {
    yield put(setNetwork(network));
  }

  return network;
}

export function* getContractClients() {
  const web3 = yield call(getWeb3Client);
  if (web3) {
    const network = yield call(getNetwork);
    if (network !== 'unknown') {
      return {
        standardBounties: web3.eth
          .contract(config.interfaces.StandardBounties)
          .at(config[network].standardBountiesAddress)
      };
    } else {
      throw Error('Unknown Network');
    }
  }
}

export function* checkNetwork() {
  // every second and a half, network and wallet status is updated in the redux store
  while (true) {
    const web3 = yield call(getWeb3Client);
    if (web3) {
      yield call(getNetwork);
    }
    yield delay(1000);
  }
}

export default [checkNetwork];
