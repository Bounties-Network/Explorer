import React from 'react';
import PropTypes from 'prop-types';
import { FetchComponent, LoadComponent } from 'hocs';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions, sagas, selectors } from 'public-modules';
import styles from './ExplorerPage.module.scss';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faToolbox from '@fortawesome/fontawesome-pro-light/faToolbox';
import faComments from '@fortawesome/fontawesome-pro-light/faComments';
import faGlobe from '@fortawesome/fontawesome-pro-light/faGlobe';
import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter';
import faGithub from '@fortawesome/fontawesome-free-brands/faGithub';

import {
  Text,
  Circle,
  FullAddressBar,
  Chip,
  Tabs,
  SortBy,
  RefineByFilter,
  BountyCard
} from 'components';

let fakeBountyData = [
  {
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

const { currentUserSelector, rootCurrentUserSelector } = selectors;

const renderChips = data => {
  return data.map((elem, idx) => {
    return (
      <div className={`${styles.chip}`} key={elem + idx}>
        <Chip style="rectangle">{elem}</Chip>
      </div>
    );
  });
};

const renderBountyCards = data => {
  return data.map((elem, idx) => {
    return (
      <div className={`${styles.bountyCard}`}>
        <BountyCard bountyData={elem} />
      </div>
    );
  });
};

const ExplorerPage = props => {
  console.log('props', props);
  const { loading, error, userAddress, currentUser } = props;
  const { address, email, githubUsername, name } = currentUser;

  let tabs = [{ title: 'Bounties' }, { title: 'Submissions' }];

  const skills = [
    'React',
    'Angular 4',
    'CSS',
    'HTML',
    'Translations',
    'Javascript',
    'Java',
    'Python',
    'Server Side Rendering'
  ];

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>error...</div>;
  }

  return (
    <div className={`${styles.explorerPage}`}>
      <div className={`${styles.profile}`}>
        <div className={`${styles.profilePic}`}>
          <Circle type="image" />
          <Text style="H2" className={styles.profileTitle}>
            {name}
          </Text>
          <FullAddressBar address={userAddress} />
        </div>
        <div className={`${styles.profileInfo}`}>
          <div className={`${styles.about}`}>
            <div className={`${styles.profileHeader}`}>
              <Text style="Body">About</Text>
            </div>
            <div className={`${styles.aboutData}`}>
              <div className={`${styles.aboutDataCell}`}>
                <Text style="FormLabel">
                  <FontAwesomeIcon icon={faToolbox} /> Organization
                </Text>
                <Text style="BodySmall">Consensys</Text>
              </div>
              <div className={`${styles.aboutDataCell}`}>
                <Text style="FormLabel">
                  <FontAwesomeIcon icon={faComments} /> Languages Spoken
                </Text>
                <Text style="BodySmall">English, Romanian</Text>
              </div>
            </div>
          </div>
          <div className={`${styles.skills}`}>
            <div className={`${styles.profileHeader}`}>
              <Text style="Body">Skills</Text>
            </div>
            <div className={`${styles.skillsData}`}>
              <div className={`${styles.chipBar}`}>{renderChips(skills)}</div>
            </div>
          </div>
          <div className={`${styles.networkStats}`}>
            <div className={`${styles.networkHeader}`}>
              <Text style="Body">Network Stats</Text>
            </div>
            <div className={`${styles.networkStatsData}`}>
              <div className={`${styles.networkStatsDataCell}`}>
                <div className={`${styles.networkStatsCircle}`}>
                  <Circle
                    size="small"
                    color="green"
                    textColor="white"
                    textStyle="H4"
                    input="85%"
                  />
                </div>
                <Text style="FormLabel">Submission Acceptance Rate</Text>
              </div>
              <div className={`${styles.networkStatsDataCell}`}>
                <div className={`${styles.networkStatsCircle}`}>
                  <Circle
                    size="small"
                    color="orange"
                    textColor="white"
                    textStyle="H4"
                    input="3/5"
                  />
                </div>
                <Text style="FormLabel">Average Submission Rating Given</Text>
              </div>
              <div className={`${styles.networkStatsDataCell}`}>
                <div className={`${styles.networkStatsCircle}`}>
                  <Circle
                    size="small"
                    color="green"
                    textColor="white"
                    textStyle="H4"
                    input="100%"
                  />
                </div>
                <Text style="FormLabel">Response Rate</Text>
              </div>
            </div>
          </div>
          <div className={`${styles.elsewhere}`}>
            <div className={`${styles.profileHeader}`}>
              <Text style="Body">Elsewhere</Text>
            </div>
            <div className={`${styles.elsewhereData}`}>
              <div>
                <Text color="grey">
                  <FontAwesomeIcon icon={faGlobe} />
                </Text>{' '}
                <Text color="blue" link>
                  {' '}
                  firstNameLastName.com
                </Text>
              </div>
              <div>
                <Text color="grey">
                  <FontAwesomeIcon icon={faTwitter} />
                </Text>{' '}
                <Text color="blue" link>
                  {' '}
                  @twitterUsername
                </Text>
              </div>
              <div>
                <Text color="grey">
                  <FontAwesomeIcon icon={faGithub} />
                </Text>{' '}
                <Text color="blue" link>
                  {' '}
                  @githubUsername
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.tabs}`}>
        <Tabs tabs={tabs} />
      </div>
      <div className={`${styles.bounties}`}>
        <div className={`${styles.sortBy}`}>
          <SortBy />
        </div>
        <div className={`${styles.bountiesBody}`}>
          <div className={`${styles.refineBy}`}>
            <RefineByFilter />
          </div>
          <div className={`${styles.bountyCards}`}>
            {renderBountyCards(fakeBountyData)}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, router) => {
  let currentUser = rootCurrentUserSelector(state);
  const userAddress = router.match.params.address;

  return {
    userAddress: userAddress,
    currentUser: currentUser.currentUser,
    ...currentUserSelector(state)
  };
};

ExplorerPage.propTypes = {
  load: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.bool
};

const check = compose(
  FetchComponent(sagas.fetch),
  connect(mapStateToProps, { load: actions.loadUserInfo }),
  LoadComponent('userAddress')
)(ExplorerPage);

export default check;
