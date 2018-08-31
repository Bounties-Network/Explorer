import web3 from 'public-modules/Utilities/Web3Client';
import moment from 'moment';
import { BigNumber } from 'bignumber.js';

const required = value => {
  if (Array.isArray(value)) {
    return value.length ? undefined : '* Required';
  }
  return value || typeof value === 'number' ? undefined : '* Required';
};
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minValue = min => value => {
  if (value) {
    return BigNumber(value).isGreaterThan(min)
      ? undefined
      : `Must be greater than ${min}`;
  }
};
const minDate = min => value =>
  moment(min).diff(moment(value)) <= 0
    ? undefined
    : `Date must be after ${moment(min).format('MMMM Do YYYY, h:mm:ss a')}`;
const totalLength = length => value =>
  value && value.length !== length ? `Must be ${length} characters` : undefined;

const isWeb3Address = value =>
  web3.utils.isAddress(value) ? undefined : 'Must be a proper web3 address';

const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined;

const email = value =>
  !value || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined;

const isTwitterHandle = value =>
  !value || /^@(\w){1,15}$/i.test(value)
    ? undefined
    : '* Invalid Twitter handle';

const isGithubHandle = value =>
  !value || /^@[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(value)
    ? undefined
    : 'Invalid Github handle';

const isURL = value =>
  !value ||
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/i.test(
    value
  )
    ? undefined
    : 'Invalid URL';

export default {
  required,
  minValue,
  maxLength,
  minLength,
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
