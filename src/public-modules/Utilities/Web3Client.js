import Web3 from 'web3';

const web3 = new Web3(
  new Web3.providers.HttpProvider('https://mainnet.infura.io')
);
export default web3;
