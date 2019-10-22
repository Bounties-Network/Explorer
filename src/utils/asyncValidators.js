/* eslint no-throw-literal: 0 */

import { actions } from 'layout/App/reducer';
import { includes } from 'lodash';
import { promisifyDebounce } from 'utils/helpers';
import { BigNumber } from 'bignumber.js';

const { getTokenBalance } = actions;

const ZERO_BALANCE_ERROR = 'ZERO_BALANCE_ERROR';
const INSUFFICIENT_BALANCE_ERROR = 'INSUFFICIENT_BALANCE_ERROR';
const UNKNOWN_ERROR = 'UNKNOWN_ERROR';

const tokenValidation = (amount, tokenAddress, dispatch) => {
  const handleResult = ([balance, symbol]) => {
    balance = BigNumber(balance, 10);
    amount = BigNumber(amount, 10);

    if (balance.isEqualTo(0)) {
      throw { error: ZERO_BALANCE_ERROR, balance, symbol };
    } else if (balance.isLessThan(amount)) {
      throw { error: INSUFFICIENT_BALANCE_ERROR, balance, symbol };
    }
  };

  const handleRejection = e => {
    throw { error: UNKNOWN_ERROR };
  };

  return new Promise((resolve, reject) => {
    dispatch(getTokenBalance(tokenAddress, resolve, reject));
  }).then(handleResult, handleRejection);
};

// There will be an issue if trying to validate more than one thing and a user
// quickly jumps to the next field. The previous promise will be cancelled and
// the new field will be validated. In the current case this is okay because
// we're only worried about the user's balance.
const debouncedTokenValidation = promisifyDebounce(tokenValidation, 500);

const tokenValidationWrapper = (
  values,
  amountKey,
  tokenContractKey,
  checkBalance,
  asyncValidating,
  field,
  dispatch
) => {
  // submit immediately if no async errors
  if (!field && !values.asyncErrors && !asyncValidating)
    return Promise.resolve();

  if (!values[tokenContractKey]) return Promise.resolve();

  // if triggered by submit, don't debounce
  const fn = !field ? tokenValidation : debouncedTokenValidation;

  return fn(values[amountKey], values[tokenContractKey], dispatch).catch(e => {
    const { error, balance = 0, symbol } = e;
    let formError = {};

    let balanceMessage;
    if (checkBalance) {
      balanceMessage = `Insufficient funds in wallet — balance: \
        ${balance.toFixed(2)} ${symbol}`;
    }

    switch (error) {
      case ZERO_BALANCE_ERROR:
        formError[tokenContractKey] = balanceMessage;
        formError[amountKey] = balanceMessage;
        break;
      case INSUFFICIENT_BALANCE_ERROR:
        formError[amountKey] = balanceMessage;
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
