const ipfsConfig = {
  protocol: 'https',
  port: 5001,
  hostName: 'ipfs.bounties-network-flow.com',
  apiViewPath: `/api/v0/cat?arg=`,
  apiPinPath: `/api/v0/add?pin=true`,
  host: 'ipfs.bounties-network-flow.com'
};

const apiViewURL = `${ipfsConfig.protocol}://${ipfsConfig.hostName}:${
  ipfsConfig.port
}${ipfsConfig.apiViewPath}`;

const apiPinURL = `${ipfsConfig.protocol}://${ipfsConfig.hostName}:${
  ipfsConfig.port
}${ipfsConfig.apiPinPath}`;

export default { ...ipfsConfig, apiViewURL, apiPinURL };
