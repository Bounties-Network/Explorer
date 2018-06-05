import React from 'react';
import PropTypes from 'prop-types';
import { FetchComponent, LoadComponent } from 'hocs';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions, sagas, selectors } from 'public-modules';
import styles from './DashboardPage.module.scss';
import { shortenAddress } from '../../utils/utilities';

import { Text, Circle, Card, CardBounty, CardNotification } from 'components';

let myBountiesTabs = [
  { title: 'Active', notificationAmount: 4 },
  { title: 'Pending Submissions', notificationAmount: 2 },
  { title: 'Drafts', notificationAmount: 2 }
];

let notificationTabs = [
  { title: 'Active', notificationAmount: 4 },
  { title: 'Pending Submissions', notificationAmount: 2 },
  { title: 'Drafts', notificationAmount: 2 }
];

const notificationData = [
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'Just now'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'commented on',
    title: 'This is a title',
    date: 'Just now'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'commented on',
    title: 'This is a title',
    date: 'Yesterday'
  },
  {
    displayNotification: false,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'commented on',
    title: 'This is a title',
    date: 'Yesterday'
  },
  {
    displayNotification: false,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title this is a really long title ',
    date: 'Yesterday'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title this is a really long title ',
    date: 'Yesterday'
  },
  {
    displayNotification: false,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title this is a really long title ',
    date: 'May 10'
  },
  {
    displayNotification: false,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title this is a really long title ',
    date: 'May 10'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title this is a really long title ',
    date: 'May 10'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title this is a really long title ',
    date: 'May 10'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title this is a really long title ',
    date: 'May 10'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 10'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 10'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 10'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 10'
  },
  {
    displayNotification: false,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 10'
  },
  {
    displayNotification: false,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 9'
  },
  {
    displayNotification: false,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 9'
  },
  {
    displayNotification: true,
    icon: '',
    address: '0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253',
    action: 'made a submission',
    title: 'This is a title',
    date: 'May 9'
  }
];

