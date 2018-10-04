import config from 'public-modules/config';

export let web3 = {};

let API_ENDPOINT = config.url.mainNet;
//let API_ENDPOINT = 'http://localhost:8000';
// update this to be an env passthrough
export const apiEndpoint = {
  set: endpoint => (API_ENDPOINT = endpoint),
  get: () => API_ENDPOINT
};
