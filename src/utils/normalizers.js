import { BigNumber } from 'bignumber.js';

const number = (value, prevValue) => {
  if (!value) {
    return value;
  }

  if (value === '.') {
    return value;
  }
  return BigNumber(value).isNaN() ? prevValue : value;
};

export default {
  number
};
