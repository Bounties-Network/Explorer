import { filter, includes } from 'lodash';

export function objectToQueryString(object) {
  let queryString = '';
  for (let key in object) {
    queryString += queryString ? '&' : '?';
    queryString += `${key}=${encodeURIComponent(object[key])}`;
  }

  return queryString;
}

export function queryStringToObject(queryString) {
  const query = {};
  if (queryString === '') {
    return query;
  }
  const pairs = (queryString[0] === '?'
    ? queryString.substr(1)
    : queryString
  ).split('&');
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}

export function setParam(queryString, key, value) {
  const query = queryStringToObject(queryString);
  query[key] = value;
  if (!value) {
    delete query[key];
  }
  return objectToQueryString(query);
}

export function removeParam(queryString, key) {
  const query = queryStringToObject(queryString);
  delete query[key];
  return objectToQueryString(query);
}

export function pushToParam(queryString, key, value) {
  const query = queryStringToObject(queryString);
  if (query[key]) {
    query[key] += `,${encodeURIComponent(value)}`;
    return objectToQueryString(query);
  } else {
    return setParam(queryString, key, value);
  }
}

export function removeFromParam(queryString, key, value) {
  const query = queryStringToObject(queryString);
  if (query[key]) {
    const values = query[key].split(',');
    const newValues = filter(queryValue => queryValue !== value, values);
    if (!newValues.length) {
      return removeParam(queryString, key, value);
    }
    query[key] = newValues.join(',');
    return objectToQueryString(query);
  }

  return objectToQueryString(query);
}

export function toggleFromParam(queryString, key, value) {
  const query = queryStringToObject(queryString);
  if (query[key]) {
    const values = query[key].split(',');
    if (includes(value, values)) {
      return removeFromParam(queryString, key, value);
    } else {
      return pushToParam(queryString, key, value);
    }
  }
  return setParam(queryString, key, value);
}
