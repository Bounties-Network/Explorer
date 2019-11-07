const moduleSettings = require(`./${process.env.APP_SETTINGS_FILE}.json`);

export default {
  relayerStagingContractAddress: '0x0d45e1f2cb1f28c05c9feee7d771a5acb2f237f5',
  relayerProductionContractAddress:
    '0xf7fc27202bc20ce95ef28340d8e542346cb56b6d',
  relayerApiURL: `https://standardbounties-metatx-relayer-${
    moduleSettings.url.mainNet.includes('rinkeby') ||
    moduleSettings.url.mainNet.includes('staging')
      ? 'staging'
      : 'production'
  }.bounties-network-flow.com`
};
