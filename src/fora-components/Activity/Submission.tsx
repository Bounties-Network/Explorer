import React from 'react';
import { Flex, Text, Link, Box } from 'rebass';
import Divider from 'fora-components/Divider';
import AvatarImage from 'fora-components/AvatarImage';
import css from '@styled-system/css';
import styled from 'lib/emotion-styled';
import moment from 'moment';

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
    '> *:nth-child(2)': {
      mx: 1
    }
  })
);

export interface ISubmissionProps {
  activityType: 'submission';
  avatarSrc: string | undefined;
  authorName: string | undefined;
  authorAddress: string;
  bountyTitle: string;
  timestamp: string;
  communityName: string;
}
const Submission: React.FC<ISubmissionProps> = ({
  avatarSrc,
  authorName,
  authorAddress,
  bountyTitle,
  timestamp,
  communityName
}) => (
  <Container flexDirection="column">
    <Content>
      <AvatarImage address={authorAddress} src={avatarSrc} />
      <DescriptionContainer flexDirection="column">
        <Description>
          <Text variant="bodyStrong">{authorName || '--'}</Text>
          <Text variant="body" color="gray400">{` submitted to `}</Text>
          <Link variant="link">{bountyTitle}</Link>
        </Description>
        <Flex>
          <Text variant="body" color="gray400">
            {moment(timestamp).fromNow()} • {`f/${communityName}`}
          </Text>
        </Flex>
      </DescriptionContainer>
    </Content>
    <Divider />
  </Container>
);

export default Submission;