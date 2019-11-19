import React from "react";
import { css } from "@styled-system/css";
import { Flex, Text, Link } from "rebass";
import emotionStyled from "lib/emotion-styled";
import GoldLogo from "assets/gold-logo";
import Divider from "fora-components/Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faReddit,
  faLinkedin,
  faSlack
} from "@fortawesome/free-brands-svg-icons";

const Container = emotionStyled(Flex)(() =>
  css({
    backgroundColor: "seaGlass.400",
    width: "100vw",
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
    { label: "Learn More" },
    {
      label: "Getting started",
      href: "/getting-started"
    },
    {
      label: "FAQ",
      href: "/faq"
    }
  ],

  [
    { label: "Company" },
    {
      label: "Our team",
      href: "/team"
    },
    {
      label: "Blog",
      href: "/blog"
    },
    {
      label: "Careers",
      href: "/careers"
    }
  ],

  [
    { label: "Technology" },
    {
      label: "Bounties Protocol",
      href: "/protocol"
    }
  ],

  [
    { label: "Legal" },
    {
      label: "Privacy Policy",
      href: "/privacy-policy"
    },
    {
      label: "Terms of service",
      href: "/terms-of-service"
    },
    {
      label: "Security",
      href: "/security"
    }
  ],

  [
    { label: "Contact & Support" },
    {
      label: "contact@bounties.network",
      href: "mailto:contact@bounties.network"
    }
  ]
];

const LinkColumnContainer = emotionStyled(Flex)(() =>
  css({ "> :not(:last-child)": { mb: [1, 2, 3] } })
);

const LinkColumn: React.FC<ILinkColumn[]> = links => (
  <LinkColumnContainer flexDirection="column">
    {links.map(({ href, label }) =>
      typeof href === "string" ? (
        <Link key={href} href={href}>
          <Text variant="body" color="white">
            {label}
          </Text>
        </Link>
      ) : (
        <Text key={label} variant="bodyStrong" color="seaGlass.200">
          {label}
        </Text>
      )
    )}
  </LinkColumnContainer>
);

const SiteContent = emotionStyled(Flex)(() =>
  css({ width: "100%", "> :last-child": { ml: "auto" } })
);
const LinkColumnsContainer = emotionStyled(Flex)(() =>
  css({
    "> :not(:last-child)": { mr: [2, 3, 6, 6] }
  })
);
const SocialContent = emotionStyled(Flex)(() =>
  css({ "> :first-child": { mr: "auto" } })
);
const SocialLinksContainer = emotionStyled(Flex)(() =>
  css({ "> :not(:last-child)": { mr: 4 } })
);
const SocialIcon = emotionStyled(FontAwesomeIcon)(() =>
  css({ color: "amber.200" })
);

const SocialLinks = () => (
  <SocialLinksContainer>
    <Link href={`https://twitter.com/home?status=`}>
      <SocialIcon icon={faTwitter} />
    </Link>
    <Link href={`https://www.facebook.com/sharer/sharer.php?u=`}>
      <SocialIcon icon={faFacebook} />
    </Link>
    <Link href={`http://reddit.com/submit?url=`}>
      <SocialIcon icon={faReddit} />
    </Link>
    <Link href={`https://www.linkedin.com/shareArticle?mini=true&url=`}>
      <SocialIcon icon={faLinkedin} />
    </Link>
    <Link href={`https://www.slack.com/`}>
      <SocialIcon icon={faSlack} />
    </Link>
  </SocialLinksContainer>
);

interface IProps {}
const Footer: React.FC<IProps> = ({}) => {
  return (
    <Container flexDirection="column">
      <SiteContent>
        <GoldLogo />
        <LinkColumnsContainer>
          {footerLinks.map(LinkColumn)}
        </LinkColumnsContainer>
      </SiteContent>
      <Divider
        mt={[3, 4, 5, 6]}
        mb={[3, 3, 5, 5]}
        backgroundColor="seaGlass.300"
      />
      <SocialContent>
        <SocialLinks />
        <Text color="seaGlass.200" variant="body">
          ©2019 fora, Inc. All rights reserved.
        </Text>
      </SocialContent>
    </Container>
  );
};

export default Footer;
