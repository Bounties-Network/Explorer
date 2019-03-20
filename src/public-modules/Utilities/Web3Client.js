import Web3 from 'web3';

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    'https://mainnet.infura.io/v3/5eb45628ce2c4ecebcce7f201f352792'
  )
);

export default web3;
