import React from 'react';
import { Flex, Text, Link } from 'rebass';
import emotionStyled from 'lib/emotion-styled';
import css from '@styled-system/css';
import moment from 'moment';

const Container = emotionStyled(Flex)(() =>
  css({ '> :nth-child(2)': { mx: 1 } })
);

interface IProps {
  communityId: string;
  communityName: string;
  timestamp: number | string;
}
const MetaData: React.FC<IProps> = ({
  timestamp,
  communityName,
  communityId
}) => (
  <Container>
    <Text variant="body" color="gray.400">
      {moment(timestamp).fromNow()}
    </Text>
    <Text variant="body" color="gray.400">
      {'•'}
    </Text>
    <Link href={`/community/${communityId}`} variant="link">
      <Text color="gray.400" variant="body">{`f/${communityName}`}</Text>
    </Link>
  </Container>
);
export default MetaData;
