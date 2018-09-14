import web3 from 'public-modules/Utilities/Web3Client';
import config from 'public-modules/config';
import { actions } from 'layout/App/reducer';

const { getTokenBalance } = actions;

// take waits for success on public module
const tokenValidation = (amount, tokenAddress, dispatch) => {
  const handleResult = balance => {
    console.log('in then', balance);
    if (balance === '0') {
      throw { tokenContract: 'You have 0 of that token' };
    } else if (balance < amount) {
      throw { tokenContract: 'You do not have enought' };
    }
  };

  console.log(amount, tokenAddress);

  return new Promise((resolve, reject) => {
    dispatch(getTokenBalance(tokenAddress, resolve, reject));
  }).then(handleResult);
};

const tokenValidationWrapper = (
  values,
  amountKey,
  tokenContractKey,
  dispatch
) => {
  return tokenValidation(
    values[amountKey],
    values[tokenContractKey],
    dispatch
  ).catch(e => {
    console.log(e);
  });
};

export default {
  tokenValidation,
  tokenValidationWrapper
};
