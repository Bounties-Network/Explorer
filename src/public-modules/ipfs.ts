const ipfsConfig = {
  protocol: "http",
  port: 5001,
  hostName: "ipfs.bounties-network-flow.com",
  apiViewPath: `/api/v0/cat?arg=`,
  host: "ipfs.bounties-network-flow.com"
};

const apiViewURL = `${ipfsConfig.protocol}://${ipfsConfig.hostName}:${ipfsConfig.port}${ipfsConfig.apiViewPath}`;

export default { ...ipfsConfig, apiViewURL };
