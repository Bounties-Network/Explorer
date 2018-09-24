import { actions } from 'layout/App/reducer';
import { includes } from 'lodash';

const { getTokenBalance } = actions;

const ZERO_BALANCE_ERROR = 'ZERO_BALANCE_ERROR';
const INSUFFICIENT_BALANCE_ERROR = 'INSUFFICIENT_BALANCE_ERROR';
const CONTRACT_DOES_NOT_CONFORM_TO_ERC20_ERROR =
  'CONTRACT_DOES_NOT_CONFORM_TO_ERC20_ERROR';
const UNKNOWN_ERROR = 'UNKNOWN_ERROR';

const tokenValidation = (amount, tokenAddress, dispatch) => {
  const handleResult = balance => {
    balance = Number(balance);
    amount = Number(amount);

    console.log('in then', balance, amount, balance < amount);

    if (balance === 0) {
      throw Error(ZERO_BALANCE_ERROR);
    } else if (balance < amount) {
      throw Error(INSUFFICIENT_BALANCE_ERROR);
    }
  };

  const handleRejection = e => {
    if (includes('convertible string', e.message)) {
      throw Error(CONTRACT_DOES_NOT_CONFORM_TO_ERC20_ERROR);
    }

    throw Error(UNKNOWN_ERROR);
  };

  console.log(amount, tokenAddress);

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
    let formError = {};

    console.log(e);

    switch (e.message) {
      case ZERO_BALANCE_ERROR:
        formError[tokenContractKey] = 'You do not have any of that token.';
        formError[amountKey] = formError[tokenContractKey];
        break;
      case INSUFFICIENT_BALANCE_ERROR:
        formError[amountKey] = 'You do not have enough of that token';
        break;
      case CONTRACT_DOES_NOT_CONFORM_TO_ERC20_ERROR:
        formError[tokenContractKey] =
          'Address provided does not conform to ERC-20 standards.';
        formError[amountKey] = formError[tokenContractKey];
        break;
      default:
        formError[tokenContractKey] = 'Something went wrong.';
        formError[amountKey] = formError[tokenContractKey];
    }

    throw formError;
  });
};

export default {
  tokenValidation,
  tokenValidationWrapper
};
