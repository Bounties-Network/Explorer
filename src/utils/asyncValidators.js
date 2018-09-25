/* eslint no-throw-literal: 0 */

import { actions } from 'layout/App/reducer';
import { includes } from 'lodash';

const { getTokenBalance } = actions;

const ZERO_BALANCE_ERROR = 'ZERO_BALANCE_ERROR';
const INSUFFICIENT_BALANCE_ERROR = 'INSUFFICIENT_BALANCE_ERROR';
const CONTRACT_DOES_NOT_CONFORM_TO_ERC20_ERROR =
  'CONTRACT_DOES_NOT_CONFORM_TO_ERC20_ERROR';
const UNKNOWN_ERROR = 'UNKNOWN_ERROR';

const tokenValidation = (amount, tokenAddress, dispatch) => {
  const handleResult = ([balance, symbol]) => {
    balance = Number(balance);
    amount = Number(amount);

    if (balance === 0) {
      throw { error: ZERO_BALANCE_ERROR, balance, symbol };
    } else if (balance < amount) {
      throw { error: INSUFFICIENT_BALANCE_ERROR, balance, symbol };
    }
  };

  const handleRejection = e => {
    if (includes('convertible string', e.message)) {
      throw { error: CONTRACT_DOES_NOT_CONFORM_TO_ERC20_ERROR };
    }

    throw { error: UNKNOWN_ERROR };
  };

  return new Promise((resolve, reject) => {
    dispatch(getTokenBalance(tokenAddress, resolve, reject));
  }).then(handleResult, handleRejection);
};

const tokenValidationWrapper = (
  values,
  amountKey,
  tokenContractKey,
  dispatch
) => {
  if (!values[amountKey] || !values[tokenContractKey]) return Promise.resolve();

  return tokenValidation(
    values[amountKey],
    values[tokenContractKey],
    dispatch
  ).catch(e => {
    const { error, balance, symbol } = e;
    let formError = {};

    const validationMessage = `Insufficient funds — balance: ${balance.toFixed(
      2
    )} ${symbol}`;

    switch (error) {
      case ZERO_BALANCE_ERROR:
        formError[tokenContractKey] = validationMessage;
        formError[amountKey] = validationMessage;
        break;
      case INSUFFICIENT_BALANCE_ERROR:
        formError[amountKey] = validationMessage;
        break;
      case CONTRACT_DOES_NOT_CONFORM_TO_ERC20_ERROR:
        formError[tokenContractKey] =
          'Address provided does not conform to ERC-20 standards.';
        formError[amountKey] = formError[tokenContractKey];
        break;
      default:
        formError[tokenContractKey] = 'Something went wrong.';
        formError[amountKey] = 'Something went wrong.';
    }

    throw formError;
  });
};

export default {
  tokenValidation,
  tokenValidationWrapper
};
