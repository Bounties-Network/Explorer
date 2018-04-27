import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { BountyCard } from 'components';
// { title, categories, issuer, usd_price, eth_amount, fulfillment_count  }
const fakeData = {
  id: 275,
  bountyStage: 3,
  categories: [
    {
      id: 14,
      name: 'JavaScript',
      normalized_name: 'javascript'
    },
    {
      id: 15,
      name: 'Python',
      normalized_name: 'python'
    },
    {
      id: 16,
      name: 'HTML',
      normalized_name: 'html'
    },
    {
      id: 29,
      name: 'Shell',
      normalized_name: 'shell'
    },
    {
      id: 127,
      name: 'BountiesAPI',
      normalized_name: 'bountiesapi'
    },
    {
      id: 128,
      name: 'Bounties-Network',
      normalized_name: 'bounties-network'
    }
  ],
  current_market_token_data: {
    id: 2,
    normalized_name: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    price_usd: 626.029
  },
  fulfillment_count: 1,
  bounty_id: 275,
  created: '2018-04-25T03:14:33.855010',
  modified: '2018-04-25T03:15:30.962294',
  deadline: '2286-11-20T17:46:39',
  data: 'QmT7BTASzJjthnaWhEn8Ys4fX4v8WgRCXcdSqsXgk9VRxm',
  issuer: '0xe66f8c6ab127ecdfd5cbf031f74a584ad2fc494b',
  arbiter: '0x0000000000000000000000000000000000000000',
  fulfillmentAmount: '80000000000000000',
  paysTokens: false,
  old_balance: null,
  balance: '0',
  title: 'Set up Code Coverage configuration',
  description:
    '# Requirements\r\n- Code coverage should be properly configured to cover both the node.js files and the django application.\r\n- Code coverage should be configured properly to run on all required files (management jobs, helpers, etc.)\r\n\r\nAs an example, code coverage is already setup within the django application. However, the configuration needs to be fixed as it is not covering the right files. To run it, just try `docker-compose exec bounties_api python manage.py test --with-coverage`\r\n\r\n# Definition of Done\r\n- All requirements are completed above with the endpoint functional.\r\n\r\n# Reviewers\r\nMyself and @mbeylin \r\n\r\n# Review Requirements\r\n- A WIP pull request along the way with initial progress\r\n- Key questions posted here\r\n- Conversational and longer discussions should be directed to the bounties network slack in this channel: https://bountiesnetwork.slack.com/messages/community-dev',
  bounty_created: '2018-04-19T06:13:29',
  tokenSymbol: 'ETH',
  tokenDecimals: 18,
  tokenLockPrice: 621.33,
  tokenContract: '0x0000000000000000000000000000000000000000',
  usd_price: 49.7064,
  issuer_name: 'William Villanueva',
  issuer_email: 'will.villanueva@consensys.net',
  issuer_githubUsername: 'villanuevawill00aa9e3612734131',
  issuer_address: '0xe66f8c6ab127ecdfd5cbf031f74a584ad2fc494b',
  sourceFileName: '',
  sourceFileHash: '',
  sourceDirectoryHash: '',
  webReferenceUrl: '',
  platform: 'gitcoin',
  schemaVersion: '0.1',
  schemaName: 'gitcoinBounty',
  token: 2
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
