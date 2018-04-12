import axios from 'axios';

import {
  API_ENDPOINT,
  HTTP_401_UNAUTHORIZED,
  HTTP_200_OK,
  HTTP_403_FORBIDDEN,
  HTTP_500_INTERNAL_SERVER_ERROR,
  HTTP_300_MULTIPLE_CHOICES
} from './constants';

import rollbar from 'lib/rollbar';

const POST_OPTIONS = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  credentials: 'same-origin'
};

const PUT_OPTIONS = {
  method: 'PUT',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  credentials: 'same-origin'
};

const PATCH_OPTIONS = {
  method: 'PATCH',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  credentials: 'same-origin'
};

const OPTIONS_OPTIONS = {
  method: 'OPTIONS',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  credentials: 'same-origin'
};

const GET_OPTIONS = {
  method: 'GET',
  credentials: 'same-origin'
};

function checkRequestStatus(response) {
  if (
    response.status === HTTP_401_UNAUTHORIZED ||
    response.status === HTTP_403_FORBIDDEN
  ) {
    rollbar.warning('User session expired: relogin');
    // include redirect-type logic in here
  }

  if (response.status >= HTTP_500_INTERNAL_SERVER_ERROR) {
    const error = new Error();
    error.errorStatus = response.status;
    error.errorMessage = response.statusText;
    rollbar.error(`API Error: ${response.status}`, error);
    throw error;
  }

  const json = response.json();

  if (
    response.status >= HTTP_200_OK &&
    response.status < HTTP_300_MULTIPLE_CHOICES
  ) {
    return json;
  }

  return json.then(err => {
    const error = new Error(response.statusText);
    error.body = err;
    error.errorStatus = response.status;
    error.errorMessage = response.statusText;

    rollbar.error(`API Error: ${response.status}`, error);

    throw error;
  });
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function(url, method, options, customErrorHandler) {
  let bakedOptions;
  let errorHandler = customErrorHandler;
  if (customErrorHandler === undefined) {
    errorHandler = result => {
      throw result;
    };
  }

  const method_type = typeof method === 'string' ? method : '';
  switch ((method_type || '').toUpperCase()) {
    case 'PUT':
      bakedOptions = PUT_OPTIONS;
      break;
    case 'POST':
      bakedOptions = POST_OPTIONS;
      break;
    case 'PATCH':
      bakedOptions = PATCH_OPTIONS;
      break;
    case 'OPTIONS':
      bakedOptions = OPTIONS_OPTIONS;
      break;
    default:
      bakedOptions = GET_OPTIONS;
  }

  return axios
    .request(`${API_ENDPOINT}/${url}`, { ...bakedOptions, ...options })
    .then(checkRequestStatus)
    .catch(errorHandler);
}
