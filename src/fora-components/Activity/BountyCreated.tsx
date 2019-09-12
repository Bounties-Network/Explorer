import React from 'react';
import { Flex, Text, Box } from 'rebass';
import Divider from 'fora-components/Divider';
import AvatarImage from 'fora-components/AvatarImage';
import css from '@styled-system/css';
import emotionStyled from 'lib/emotion-styled';
import BountyPreviewCard from 'fora-components/Card/BountyPreviewCard';
import MetaData from './MetaData';

const Container = emotionStyled(Flex)(() => css({ maxWidth: 570 }));
const Content = emotionStyled(Flex)(() =>
  css({ '> *:first-child': { mr: 3 } })
);
const DescriptionContainer = emotionStyled(Flex)(() =>
  css({ '> :not(:last-child)': { mb: 3 } })
);
const Description = emotionStyled(Box)(() =>
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

export interface IBountyCreatedProps {
  activityType: 'bountyCreated';
  avatarSrc: string | undefined;
  authorName: string | undefined;
  authorAddress: string;
  bountyTitle: string;
  bountyStatus: string;
  timestamp: string;
  bountyExpirationTimestamp: string;
  communityName: string;
  communityId: string;
  submissionCount: number;
}
const BountyCreated: React.FC<IBountyCreatedProps> = ({
  avatarSrc,
  authorName,
  bountyTitle,
  bountyStatus,
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
          <Text variant="body" color="gray400">{` created a bounty`}</Text>
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

export default BountyCreated;
