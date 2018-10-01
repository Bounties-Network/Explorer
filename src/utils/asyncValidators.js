/* eslint no-throw-literal: 0 */

import { actions } from 'layout/App/reducer';
import { includes } from 'lodash';
import { promisifyDebounce } from 'utils/helpers';

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
    if (includes('decode bytes32 from ABI', e.message)) {
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
  asyncValidating,
  field,
  dispatch
) => {
  // submit immediately if no async errors
  if (!field && !values.asyncErrors && !asyncValidating)
    return Promise.resolve();

  if (!values[tokenContractKey]) return Promise.resolve();

  // if triggered by submit, don't debounce
  const fn = !field ? tokenValidation : promisifyDebounce(tokenValidation, 500);

  return fn(values[amountKey], values[tokenContractKey], dispatch).catch(e => {
    const { error, balance = 0, symbol } = e;
    let formError = {};

    const validationMessage = `Insufficient funds in wallet — balance: \
      ${balance.toFixed(2)} ${symbol}`;

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
