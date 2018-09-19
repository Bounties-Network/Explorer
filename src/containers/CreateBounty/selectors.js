import { map, reject } from 'lodash';

export const rootCreateBountySelector = state => state.createBounty;

export const tokensDropdownDataSelector = state => {
  return reject(
    item => item.value === '0x0000000000000000000000000000000000000000',
    map(value => {
      const { token, tokenContract, tokenSymbol } = value;
      const name = token.length ? token[0].name : tokenSymbol;
      return {
        ...value,
        display: `${name}${name && ' — '}${tokenContract}`,
        value: tokenContract
      };
    }, state.tokens.tokens)
  );
};
