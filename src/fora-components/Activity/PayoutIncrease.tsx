import React from 'react';
import { Flex, Text, Box } from 'rebass';
import Divider from 'fora-components/Divider';
import AvatarImage from 'fora-components/AvatarImage';
import css from '@styled-system/css';
import styled from 'lib/emotion-styled';
import BountyPreviewCard from 'fora-components/Card/BountyPreviewCard';
import MetaData from './MetaData';

const Container = styled(Flex)(() => css({ maxWidth: 570 }));
const Content = styled(Flex)(() => css({ '> *:first-child': { mr: 3 } }));
const DescriptionContainer = styled(Flex)(() =>
  css({ '> :not(:last-child)': { mb: 3 } })
);
const Description = styled(Box)(() =>
  css({
    '> *': {
      display: 'inline-block',
      textAlign: 'left'
    },
    '> *:nth-child(2)': {
      mx: 1
    }
  })
);

export interface IPayoutIncreaseProps {
  activityType: 'payoutIncrease';
  avatarSrc: string | undefined;
  authorName: string | undefined;
  authorAddress: string;
  bountyTitle: string;
  bountyPayoutIncreaseAmount: number;
  bountyStatus: string;
  timestamp: string;
  bountyExpirationTimestamp: string;
  communityName: string;
  communityId: string;
  submissionCount: number;
}
const PayoutIncrease: React.FC<IPayoutIncreaseProps> = ({
  avatarSrc,
  authorName,
  bountyTitle,
  bountyStatus,
  bountyPayoutIncreaseAmount,
  bountyExpirationTimestamp,
  timestamp,
  communityName,
  communityId,
  authorAddress,
  submissionCount
}) => (
  <Container flexDirection="column">
    <Content>
      <AvatarImage
        address={authorAddress}
        src={avatarSrc}
        resourceType="user"
      />
      <DescriptionContainer flexDirection="column">
        <Description>
          <Text variant="bodyStrong">{authorName || '--'}</Text>
          <Text
            variant="body"
            color="gray400"
          >{` increased their bounty's payout to `}</Text>
          <Text variant="bodyStrong">{`${bountyPayoutIncreaseAmount} ETH`}</Text>
        </Description>
        <BountyPreviewCard
          status={bountyStatus}
          title={bountyTitle}
          expirationTimestamp={bountyExpirationTimestamp}
          submissionCount={submissionCount}
          ethInUSD={'435'}
          ethAmount={'0.56'}
        />
        <MetaData
          timestamp={timestamp}
          communityName={communityName}
          communityId={communityId}
        />
      </DescriptionContainer>
    </Content>
    <Divider />
  </Container>
);

export default PayoutIncrease;
