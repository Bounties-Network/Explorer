import web3 from 'public-modules/Utilities/Web3Client';

const required = value => {
  if (Array.isArray(value)) {
    return value.length ? undefined : 'Required';
  }
  return value || typeof value === 'number' ? undefined : 'Required';
};
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const totalLength = length => value =>
  value && value.length !== length ? `Must be ${length} characters` : undefined;
const isWeb3Address = value =>
  web3.utils.isAddress(value) ? undefined : 'Must be a proper web3 address';
const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined;
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined;

export default {
  required,
  maxLength,
  minLength,
  number,
  email,
  alphaNumeric,
  totalLength,
  isWeb3Address
};
