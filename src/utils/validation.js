import moment from 'moment';

export const isRequired = value =>
  value === undefined || value.length === 0 ? false : true;

export const isEmail = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? false
    : true;

export const minDate = value => {
  let now = moment();
  return now < away ? false : true;
};

export const isNumber = value => (value && isNaN(Number(value)) ? false : true);
