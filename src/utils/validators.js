import web3 from 'public-modules/Utilities/Web3Client';
import moment from 'moment';
import { BigNumber } from 'bignumber.js';
import intl from 'react-intl-universal';

const required = value => {
  if (Array.isArray(value)) {
    return value.length ? undefined : intl.get('validation.required');
  }
  return value || typeof value === 'number'
    ? undefined
    : intl.get('validation.required');
};

const maxLength = max => value =>
  value && value.length > max ? intl.get('validation.max', { max }) : undefined;

const minLength = min => value =>
  value && value.length < min ? intl.get('validation.min', { min }) : undefined;

const maxDecimals = max => value => {
  if (value) {
    const arr = value.split('.');

    if (arr.length < 2) {
      return undefined;
    }

    return arr[1].length <= max
      ? undefined
      : intl.get('validation.max_decimals', { max });
  }

  return undefined;
};

const minValue = min => value => {
  if (value) {
    return BigNumber(value).isGreaterThan(min)
      ? undefined
      : intl.get('validation.min_value', { min });
  }
};

const minOrEqualsValue = min => value => {
  if (value) {
    return BigNumber(value).isGreaterThanOrEqualTo(min)
      ? undefined
      : intl.get('validation.mineq_value', { value });
  }
};

const minDate = min => value => {
  return moment(min) <= moment(value)
    ? undefined
    : intl.get('validation.min_date', {
        time: moment(min).format('MMMM Do YYYY, h:mm:ss a')
      });
};

const totalLength = length => value =>
  value && value.length !== length
    ? intl.get('validation.length', { length })
    : undefined;

const isWeb3Address = value =>
  web3.utils.isAddress(value)
    ? undefined
    : intl.get('validation.web3', { value });

const number = value =>
  value && isNaN(Number(value)) ? intl.get('validation.number') : undefined;

const email = value =>
  !value || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,7}$/i.test(value)
    ? intl.get('validation.email')
    : undefined;

const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? intl.get('validation.alfa_num')
    : undefined;

const isTwitterHandle = value =>
  !value || /^@(\w){1,15}$/i.test(value)
    ? undefined
    : intl.get('validation.twitter');

const isGithubHandle = value =>
  !value || /^@[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(value)
    ? undefined
    : intl.get('validation.github');

const isURL = value =>
  !value ||
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/i.test(
    value
  )
    ? undefined
    : intl.get('validation.url');

export default {
  required,
  minValue,
  minOrEqualsValue,
  maxLength,
  minLength,
  maxDecimals,
  number,
  email,
  alphaNumeric,
  totalLength,
  isWeb3Address,
  isTwitterHandle,
  isGithubHandle,
  isURL,
  minDate
};
