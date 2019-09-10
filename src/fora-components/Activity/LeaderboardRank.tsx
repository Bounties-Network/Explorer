import React from 'react';
import { Flex, Text, Link, Box } from 'rebass';
import Divider from 'fora-components/Divider';
import AvatarImage from 'fora-components/AvatarImage';
import css from '@styled-system/css';
import styled from 'lib/emotion-styled';
import moment from 'moment';
import numbro from 'numbro';

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

interface IProps {
  avatarSrc: string;
  authorName: string | undefined;
  authorAddress: string;
  rankChangeAmount: number;
  timestamp: string;
  communityName: string;
}
const LeaderboardRank: React.FC<IProps> = ({
  avatarSrc,
  authorName,
  authorAddress,
  rankChangeAmount,
  timestamp,
  communityName
}) => (
  <Container flexDirection="column">
    <Content>
      <AvatarImage address={authorAddress} src={avatarSrc} />
      <DescriptionContainer flexDirection="column">
        <Description>
          <Text variant="bodyStrong">{authorName || '--'}</Text>
          <Text
            variant="body"
            color="gray400"
          >{` moved up the ranks to `}</Text>
          <Text variant="bodyStrong">
            {numbro(rankChangeAmount).format({
              output: 'ordinal'
            })}
          </Text>
          <Text variant="body" color="gray400">{` on the  `}</Text>
          <Link variant="link" color="">{`leaderboard!`}</Link>
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

export default LeaderboardRank;
