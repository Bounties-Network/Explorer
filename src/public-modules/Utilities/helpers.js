import { BigNumber } from 'bignumber.js';

export const calculateDecimals = (amount, decimals) => {
  const decimalPlaces = new BigNumber(parseInt(decimals), 10);
  const baseTen = new BigNumber(10, 10);
  const multiplyingDecimal = baseTen.pow(decimalPlaces);
  const amountBase = new BigNumber(amount, 10);
  return amountBase.times(multiplyingDecimal).toString();
};

export const readFile = file =>
  new Promise((resolve, reject) => {
    const reader = new window.FileReader();
    reader.onloadend = () => {
      resolve(reader);
    };
    reader.readAsArrayBuffer(file);
  });

export const promisify = inner =>
  new Promise((resolve, reject) =>
    inner((err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    })
  );

export const proxiedWeb3Handler = {
  // override getter
  get: (target, name) => {
    const inner = target[name];
    if (inner instanceof Function) {
      // Return a function with the callback already set.
      return (...args) => promisify(cb => inner(...args, cb));
    } else if (typeof inner === 'object') {
      // wrap inner web3 stuff
      return new Proxy(inner, proxiedWeb3Handler);
    } else {
      return inner;
    }
  }
};

export const promisifyContractCall = (contractFunction, options) => (
  ...args
) => {
  return new Promise((resolve, reject) => {
    return contractFunction(...args)
      .send(options)
      .on('transactionHash', hash => resolve(hash))
      .on('error', error => reject(error));
  });
};