const bountiesData = [
  {
    displayNotification: false,
    id: 286,
    bountyStage: 3,
    categories: [
      {
        id: 14,
        name: 'JavaScript',
        normalized_name: 'javascript'
      },
      {
        id: 17,
        name: 'CSS',
        normalized_name: 'css'
      },
      {
        id: 35,
        name: 'TypeScript',
        normalized_name: 'typescript'
      },
      {
        id: 39,
        name: 'React',
        normalized_name: 'react'
      },
      {
        id: 95,
        name: 'MARKETProtocol',
        normalized_name: 'marketprotocol'
      },
      {
        id: 185,
        name: 'react-static',
        normalized_name: 'react-static'
      }
    ],
    current_market_token_data: {
      id: 2,
      normalized_name: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      price_usd: 713.549
    },
    fulfillment_count: 1,
    bounty_id: 286,
    created: '2018-04-28T22:43:45.437311',
    modified: '2018-04-28T22:47:53.835652',
    deadline: '2286-11-20T17:46:39',
    data: 'QmRcHGjjcXZHkLixDy6EREs5xER4xZDK2oNYcTa9TBaLJJ',
    issuer: '0xc9e4c8a2f2d8d684fb9de60abfe3fb5ea7565366',
    arbiter: '0x0000000000000000000000000000000000000000',
    fulfillmentAmount: '100000000000000000',
    calculated_fulfillmentAmount: '0.100000000000000000000000000000',
    paysTokens: false,
    old_balance: null,
    balance: '0',
    calculated_balance: '0.000000000000000000000000000000',
    title: 'Create mailing list integration with GetResponse',
    description:
      'We would like to have a mailing list sign up form on our site that integrates with [GetResponse](https://www.getresponse.com/) \r\n\r\nUsers would be able to enter in their email address, go through a re-captcha pop up, and then receive confirmation that we have added their email address to our GetResponse mailing list.\r\n\r\n### Join Our Newsletter\r\n![image](https://user-images.githubusercontent.com/15096737/39084752-058f505a-4537-11e8-8bfe-d4d13a265006.png)\r\n\r\n## Items needed\r\n\r\n1. Integration with GetResponse\r\n2. Re-captcha \r\n3. confirmation to user \r\n4. Full test coverage of all code written\r\n\r\n\r\n## Before you `start work`\r\nIf you have ongoing work from other bounties with us where funding has not been released, please do not pick up a new issue.  We would like to involve as many contributors as possible and parallelize the work flow as much as possible.  Please also see our contribution [guidelines](https://github.com/MARKETProtocol/meta/blob/master/CONTRIBUTING.md)\r\n\r\n### Please also note that in order for work to be accepted, all code must be accompanied by test cases as well.',
    bounty_created: '2018-04-21T13:48:26',
    tokenSymbol: 'ETH',
    tokenDecimals: 18,
    tokenLockPrice: 617.73,
    tokenContract: '0x0000000000000000000000000000000000000000',
    usd_price: 61.773,
    issuer_name: 'Phil Elsasser',
    issuer_email: 'phil@marketprotocol.io',
    issuer_githubUsername: 'pelsasser',
    issuer_address: '0xc9e4c8a2f2d8d684fb9de60abfe3fb5ea7565366',
    sourceFileName: '',
    sourceFileHash: '',
    sourceDirectoryHash: '',
    webReferenceURL: 'https://github.com/MARKETProtocol/website/issues/2',
    platform: 'gitcoin',
    schemaVersion: '0.1',
    schemaName: 'gitcoinBounty',
    token: 2
  },
  {
    displayNotification: true,
    id: 286,
    bountyStage: 3,
    categories: [
      {
        id: 14,
        name: 'JavaScript',
        normalized_name: 'javascript'
      },
      {
        id: 17,
        name: 'CSS',
        normalized_name: 'css'
      },
      {
        id: 35,
        name: 'TypeScript',
        normalized_name: 'typescript'
      },
      {
        id: 39,
        name: 'React',
        normalized_name: 'react'
      },
      {
        id: 95,
        name: 'MARKETProtocol',
        normalized_name: 'marketprotocol'
      },
      {
        id: 185,
        name: 'react-static',
        normalized_name: 'react-static'
      }
    ],
    current_market_token_data: {
      id: 2,
      normalized_name: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      price_usd: 713.549
    },
    fulfillment_count: 1,
    bounty_id: 286,
    created: '2018-04-28T22:43:45.437311',
    modified: '2018-04-28T22:47:53.835652',
    deadline: '2286-11-20T17:46:39',
    data: 'QmRcHGjjcXZHkLixDy6EREs5xER4xZDK2oNYcTa9TBaLJJ',
    issuer: '0xc9e4c8a2f2d8d684fb9de60abfe3fb5ea7565366',
    arbiter: '0x0000000000000000000000000000000000000000',
    fulfillmentAmount: '100000000000000000',
    calculated_fulfillmentAmount: '0.100000000000000000000000000000',
    paysTokens: false,
    old_balance: null,
    balance: '0',
    calculated_balance: '0.000000000000000000000000000000',
    title: 'Create mailing list integration with GetResponse',
    description:
      'We would like to have a mailing list sign up form on our site that integrates with [GetResponse](https://www.getresponse.com/) \r\n\r\nUsers would be able to enter in their email address, go through a re-captcha pop up, and then receive confirmation that we have added their email address to our GetResponse mailing list.\r\n\r\n### Join Our Newsletter\r\n![image](https://user-images.githubusercontent.com/15096737/39084752-058f505a-4537-11e8-8bfe-d4d13a265006.png)\r\n\r\n## Items needed\r\n\r\n1. Integration with GetResponse\r\n2. Re-captcha \r\n3. confirmation to user \r\n4. Full test coverage of all code written\r\n\r\n\r\n## Before you `start work`\r\nIf you have ongoing work from other bounties with us where funding has not been released, please do not pick up a new issue.  We would like to involve as many contributors as possible and parallelize the work flow as much as possible.  Please also see our contribution [guidelines](https://github.com/MARKETProtocol/meta/blob/master/CONTRIBUTING.md)\r\n\r\n### Please also note that in order for work to be accepted, all code must be accompanied by test cases as well.',
    bounty_created: '2018-04-21T13:48:26',
    tokenSymbol: 'ETH',
    tokenDecimals: 18,
    tokenLockPrice: 617.73,
    tokenContract: '0x0000000000000000000000000000000000000000',
    usd_price: 61.773,
    issuer_name: 'Phil Elsasser',
    issuer_email: 'phil@marketprotocol.io',
    issuer_githubUsername: 'pelsasser',
    issuer_address: '0xc9e4c8a2f2d8d684fb9de60abfe3fb5ea7565366',
    sourceFileName: '',
    sourceFileHash: '',
    sourceDirectoryHash: '',
    webReferenceURL: 'https://github.com/MARKETProtocol/website/issues/2',
    platform: 'gitcoin',
    schemaVersion: '0.1',
    schemaName: 'gitcoinBounty',
    token: 2
  },
  {
    displayNotification: true,
    id: 286,
    bountyStage: 3,
    categories: [
      {
        id: 14,
        name: 'JavaScript',
        normalized_name: 'javascript'
      },
      {
        id: 17,
        name: 'CSS',
        normalized_name: 'css'
      },
      {
        id: 35,
        name: 'TypeScript',
        normalized_name: 'typescript'
      },
      {
        id: 39,
        name: 'React',
        normalized_name: 'react'
      },
      {
        id: 95,
        name: 'MARKETProtocol',
        normalized_name: 'marketprotocol'
      },
      {
        id: 185,
        name: 'react-static',
        normalized_name: 'react-static'
      }
    ],
    current_market_token_data: {
      id: 2,
      normalized_name: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      price_usd: 713.549
    },
    fulfillment_count: 1,
    bounty_id: 286,
    created: '2018-04-28T22:43:45.437311',
    modified: '2018-04-28T22:47:53.835652',
    deadline: '2286-11-20T17:46:39',
    data: 'QmRcHGjjcXZHkLixDy6EREs5xER4xZDK2oNYcTa9TBaLJJ',
    issuer: '0xc9e4c8a2f2d8d684fb9de60abfe3fb5ea7565366',
    arbiter: '0x0000000000000000000000000000000000000000',
    fulfillmentAmount: '100000000000000000',
    calculated_fulfillmentAmount: '0.100000000000000000000000000000',
    paysTokens: false,
    old_balance: null,
    balance: '0',
    calculated_balance: '0.000000000000000000000000000000',
    title: 'Create mailing list integration with GetResponse',
    description:
      'We would like to have a mailing list sign up form on our site that integrates with [GetResponse](https://www.getresponse.com/) \r\n\r\nUsers would be able to enter in their email address, go through a re-captcha pop up, and then receive confirmation that we have added their email address to our GetResponse mailing list.\r\n\r\n### Join Our Newsletter\r\n![image](https://user-images.githubusercontent.com/15096737/39084752-058f505a-4537-11e8-8bfe-d4d13a265006.png)\r\n\r\n## Items needed\r\n\r\n1. Integration with GetResponse\r\n2. Re-captcha \r\n3. confirmation to user \r\n4. Full test coverage of all code written\r\n\r\n\r\n## Before you `start work`\r\nIf you have ongoing work from other bounties with us where funding has not been released, please do not pick up a new issue.  We would like to involve as many contributors as possible and parallelize the work flow as much as possible.  Please also see our contribution [guidelines](https://github.com/MARKETProtocol/meta/blob/master/CONTRIBUTING.md)\r\n\r\n### Please also note that in order for work to be accepted, all code must be accompanied by test cases as well.',
    bounty_created: '2018-04-21T13:48:26',
    tokenSymbol: 'ETH',
    tokenDecimals: 18,
    tokenLockPrice: 617.73,
    tokenContract: '0x0000000000000000000000000000000000000000',
    usd_price: 61.773,
    issuer_name: 'Phil Elsasser',
    issuer_email: 'phil@marketprotocol.io',
    issuer_githubUsername: 'pelsasser',
    issuer_address: '0xc9e4c8a2f2d8d684fb9de60abfe3fb5ea7565366',
    sourceFileName: '',
    sourceFileHash: '',
    sourceDirectoryHash: '',
    webReferenceURL: 'https://github.com/MARKETProtocol/website/issues/2',
    platform: 'gitcoin',
    schemaVersion: '0.1',
    schemaName: 'gitcoinBounty',
    token: 2
  },
  {
    displayNotification: true,
    id: 286,
    bountyStage: 3,
    categories: [
      {
        id: 14,
        name: 'JavaScript',
        normalized_name: 'javascript'
      },
      {
        id: 17,
        name: 'CSS',
        normalized_name: 'css'
      },
      {
        id: 35,
        name: 'TypeScript',
        normalized_name: 'typescript'
      },
      {
        id: 39,
        name: 'React',
        normalized_name: 'react'
      },
      {
        id: 95,
        name: 'MARKETProtocol',
        normalized_name: 'marketprotocol'
      },
      {
        id: 185,
        name: 'react-static',
        normalized_name: 'react-static'
      }
    ],
    current_market_token_data: {
      id: 2,
      normalized_name: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      price_usd: 713.549
    },
    fulfillment_count: 1,
    bounty_id: 286,
    created: '2018-04-28T22:43:45.437311',
    modified: '2018-04-28T22:47:53.835652',
    deadline: '2286-11-20T17:46:39',
    data: 'QmRcHGjjcXZHkLixDy6EREs5xER4xZDK2oNYcTa9TBaLJJ',
    issuer: '0xc9e4c8a2f2d8d684fb9de60abfe3fb5ea7565366',
    arbiter: '0x0000000000000000000000000000000000000000',
    fulfillmentAmount: '100000000000000000',
    calculated_fulfillmentAmount: '0.100000000000000000000000000000',
    paysTokens: false,
    old_balance: null,
    balance: '0',
    calculated_balance: '0.000000000000000000000000000000',
    title: 'Create mailing list integration with GetResponse',
    description:
      'We would like to have a mailing list sign up form on our site that integrates with [GetResponse](https://www.getresponse.com/) \r\n\r\nUsers would be able to enter in their email address, go through a re-captcha pop up, and then receive confirmation that we have added their email address to our GetResponse mailing list.\r\n\r\n### Join Our Newsletter\r\n![image](https://user-images.githubusercontent.com/15096737/39084752-058f505a-4537-11e8-8bfe-d4d13a265006.png)\r\n\r\n## Items needed\r\n\r\n1. Integration with GetResponse\r\n2. Re-captcha \r\n3. confirmation to user \r\n4. Full test coverage of all code written\r\n\r\n\r\n## Before you `start work`\r\nIf you have ongoing work from other bounties with us where funding has not been released, please do not pick up a new issue.  We would like to involve as many contributors as possible and parallelize the work flow as much as possible.  Please also see our contribution [guidelines](https://github.com/MARKETProtocol/meta/blob/master/CONTRIBUTING.md)\r\n\r\n### Please also note that in order for work to be accepted, all code must be accompanied by test cases as well.',
    bounty_created: '2018-04-21T13:48:26',
    tokenSymbol: 'ETH',
    tokenDecimals: 18,
    tokenLockPrice: 617.73,
    tokenContract: '0x0000000000000000000000000000000000000000',
    usd_price: 61.773,
    issuer_name: 'Phil Elsasser',
    issuer_email: 'phil@marketprotocol.io',
    issuer_githubUsername: 'pelsasser',
    issuer_address: '0xc9e4c8a2f2d8d684fb9de60abfe3fb5ea7565366',
    sourceFileName: '',
    sourceFileHash: '',
    sourceDirectoryHash: '',
    webReferenceURL: 'https://github.com/MARKETProtocol/website/issues/2',
    platform: 'gitcoin',
    schemaVersion: '0.1',
    schemaName: 'gitcoinBounty',
    token: 2
  },
  {
    displayNotification: true,
    id: 286,
    bountyStage: 3,
    categories: [
      {
        id: 14,
        name: 'JavaScript',
        normalized_name: 'javascript'
      },
      {
        id: 17,
        name: 'CSS',
        normalized_name: 'css'
      },
      {
        id: 35,
        name: 'TypeScript',
        normalized_name: 'typescript'
      },
      {
        id: 39,
        name: 'React',
        normalized_name: 'react'
      },
      {
        id: 95,
        name: 'MARKETProtocol',
        normalized_name: 'marketprotocol'
      },
      {
        id: 185,
        name: 'react-static',
        normalized_name: 'react-static'
      }
    ],
    current_market_token_data: {
      id: 2,
      normalized_name: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      price_usd: 713.549
    },
    fulfillment_count: 1,
    bounty_id: 286,
    created: '2018-04-28T22:43:45.437311',
    modified: '2018-04-28T22:47:53.835652',
    deadline: '2286-11-20T17:46:39',
    data: 'QmRcHGjjcXZHkLixDy6EREs5xER4xZDK2oNYcTa9TBaLJJ',
    issuer: '0xc9e4c8a2f2d8d684fb9de60abfe3fb5ea7565366',
    arbiter: '0x0000000000000000000000000000000000000000',
    fulfillmentAmount: '100000000000000000',
    calculated_fulfillmentAmount: '0.100000000000000000000000000000',
    paysTokens: false,
    old_balance: null,
    balance: '0',
    calculated_balance: '0.000000000000000000000000000000',
    title: 'Create mailing list integration with GetResponse',
    description:
      'We would like to have a mailing list sign up form on our site that integrates with [GetResponse](https://www.getresponse.com/) \r\n\r\nUsers would be able to enter in their email address, go through a re-captcha pop up, and then receive confirmation that we have added their email address to our GetResponse mailing list.\r\n\r\n### Join Our Newsletter\r\n![image](https://user-images.githubusercontent.com/15096737/39084752-058f505a-4537-11e8-8bfe-d4d13a265006.png)\r\n\r\n## Items needed\r\n\r\n1. Integration with GetResponse\r\n2. Re-captcha \r\n3. confirmation to user \r\n4. Full test coverage of all code written\r\n\r\n\r\n## Before you `start work`\r\nIf you have ongoing work from other bounties with us where funding has not been released, please do not pick up a new issue.  We would like to involve as many contributors as possible and parallelize the work flow as much as possible.  Please also see our contribution [guidelines](https://github.com/MARKETProtocol/meta/blob/master/CONTRIBUTING.md)\r\n\r\n### Please also note that in order for work to be accepted, all code must be accompanied by test cases as well.',
    bounty_created: '2018-04-21T13:48:26',
    tokenSymbol: 'ETH',
    tokenDecimals: 18,
    tokenLockPrice: 617.73,
    tokenContract: '0x0000000000000000000000000000000000000000',
    usd_price: 61.773,
    issuer_name: 'Phil Elsasser',
    issuer_email: 'phil@marketprotocol.io',
    issuer_githubUsername: 'pelsasser',
    issuer_address: '0xc9e4c8a2f2d8d684fb9de60abfe3fb5ea7565366',
    sourceFileName: '',
    sourceFileHash: '',
    sourceDirectoryHash: '',
    webReferenceURL: 'https://github.com/MARKETProtocol/website/issues/2',
    platform: 'gitcoin',
    schemaVersion: '0.1',
    schemaName: 'gitcoinBounty',
    token: 2
  },
  {
    displayNotification: true,
    id: 286,
    bountyStage: 3,
    categories: [
      {
        id: 14,
        name: 'JavaScript',
        normalized_name: 'javascript'
      },
      {
        id: 17,
        name: 'CSS',
        normalized_name: 'css'
      },
      {
        id: 35,
        name: 'TypeScript',
        normalized_name: 'typescript'
      },
      {
        id: 39,
        name: 'React',
        normalized_name: 'react'
      },
      {
        id: 95,
        name: 'MARKETProtocol',
        normalized_name: 'marketprotocol'
      },
      {
        id: 185,
        name: 'react-static',
        normalized_name: 'react-static'
      }
    ],
    current_market_token_data: {
      id: 2,
      normalized_name: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      price_usd: 713.549
    },
    fulfillment_count: 1,
    bounty_id: 286,
    created: '2018-04-28T22:43:45.437311',
    modified: '2018-04-28T22:47:53.835652',
    deadline: '2286-11-20T17:46:39',
    data: 'QmRcHGjjcXZHkLixDy6EREs5xER4xZDK2oNYcTa9TBaLJJ',
    issuer: '0xc9e4c8a2f2d8d684fb9de60abfe3fb5ea7565366',
    arbiter: '0x0000000000000000000000000000000000000000',
    fulfillmentAmount: '100000000000000000',
    calculated_fulfillmentAmount: '0.100000000000000000000000000000',
    paysTokens: false,
    old_balance: null,
    balance: '0',
    calculated_balance: '0.000000000000000000000000000000',
    title: 'Create mailing list integration with GetResponse',
    description:
      'We would like to have a mailing list sign up form on our site that integrates with [GetResponse](https://www.getresponse.com/) \r\n\r\nUsers would be able to enter in their email address, go through a re-captcha pop up, and then receive confirmation that we have added their email address to our GetResponse mailing list.\r\n\r\n### Join Our Newsletter\r\n![image](https://user-images.githubusercontent.com/15096737/39084752-058f505a-4537-11e8-8bfe-d4d13a265006.png)\r\n\r\n## Items needed\r\n\r\n1. Integration with GetResponse\r\n2. Re-captcha \r\n3. confirmation to user \r\n4. Full test coverage of all code written\r\n\r\n\r\n## Before you `start work`\r\nIf you have ongoing work from other bounties with us where funding has not been released, please do not pick up a new issue.  We would like to involve as many contributors as possible and parallelize the work flow as much as possible.  Please also see our contribution [guidelines](https://github.com/MARKETProtocol/meta/blob/master/CONTRIBUTING.md)\r\n\r\n### Please also note that in order for work to be accepted, all code must be accompanied by test cases as well.',
    bounty_created: '2018-04-21T13:48:26',
    tokenSymbol: 'ETH',
    tokenDecimals: 18,
    tokenLockPrice: 617.73,
    tokenContract: '0x0000000000000000000000000000000000000000',
    usd_price: 61.773,
    issuer_name: 'Phil Elsasser',
    issuer_email: 'phil@marketprotocol.io',
    issuer_githubUsername: 'pelsasser',
    issuer_address: '0xc9e4c8a2f2d8d684fb9de60abfe3fb5ea7565366',
    sourceFileName: '',
    sourceFileHash: '',
    sourceDirectoryHash: '',
    webReferenceURL: 'https://github.com/MARKETProtocol/website/issues/2',
    platform: 'gitcoin',
    schemaVersion: '0.1',
    schemaName: 'gitcoinBounty',
    token: 2
  },
  {
    displayNotification: true,
    id: 286,
    bountyStage: 3,
    categories: [
      {
        id: 14,
        name: 'JavaScript',
        normalized_name: 'javascript'
      },
      {
        id: 17,
        name: 'CSS',
        normalized_name: 'css'
      },
      {
        id: 35,
        name: 'TypeScript',
        normalized_name: 'typescript'
      },
      {
        id: 39,
        name: 'React',
        normalized_name: 'react'
      },
      {
        id: 95,
        name: 'MARKETProtocol',
        normalized_name: 'marketprotocol'
      },
      {
        id: 185,
        name: 'react-static',
        normalized_name: 'react-static'
      }
    ],
    current_market_token_data: {
      id: 2,
      normalized_name: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      price_usd: 713.549
    },
    fulfillment_count: 1,
    bounty_id: 286,
    created: '2018-04-28T22:43:45.437311',
    modified: '2018-04-28T22:47:53.835652',
    deadline: '2286-11-20T17:46:39',
    data: 'QmRcHGjjcXZHkLixDy6EREs5xER4xZDK2oNYcTa9TBaLJJ',
    issuer: '0xc9e4c8a2f2d8d684fb9de60abfe3fb5ea7565366',
    arbiter: '0x0000000000000000000000000000000000000000',
    fulfillmentAmount: '100000000000000000',
    calculated_fulfillmentAmount: '0.100000000000000000000000000000',
    paysTokens: false,
    old_balance: null,
    balance: '0',
    calculated_balance: '0.000000000000000000000000000000',
    title: 'Create mailing list integration with GetResponse',
    description:
      'We would like to have a mailing list sign up form on our site that integrates with [GetResponse](https://www.getresponse.com/) \r\n\r\nUsers would be able to enter in their email address, go through a re-captcha pop up, and then receive confirmation that we have added their email address to our GetResponse mailing list.\r\n\r\n### Join Our Newsletter\r\n![image](https://user-images.githubusercontent.com/15096737/39084752-058f505a-4537-11e8-8bfe-d4d13a265006.png)\r\n\r\n## Items needed\r\n\r\n1. Integration with GetResponse\r\n2. Re-captcha \r\n3. confirmation to user \r\n4. Full test coverage of all code written\r\n\r\n\r\n## Before you `start work`\r\nIf you have ongoing work from other bounties with us where funding has not been released, please do not pick up a new issue.  We would like to involve as many contributors as possible and parallelize the work flow as much as possible.  Please also see our contribution [guidelines](https://github.com/MARKETProtocol/meta/blob/master/CONTRIBUTING.md)\r\n\r\n### Please also note that in order for work to be accepted, all code must be accompanied by test cases as well.',
    bounty_created: '2018-04-21T13:48:26',
    tokenSymbol: 'ETH',
    tokenDecimals: 18,
    tokenLockPrice: 617.73,
    tokenContract: '0x0000000000000000000000000000000000000000',
    usd_price: 61.773,
    issuer_name: 'Phil Elsasser',
    issuer_email: 'phil@marketprotocol.io',
    issuer_githubUsername: 'pelsasser',
    issuer_address: '0xc9e4c8a2f2d8d684fb9de60abfe3fb5ea7565366',
    sourceFileName: '',
    sourceFileHash: '',
    sourceDirectoryHash: '',
    webReferenceURL: 'https://github.com/MARKETProtocol/website/issues/2',
    platform: 'gitcoin',
    schemaVersion: '0.1',
    schemaName: 'gitcoinBounty',
    token: 2
  }
];

