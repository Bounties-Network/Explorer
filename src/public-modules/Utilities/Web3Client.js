import Web3 from 'web3';

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    'https://mainnet.infura.io/v3/9abc089a095e4a3382c56f8c2dfdf446'
  )
);

export default web3;
