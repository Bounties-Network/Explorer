import web3 from "public-modules/Utilities/Web3Client";
import { each as fpEach } from "lodash";
import { BigNumber } from "bignumber.js";

const each = fpEach.convert({ cap: false });

export const calculateDecimals = (amount, decimals) => {
  const decimalPlaces = new BigNumber(decimals, 10);
  const baseTen = new BigNumber(10, 10);
  const multiplyingDecimal = baseTen.pow(decimalPlaces);
  const amountBase = new BigNumber(amount, 10);
  return amountBase.times(multiplyingDecimal, 10).toString(10);
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
    } else if (typeof inner === "object") {
      // wrap inner web3 stuff
      return new Proxy(inner, proxiedWeb3Handler);
    } else {
      return inner;
    }
  }
};

export const promisifyContractCall = (contractFunction, options) => (...args) => {
  return new Promise((resolve, reject) => {
    return contractFunction(...args)
      .send(options)
      .on("transactionHash", hash => resolve(hash))
      .on("error", error => reject(error));
  });
};

export const promisifyContractEstimateGasCall = (contractFunction, options) => (...args) => {
  return new Promise((resolve, reject) => {
    return contractFunction(...args).estimateGas(options, function(error, gasAmount) {
      if (error) {
        reject(error);
      }
      resolve(gasAmount);
    });
  });
};

export const batchContractMethods = (...methods) => {
  return new Promise((resolve, reject) => {
    const batch = new web3.eth.BatchRequest();
    let completedCount = 0;
    const txHashes = [];
    each((method, idx) => {
      const [fn, web3Options] = method;
      batch.add(
        fn.request(web3Options, (err, txHash) => {
          if (err) {
            return reject(err);
          }
          txHashes[idx] = txHash;
          if (++completedCount === methods.length) {
            return resolve(txHashes);
          }
        })
      );
    }, methods);
    batch.execute();
  });
};
