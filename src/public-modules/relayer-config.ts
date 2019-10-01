export default {
  relayerStagingContractAddress: "0x0d12b3fa96b3aacedd06aba62c17cb5fc0e17627",
  relayerProductionContractAddress: "0x68643f7e257a4cdadb9e7293e6aa0abc82c34547",
  relayerApiURL: `https://standardbounties-relayer.jx-${
    process.env.APP_SETTINGS_FILE === "rinkeby_settings" || process.env.APP_SETTINGS_FILE === "staging_settings"
      ? "staging"
      : "production"
  }.bounties-network-flow.com`
};
