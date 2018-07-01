export function shortenAddress(address) {
  return address.slice(0, 6) + '...' + address.slice(-4);
}

export function findETHValue(ethObj) {
  const fulfillmentAmount = parseInt(ethObj.fulfillmentAmount, 10);
  const tokenDecimals = parseInt(ethObj.tokenDecimals, 10);
  return fulfillmentAmount / Math.pow(10, tokenDecimals);
}
