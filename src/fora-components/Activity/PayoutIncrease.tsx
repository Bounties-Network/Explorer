/** @jsx jsx */
import { jsx } from "theme-ui";
import React from 'react';
import { Flex, Text, Box } from 'rebass';
import Divider from 'fora-components/Divider';
import AvatarImage from 'fora-components/AvatarImage';
import css from '@styled-system/css';
import styled from 'lib/emotion-styled';
import PreviewCard from 'fora-components/Card/PreviewCard';
import MetaData from './MetaData';

const Container = styled(Flex)(() => css({ maxWidth: 570, flexDirection: "column"}));
const Content = styled(Flex)(() => css({ '> *:first-of-type': { mr: 3 } }));
const DescriptionContainer = styled(Flex)(() =>
  css({ flexDirection: 'column', '> :first-of-type': { mb: 4 } })
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
  <Container>
    <Content>
      <AvatarImage
        address={authorAddress}
        src={avatarSrc}
        resourceType="user"
      />
      <DescriptionContainer>
        <Description>
          <Text variant="body" sx={{ fontWeight: 'medium' }}>{authorName || '--'}</Text>
          <Text
            variant="body"
            color="brandGray.400"
          >{` increased their bounty's payout to `}</Text>
          <Text variant="body" sx={{ fontWeight: 'medium' }}>{`${bountyPayoutIncreaseAmount} ETH`}</Text>
        </Description>
        <PreviewCard
          status={bountyStatus}
          title={bountyTitle}
          expirationTimestamp={bountyExpirationTimestamp}
          submissionCount={submissionCount}
          ethInUSD={435}
          ethAmount={0.56}
          href={"https://www.google.co.uk"}
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
