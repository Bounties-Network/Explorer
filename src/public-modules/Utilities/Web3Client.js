import Web3 from 'web3';
import { proxiedWeb3Handler } from './helpers';

const web3 = new Web3(
  new Web3.providers.HttpProvider('https://mainnet.infura.io')
);

export default web3;
