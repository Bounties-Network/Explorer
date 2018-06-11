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
    accept: 'application/json',
    'content-type': 'application/json'
  },
  withCredentials: true
};

const PUT_OPTIONS = {
  method: 'PUT',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json'
  },
  withCredentials: true
};

const PATCH_OPTIONS = {
  method: 'PATCH',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json'
  },
  withCredentials: true
};

const OPTIONS_OPTIONS = {
  method: 'OPTIONS',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json'
  },
  withCredentials: true
};

const GET_OPTIONS = {
  method: 'GET',
  withCredentials: true
};

function handleError(err) {
  if (err.response) {
    const response = err.response;
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
  }

  const error = new Error();
  error.errorStatus = '';
  error.errorMessage = err.message;

  rollbar.error(`API Error: ${error.errorMessage}`, error);
  throw error;
}

function checkRequestStatus(response) {
  if (
    response.status >= HTTP_200_OK &&
    response.status < HTTP_300_MULTIPLE_CHOICES
  ) {
    return response.data;
  }
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
    .catch(handleError);
}
