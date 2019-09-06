import React from 'react';
import { Image, Link, Text, Flex } from 'rebass';
import styled from 'lib/emotion-styled';
import css from '@styled-system/css';
import Divider from 'fora-components/Divider';

const Container = styled(Flex)(() => css({ width: 270 }));
const Header = styled(Flex)(() => css({ '> :first-child': { mr: 'auto' } }));
const CommunitiesContainer = styled(Flex)(() =>
  css({ '> *:not(:last-child)': { mb: 3 } })
);
const CommunityContainer = styled(Flex)(() =>
  css({
    cursor: 'pointer',
    '> :first-of-type': { mr: 3 }
  })
);
const CommunityImage = styled(Image)(() =>
  css({
    boxShadow: 0,
    border: 'avatar',
    boxSizing: 'border-box',
    borderRadius: 2,
    width: 40,
    height: 40
  })
);

interface ICommunityProps {
  src: string;
  name: string;
  id: string;
  memberCount: number;
}
const Community: React.FC<ICommunityProps> = ({
  src,
  name,
  memberCount,
  id
}) => (
  <Link href={`/community/${id}`}>
    <CommunityContainer alignItems="center">
      <CommunityImage src={src} />
      <Flex flexDirection="column">
        <Text color="black" variant="text.bodyStrong">
          {name}
        </Text>
        <Text variant="text.small" color="gray400">
          {`${memberCount} members`}
        </Text>
      </Flex>
    </CommunityContainer>
  </Link>
);

interface IProps {
  communities: ICommunityProps[];
}
const TopCommunities: React.FC<IProps> = ({ communities }) => (
  <Container flexDirection="column">
    <Header>
      <Text variant="h3">Top communities</Text>
      <Link>See all</Link>
    </Header>
    <Divider />
    <CommunitiesContainer flexDirection="column">
      {communities.map(Community)}
    </CommunitiesContainer>
  </Container>
);

export default TopCommunities;