const renderNotification = data => {
  return data.map((elem, ind) => {
    return (
      <CardNotification notificationData={elem} key={'notification' + ind} />
    );
  });
};

const renderBounties = data => {
  return data.map((elem, ind) => {
    return <CardBounty bountyData={elem} key={'bounty' + ind} />;
  });
};

const { statsSelector, rootStatsSelector } = selectors;

const DashboardPage = props => {
  console.log('props', props);
  const { loading, error } = props;

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>error...</div>;
  }

  return (
    <div className={`${styles.dashboardPage}`}>
      <div className={`${styles.profileBar}`}>
        <div className={`${styles.profileData}`}>
          <div className={`${styles.circle}`}>
            <Circle type="image" />
          </div>
          <div className={`${styles.profileText}`}>
            <Text style="H1">Simona Pop</Text>
            <Text link color="blue">
              {shortenAddress('0x93d0def1d76b510e2a7a6d01cf18c54ec23f4253')}
            </Text>
          </div>
        </div>
        <div className={`${styles.bountiesInfo}`}>
          <div className={`${styles.dataCell}`}>
            <Text color="purple" style="H2">
              10
            </Text>
            <Text color="grey" style="Body">
              Bounties Issued
            </Text>
          </div>
          <div className={`${styles.dataCell}`}>
            <Text color="purple" style="H2">
              3
            </Text>
            <Text color="grey" style="Body">
              Bounties Completed
            </Text>
          </div>
          <div className={`${styles.dataCell}`}>
            <div className={`${styles.moneyCell}`}>
              <Text color="purple" style="H2">
                $1225
              </Text>
              <Text color="grey" style="Alt">
                1.25 ETH
              </Text>
            </div>
            <Text color="grey" style="Body">
              Awarded
            </Text>
          </div>
          <div className={`${styles.dataCell}`}>
            <div className={`${styles.moneyCell}`}>
              <Text color="purple" style="H2">
                $500
              </Text>
              <Text color="grey" style="Alt">
                0.5 ETH
              </Text>
            </div>
            <Text color="grey" style="Body">
              Earned
            </Text>
          </div>
        </div>
      </div>
      <div className={`${styles.dashboardBody}`}>
        <div className={`${styles.dashboardBodyLeft}`}>
          <div className={`${styles.myBounties}`}>
            <Card title="My Bounties" tabs={myBountiesTabs}>
              {renderBounties(bountiesData)}
            </Card>
          </div>
          {/* <div className={`${styles.mySubmissions}`}>{ renderBounties(bountiesData) }</div> */}
        </div>

        <div className={`${styles.dashboardBodyRight}`}>
          <div className={`${styles.activity}`}>
            <Card title="Activity" tabs={notificationTabs}>
              {renderNotification(notificationData)}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, router) => {
  let currentUser = rootStatsSelector(state);
  const userAddress = router.match.params.address;

  return {
    userAddress,
    currentUser: currentUser,
    ...statsSelector(state)
  };
};

DashboardPage.propTypes = {
  load: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.bool
};

const check = compose(
  FetchComponent(sagas.fetch),
  connect(mapStateToProps, { load: actions.loadStats }),
  LoadComponent('userAddress')
)(DashboardPage);

export default check;
