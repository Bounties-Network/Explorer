const moduleSettings = require(`./${process.env.APP_SETTINGS_FILE}.json`);

export default {
  relayerAddresses: {
    mainNet: {
      bountiesMetaTxRelayerAddressV1:
        '0xf7fc27202bc20ce95ef28340d8e542346cb56b6d',
      bountiesMetaTxRelayerAddressV2:
        '0xf7fc27202bc20ce95ef28340d8e542346cb56b6d',
      'bountiesMetaTxRelayerAddressV2.1':
        '0xf7fc27202bc20ce95ef28340d8e542346cb56b6d',
      // These above aren't transacted with but required for operations on pre 2.2 bounty operations code wise
      'bountiesMetaTxRelayerAddressV2.2':
        '0xf7fc27202bc20ce95ef28340d8e542346cb56b6d',
      'bountiesMetaTxRelayerAddressV2.3':
        '0x7Da3F08b843029C323cCCeCef090d2F2C706ba42',
      'bountiesMetaTxRelayerAddressV2.4':
        '0x2867e2d426c091c07d5d32fdbd58bd8b0259b092'
    },
    rinkeby: {
      bountiesMetaTxRelayerAddressV1:
        '0xf7fc27202bc20ce95ef28340d8e542346cb56b6d',
      bountiesMetaTxRelayerAddressV2:
        '0xf7fc27202bc20ce95ef28340d8e542346cb56b6d',
      'bountiesMetaTxRelayerAddressV2.1':
        '0xf7fc27202bc20ce95ef28340d8e542346cb56b6d',
      // These above aren't transacted with but required for operations on pre 2.2 bounty operations code wise
      'bountiesMetaTxRelayerAddressV2.2':
        '0x0d45e1f2cb1f28c05c9feee7d771a5acb2f237f5',
      'bountiesMetaTxRelayerAddressV2.3':
        '0x70a1cd9b015253129b11ec9166beae620140b29d',
      'bountiesMetaTxRelayerAddressV2.4':
        '0x23db85634e36f1284233a6060b1446cce976a3ad'
    }
  },
  relayerApiURL: `https://standardbounties-metatx-relayer-${
    moduleSettings.url.mainNet.includes('rinkeby') ||
    moduleSettings.url.mainNet.includes('staging')
      ? 'staging'
      : 'production'
  }.bounties-network-flow.com`
};
