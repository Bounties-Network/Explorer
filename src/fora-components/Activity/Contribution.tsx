import React from 'react';
import { Flex, Text, Link, Box } from 'rebass';
import Divider from 'fora-components/Divider';
import AvatarImage from 'fora-components/AvatarImage';
import css from '@styled-system/css';
import styled from 'lib/emotion-styled';
import MetaData from './MetaData';

const Container = styled(Flex)(() => css({ maxWidth: 570 }));
const Content = styled(Flex)(() => css({ '> *:first-child': { mr: 3 } }));
const DescriptionContainer = styled(Flex)(() =>
  css({ '> :first-child': { mb: 3 } })
);
const Description = styled(Box)(() =>
  css({
    '> *': {
      display: 'inline-block',
      textAlign: 'left'
    },
    '> *:nth-child(2n)': {
      mx: 1
    }
  })
);

export interface IContributionProps {
  activityType: 'contribution';
  avatarSrc: string;
  authorName: string | undefined;
  authorAddress: string;
  bountyTitle: string;
  ethContributionAmount: number;
  timestamp: string;
  communityName: string;
  communityId: string;
}
const Contribution: React.FC<IContributionProps> = ({
  avatarSrc,
  authorName,
  authorAddress,
  ethContributionAmount,
  timestamp,
  communityName,
  communityId,
  bountyTitle
}) => (
  <Container flexDirection="column">
    <Content>
      <AvatarImage address={authorAddress} src={avatarSrc} />
      <DescriptionContainer flexDirection="column">
        <Description>
          <Text variant="bodyStrong">{authorName || '--'}</Text>
          <Text variant="body" color="gray400">{` just contributed `}</Text>
          <Text variant="bodyStrong">{`${ethContributionAmount} ETH`}</Text>
          <Text variant="body" color="gray400">{` to  `}</Text>
          <Link variant="link" color="">
            {bountyTitle}
          </Link>
        </Description>
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

export default Contribution;
