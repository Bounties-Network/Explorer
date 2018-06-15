import React from 'react';
import styles from './Models.module.scss';

import {
  Dialogue,
  Text,
  Loading,
  Button,
  TextInput,
  Textbox,
  CardBounty,
  ProfileBar
} from 'components';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faWallet from '@fortawesome/fontawesome-pro-light/faWallet';

export const LoadingModel = props => {
  const { children } = props;

  return (
    <Dialogue
      size="small"
      closeButton={false}
      className={`${styles.loadingModel}`}
    >
      <div className={`${styles.body}`}>
        <Loading className={`${styles.loadingDots}`} />
        <Text>{children}</Text>
      </div>
    </Dialogue>
  );
};

export const ActivateBountyModal = props => {
  return (
    <Dialogue
      size="medium"
      closeButton={false}
      className={`${styles.loadingModel}`}
      header="Activate Your Bounty"
      buttons={[
        <Button style={'secondary'}> Cancel </Button>,
        <Button style={'activate'}> Activate </Button>
      ]}
    >
      <div className={`${styles.body}`}>
        <Text style="Body" color="grey" className={`${styles.activateText}`}>
          Indicate an amount for your initial deposit to activate the bounty. At
          minimum, your initial deposit must match your payout amount.
        </Text>
        <div className={`${styles.dropdownCell}`}>
          <Text style="CardHeading" color="grey">
            Deposit Amount(ETH)
          </Text>
          <TextInput />
        </div>
      </div>
    </Dialogue>
  );
};

export const KillBountyModal = props => {
  return (
    <Dialogue
      size="medium"
      closeButton={false}
      className={`${styles.loadingModel}`}
      header="Kill Your Bounty"
      buttons={[
        <Button style={'secondary'}> Cancel </Button>,
        <Button style={'destructive'}> Kill Bounty </Button>
      ]}
    >
      <div className={`${styles.body}`}>
        <Text style="Body" color="grey" className={`${styles.activateText}`}>
          This will return all funds to you, and disable the ability for
          individuals to submit to the bounty.
        </Text>
      </div>
    </Dialogue>
  );
};

export const SubmissionDetailModal = props => {
  return (
    <Dialogue
      size="large"
      closeButton={false}
      className={`${styles.loadingModel}`}
      header="Enter Submission Details"
      buttons={[
        <Button style={'secondary'}> Cancel </Button>,
        <Button style={'primary'}> Submit </Button>
      ]}
    >
      <Text
        style="CardHeading"
        color="grey"
        className={`${styles.description}`}
      >
        Enter and submit the details for your bounty submission, including any
        files or links that may be required for fulfillment as indicated by the
        bounty description.
      </Text>
      <div className={`${styles.submissionDetailBody}`}>
        <div className={`${styles.row}`}>
          <div className={`${styles.inputCell}`}>
            <Text style="CardHeading" color="grey">
              Contact Name
            </Text>
            <TextInput />
          </div>
          <div className={`${styles.inputCell}`}>
            <Text style="CardHeading" color="grey">
              Contact Email
            </Text>
            <TextInput />
          </div>
        </div>
        <div className={`${styles.row}`}>
          <div className={`${styles.inputCell}`}>
            <Text style="CardHeading" color="grey">
              Web Link
            </Text>
            <TextInput />
          </div>
          <div className={`${styles.inputCell}`}>
            <Text style="CardHeading" color="grey">
              Associated Files
            </Text>
            <TextInput />
            <Button style="secondary" className={`${styles.button}`}>
              Replace Files...
            </Button>
          </div>
        </div>
        <div className={`${styles.descriptionCell}`}>
          <Text style="CardHeading" color="grey">
            Description
          </Text>
          <Textbox resizeNone />
        </div>
      </div>
    </Dialogue>
  );
};

export const ActivationWalletConfirmationModal = props => {
  return (
    <Dialogue
      size="medium"
      buttons={[<Button style="primary"> OK </Button>]}
      header={
        <FontAwesomeIcon
          icon={faWallet}
          className={`${styles.modalHeaderIcon} fa-4x`}
        />
      }
    >
      <div className={`${styles.walletConfirmationDialogue}`}>
        <Text style="H4" color="black" className={`${styles.modalText}`}>
          Your wallet will take it from here!
        </Text>
        <Text style="BodySmall" color="grey" className={`${styles.modalText}`}>
          After clicking "ok", a wallet dialogue will prompt you to confirm your
          transaction and pay a small amount of ETH (gas fee).
        </Text>
        <Text style="BodySmall" color="grey" className={`${styles.modalText}`}>
          A default gas limit and price will be set for you.
        </Text>
      </div>
    </Dialogue>
  );
};

export const TransactionPendingModal = props => {
  return (
    <Dialogue
      size="medium"
      buttons={[
        <Button style={'secondary'}> Dismiss </Button>,
        <Button style={'primary'}> Go To Dashboard </Button>
      ]}
    >
      <div className={`${styles.body}`}>
        <Loading className={`${styles.loadingDots}`} />
        <Text style="H4">
          Waiting for your transaction to be confirmed on the blockchain...
        </Text>
        <Text style="BodySmall" color="grey">
          Your transaction is being processed. We will notify you once it is
          confirmed and your submission has been posted.
        </Text>
      </div>
    </Dialogue>
  );
};

export const MetamaskLockModal = props => {
  return (
    <Dialogue
      size="small"
      buttons={[<Button style={'primary'}> Retry </Button>]}
      header={
        <FontAwesomeIcon
          icon={faWallet}
          className={`${styles.modalHeaderIcon} fa-3x`}
        />
      }
    >
      <div className={`${styles.body} ${styles.metamaskLockModal}`}>
        <Text style="H4">Please unlock your MetaMask account</Text>
        <Text style="BodySmall" color="grey">
          You'll need to log in your MetaMask account in order to access
          bounties.network .
        </Text>
      </div>
    </Dialogue>
  );
};

export const RateFulfillerModal = props => {
  return (
    <Dialogue
      size="large"
      buttons={[
        <Button style={'secondary'}> Cancel </Button>,
        <Button style={'primary'}> Submit </Button>
      ]}
      header={
        <div className={`${styles.bountyCardHeader}`}>
          <CardBounty bountyData={fakeCardBountyData} />
        </div>
      }
    >
      <div className={`${styles.body}`}>
        <Text style="H3">Rate Fulfiller</Text>
        <Text style="BodySmall" color="grey">
          You accepted a submission to your bounty. If you would like, you can
          rate your experience with the following bounty fulfiller:{' '}
        </Text>
        <ProfileBar />
        <Text style="BodySmall" color="grey">
          This will help set expectations for other issuers on the platform.
        </Text>
        <div className={`${styles.descriptionCell}`}>
          <Text style="CardHeading" color="grey">
            Mini Review
          </Text>
          <Textbox resizeNone size="small" />
        </div>
      </div>
    </Dialogue>
  );
};

const fakeCardBountyData = {
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
};
