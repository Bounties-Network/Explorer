/** @jsx jsx */
import { jsx } from "theme-ui";
import React from 'react';
import { Flex, Text, Link, Box } from '@theme-ui/components';
import Divider from 'fora-components/Divider';
import AvatarImage from 'fora-components/AvatarImage';
import css from '@styled-system/css';
import styled from 'lib/emotion-styled';
import MetaData from './MetaData';

const Container = styled(Flex)(() => css({ maxWidth: 570, flexDirection: "column"}));
const Content = styled(Flex)(() => css({ '> *:first-of-type': { mr: 3 } }));
const DescriptionContainer = styled(Flex)(() =>
  css({ flexDirection: "column" })
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
  <Container>
    <Content>
      <AvatarImage address={authorAddress} src={avatarSrc} />
      <DescriptionContainer>
        <Description>
          <Text variant="body" sx={{ fontWeight: 'medium' }}>{authorName || '--'}</Text>
          <Text variant="body" color="brandGray.400">{` just contributed `}</Text>
          <Text variant="body" sx={{ fontWeight: 'medium' }}>{`${ethContributionAmount} ETH`}</Text>
          <Text variant="body" color="brandGray.400">{` to  `}</Text>
          <Link variant="text.link">
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
