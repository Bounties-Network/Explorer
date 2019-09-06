import React from 'react';
import { Link, Text, Flex, Button } from 'rebass';
import styled from 'lib/emotion-styled';
import css from '@styled-system/css';
import Illustration from '../../assets/intro-banner-illustration';

const IntroBannerHeading = styled(Text)<{ isAndSign?: boolean }>(props =>
  css({
    variant: 'text.introBannerH1',
    display: 'inline-block',
    color: props.isAndSign
      ? props.theme.colors.rose200
      : props.theme.colors.seaGlass400
    // BOOM I lik how I did dis
  })
);

const Container = styled(Flex)(() =>
  css({
    flexDirection: 'column',
    '> :first-child': { mb: 6 },
    '> :nth-child(2)': { mb: 6 },
    '> :nth-child(3)': { mb: 5 }
  })
);

const Description = styled(Text)(() =>
  css({ variant: 'text.introBannerDescription' })
);

const CTAContainer = styled(Flex)(() =>
  css({
    alignItems: 'center',
    '> :first-child': { mr: 3 },
    '> :nth-child(2)': { mr: 3 }
  })
);

const Or = styled(Text)(() => css({ variant: 'text.body' }));

const WhatIsABountyLink = styled(Link)(() =>
  css({ variant: 'text.link', ml: 3 })
);

const IntroBanner = () => (
  <Container>
    <IntroBannerHeading as="h1">
      Evolving{' '}
      <IntroBannerHeading as="h1" isAndSign={true}>
        &
      </IntroBannerHeading>{' '}
      incentivising collaboration across boundaries
    </IntroBannerHeading>
    <Flex>
      <Container>
        <Description as="h2">
          Create projects, collaborate, and get paid for doing great work in any
          domain.
        </Description>
        <CTAContainer>
          <Button width={153} variant="secondary">
            Explore bounties
          </Button>
          <Or>or</Or>
          <Button width={94} variant="tertiary">
            Sign up
          </Button>
        </CTAContainer>
        <WhatIsABountyLink href={'/what-is-a-bounty'}>
          What is a bounty?
        </WhatIsABountyLink>
      </Container>
      <Illustration />
    </Flex>
  </Container>
);

export default IntroBanner;
