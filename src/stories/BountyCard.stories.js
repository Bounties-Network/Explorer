import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { BountyCard } from 'components';
// { title, categories, issuer, usd_price, eth_amount, fulfillment_count  }
const fakeData = {
  id: 202,
  bountyStage: 3,
  categories: [
    {
      id: 14,
      name: 'JavaScript',
      normalized_name: 'javascript'
    },
    {
      id: 16,
      name: 'HTML',
      normalized_name: 'html'
    },
    {
      id: 17,
      name: 'CSS',
      normalized_name: 'css'
    },
    {
      id: 23,
      name: 'metamask-extension',
      normalized_name: 'metamask-extension'
    },
    {
      id: 24,
      name: 'MetaMask',
      normalized_name: 'metamask'
    }
  ],
  current_market_token_data: {
    id: 312,
    normalized_name: 'dai',
    name: 'Dai',
    symbol: 'DAI',
    price_usd: 0.996832
  },
  fulfillment_count: 1,
  bounty_id: 202,
  created: '2018-04-28T22:29:15.349542',
  modified: '2018-04-28T22:29:47.985272',
  deadline: '2019-04-02T21:58:48',
  data: 'QmQpXoF4VRUk6KWcD5Ke9YnjptRJiAhNMMGPYcfUr5svin',
  issuer: '0x60206c1f2b51ac470cb0f71323474f7f9e4772e1',
  arbiter: '0x0000000000000000000000000000000000000000',
  fulfillmentAmount: '60000000000000000000',
  calculated_fulfillmentAmount: '60.000000000000000000000000000000',
  paysTokens: true,
  old_balance: null,
  balance: '0',
  calculated_balance: '0.000000000000000000000000000000',
  title: 'Optimize 3d logo',
  description:
    'Project-wide version of https://github.com/MetaMask/metamask-logo/issues/13',
  bounty_created: '2018-04-02T22:00:22',
  tokenSymbol: 'DAI',
  tokenDecimals: 18,
  tokenLockPrice: 1.0,
  tokenContract: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
  usd_price: 60.0,
  issuer_name: '',
  issuer_email: 'vivek.singh@consensys.net',
  issuer_githubUsername: 'vs77bb',
  issuer_address: '0x60206c1f2b51ac470cb0f71323474f7f9e4772e1',
  sourceFileName: '',
  sourceFileHash: '',
  sourceDirectoryHash: '',
  webReferenceURL: 'https://github.com/MetaMask/metamask-extension/issues/3621',
  platform: 'gitcoin',
  schemaVersion: '0.1',
  schemaName: 'gitcoinBounty',
  token: 312
};

storiesOf('BountyCard', module).add('BountyCard', () => (
  <div>
    <BountyCard bountyData={fakeData} />
    <BountyCard bountyData={fakeData} />
    <BountyCard bountyData={fakeData} />
    <BountyCard bountyData={fakeData} />
    <BountyCard bountyData={fakeData} />
  </div>
));
