import React from 'react';
import { css } from '@styled-system/css';
import { Flex, Text, Link } from 'rebass';
import emotionStyled from 'lib/emotion-styled';
import MustardLogo from 'assets/mustard-logo';

const Container = emotionStyled(Flex)(() =>
  css({
    backgroundColor: 'seaGlass400',
    width: '100vw',
    py: [3, 4, 5, 6],
    px: [2, 3, 4, 6]
  })
);

interface ILinkColumn {
  label: string;
  href?: string;
}
const footerLinks: Array<ILinkColumn[]> = [
  [
    { label: 'Learn More' },
    {
      label: 'Getting started',
      href: '/getting-started'
    },
    {
      label: 'FAQ',
      href: '/faq'
    }
  ],

  [
    { label: 'Company' },
    {
      label: 'Our team',
      href: '/team'
    },
    {
      label: 'Blog',
      href: '/blog'
    },
    {
      label: 'Careers',
      href: '/careers'
    }
  ],

  [
    { label: 'Technology' },
    {
      label: 'Bounties Protocol',
      href: '/protocol'
    }
  ],

  [
    { label: 'Legal' },
    {
      label: 'Privacy Policy',
      href: '/privacy-policy'
    },
    {
      label: 'Terms of service',
      href: '/terms-of-service'
    },
    {
      label: 'Security',
      href: '/security'
    }
  ],

  [
    { label: 'Contact & Support' },
    {
      label: 'contact@bounties.network',
      href: 'mailto:contact@bounties.network'
    }
  ]
];

const LinkColumnContainer = emotionStyled(Flex)(() =>
  css({ '> :not(:last-child)': { mb: [1, 2, 3] } })
);

const LinkColumn: React.FC<ILinkColumn[]> = links => (
  <LinkColumnContainer flexDirection="column">
    {links.map(
      ({ href, label }) =>
        typeof href === 'string' ? (
          <Link href={href}>
            <Text variant="body" color="white">
              {label}
            </Text>
          </Link>
        ) : (
          <Text variant="bodyStrong" color="seaGlass200">
            {label}
          </Text>
        )
    )}
  </LinkColumnContainer>
);

const SiteContent = emotionStyled(Flex)(() =>
  css({ width: '100%', '> :last-child': { ml: 'auto' } })
);
const LinkColumnsContainer = emotionStyled(Flex)(() =>
  css({
    '> :not(:last-child)': { mr: [2, 3, 6] }
  })
);

interface IProps {}
const Footer: React.FC<IProps> = ({}) => {
  return (
    <Container>
      <SiteContent>
        <MustardLogo />
        <LinkColumnsContainer>
          {footerLinks.map(LinkColumn)}
        </LinkColumnsContainer>
      </SiteContent>
    </Container>
  );
};

export default Footer;
