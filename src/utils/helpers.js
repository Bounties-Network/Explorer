export function shortenAddress(address) {
  return address.slice(0, 6) + '...' + address.slice(-4);
}

export function findETHValue(ethObj) {
  const fulfillmentAmount = parseInt(ethObj.fulfillmentAmount);
  const tokenDecimals = parseInt(ethObj.tokenDecimals);
  return fulfillmentAmount / Math.pow(10, tokenDecimals);
}

export function bytesToSize(bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte'; // eslint-disable-line eqeqeq
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

export function currentRouteSelector(pathname) {
  return pathname.split('/')[1] || '';
}

export function ipfsToHttp(directoryHash, fileName) {
  return `https://ipfs.infura.io/ipfs/${directoryHash}/${fileName}`;
}

export function queryStringToObject(queryString) {
  var query = {};
  var pairs = (queryString[0] === '?'
    ? queryString.substr(1)
    : queryString
  ).split('&');
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}
