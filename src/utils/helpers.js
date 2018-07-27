export function shortenAddress(address) {
  return address.slice(0, 6) + '...' + address.slice(-4);
}

export function findETHValue(ethObj) {
  const fulfillmentAmount = parseInt(ethObj.fulfillmentAmount, 10);
  const tokenDecimals = parseInt(ethObj.tokenDecimals, 10);
  return fulfillmentAmount / Math.pow(10, tokenDecimals);
}

export function bytesToSize(bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

export function currentRouteSelector(pathname) {
  return pathname.split('/')[1] || '';
}
