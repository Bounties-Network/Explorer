import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered';
import {
  Submission,
  CommentPreview,
  BountyCreated,
  LeaderboardRank,
  SubmissionAccepted,
  Contribution,
  DeadlineExtension,
  PayoutIncrease
} from '.';
import moment from 'moment';

addDecorator(centered);

storiesOf('Activity', module)
  .add('Submission', () => (
    <Submission
      authorAddress={'0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67'}
      avatarSrc={
        'https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo'
      }
      authorName={'Mark Beylin'}
      bountyTitle={'This is some placeholder text for a long Bounty title... '}
      timestamp={moment()
        .subtract(4, 'hours')
        .toISOString()}
      communityName={'frontend'}
    />
  ))

  .add('CommentPreview', () => (
    <CommentPreview
      authorAddress={'0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67'}
      avatarSrc={undefined}
      authorName={undefined}
      bountyTitle={'This is some placeholder text for a long Bounty title... '}
      timestamp={moment()
        .subtract(4, 'hours')
        .toISOString()}
      communityName={'frontend'}
    />
  ))

  .add('BountyCreated', () => (
    <BountyCreated
      bountyStatus={'active'}
      authorAddress={'0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67'}
      avatarSrc={
        'https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo'
      }
      authorName={'Corwin Harrell'}
      bountyTitle={'This is some placeholder text for a long Bounty title... '}
      submissionCount={2}
      bountyExpirationTimestamp={moment()
        .add(2, 'days')
        .toISOString()}
      timestamp={moment()
        .subtract(4, 'hours')
        .toISOString()}
      communityName={'frontend'}
    />
  ))

  .add('LeaderboardRank', () => (
    <LeaderboardRank
      rankChangeAmount={12}
      authorAddress={'0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67'}
      avatarSrc={
        'https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo'
      }
      authorName={'Simona Pop'}
      timestamp={moment()
        .subtract(4, 'hours')
        .toISOString()}
      communityName={'frontend'}
    />
  ))

  .add('SubmissionAccepted', () => (
    <SubmissionAccepted
      bountyTitle={'This is some placeholder text for a long Bounty title... '}
      authorAddress={'0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67'}
      avatarSrc={
        'https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo'
      }
      authorName={'Michael M'}
      timestamp={moment()
        .subtract(4, 'hours')
        .toISOString()}
      communityName={'frontend'}
    />
  ))

  .add('Contribution', () => (
    <Contribution
      bountyTitle={'This is some placeholder text for a long Bounty title... '}
      authorAddress={'0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67'}
      avatarSrc={
        'https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo'
      }
      ethContributionAmount={0.05}
      authorName={'Michael M'}
      timestamp={moment()
        .subtract(4, 'hours')
        .toISOString()}
      communityName={'frontend'}
    />
  ))

  .add('DeadlineExtension', () => (
    <DeadlineExtension
      bountyStatus={'active'}
      bountyExtensionDate={1568553110000}
      authorAddress={'0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67'}
      avatarSrc={
        'https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo'
      }
      authorName={'Simone Popé'}
      bountyTitle={'This is some placeholder text for a long Bounty title... '}
      submissionCount={2}
      bountyExpirationTimestamp={moment()
        .add(2, 'days')
        .toISOString()}
      timestamp={moment()
        .subtract(4, 'hours')
        .toISOString()}
      communityName={'frontend'}
    />
  ))

  .add('PayoutIncrease', () => (
    <PayoutIncrease
      bountyStatus={'active'}
      bountyPayoutIncreaseAmount={0.56}
      authorAddress={'0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67'}
      avatarSrc={
        'https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo'
      }
      authorName={'Simone Popé'}
      bountyTitle={'This is some placeholder text for a long Bounty title... '}
      submissionCount={2}
      bountyExpirationTimestamp={moment()
        .add(2, 'days')
        .toISOString()}
      timestamp={moment()
        .subtract(4, 'hours')
        .toISOString()}
      communityName={'frontend'}
    />
  ));
