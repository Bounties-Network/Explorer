import React from 'react';
import { Text, Flex, Button } from 'rebass';
import styled from 'lib/emotion-styled';
import css from '@styled-system/css';

const IntroBannerHeading = styled(Text)(props =>
  css({
    variant: 'text.introBannerH1'
  })
);

const Container = styled(Flex)(props =>
  css({
    '> :first-child': { mb: 6 },
    '> :nth-child(2)': { mb: 6 }
  })
);

const Description = styled(Text)(props =>
  css({ variant: 'text.introBannerDescription' })
);

const IntroBanner = () => (
  <Container flexDirection="column">
    <IntroBannerHeading as="h1">
      Evolving & incentivising collaboration across boundaries
    </IntroBannerHeading>
    <Description as="h2">
      Create projects, collaborate, and get paid for doing great work in any
      domain.
    </Description>
    <Button variant="secondary">Explore bounties</Button>
  </Container>
);

export default IntroBanner;
