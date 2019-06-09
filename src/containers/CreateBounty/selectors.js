import { map, reject } from 'lodash';

export const rootCreateBountySelector = state => state.createBounty;

export const tokensDropdownDataSelector = state => {
  return reject(
    item => item.value === '0x0000000000000000000000000000000000000000',
    map(value => {
      const { token, token_contract, token_symbol } = value;
      const name = token.length ? token[0].name : token_symbol;
      return {
        ...value,
        display: `${name}${name && ' — '}${token_contract}`,
        value: token_contract
      };
    }, state.tokens.tokens)
  );
};
