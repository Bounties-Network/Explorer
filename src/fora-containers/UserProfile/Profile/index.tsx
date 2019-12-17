/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Flex, Text, Link } from "@theme-ui/components";
import gql from "graphql-tag";
import LoadingIcon from "assets/loading";
import AvatarImage from "fora-components/AvatarImage";
import Pill from "fora-components/Pill";
import { shortenAddress } from "utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faComments, faGlobe } from "@fortawesome/pro-regular-svg-icons";
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";

interface IProps {}

const SkillPill = ({ category }) => (
  <Pill shape="square" variant="tag.explorer">
    <Text color={"brandGray.400"} variant="body">
      {category}
    </Text>
  </Pill>
);

const ElsewhereLink = ({ icon, href, linkText }) => (
  <Flex sx={{ alignItems: "center", '> svg:first-of-type': { mr: 1 } }}>
    <FontAwesomeIcon sx={{ color: "brandGray.400" }} icon={icon}></FontAwesomeIcon>
    <Link href={href} variant="text.link">
      {linkText}
    </Link>
  </Flex>
);

const profileChildSpacing = {
  1: 5,
  2: 3,
  3: 4,
  4: 4,
  5: 1,
  6: 4,
  7: 4
};
const nthChild = (x: string) => `> *:nth-child(${x})`;
const profileChildSpacingStyles = Object.keys(profileChildSpacing).reduce((current, next) => {
  if (profileChildSpacing[next]) {
    const lol = {
      [nthChild(next)]: { mb: profileChildSpacing[next] }
    };
    return Object.assign(current, lol);
  }
  return current;
}, {});

const profileContainerStyle = {
  flexDirection: "column",
  mt: -75,
  ...profileChildSpacingStyles
};

const Profile: React.FunctionComponent<IProps> = props => (
  <Flex sx={profileContainerStyle}>
    <AvatarImage
      size="large"
      src={
        "https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo"
      }
      address="0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67"
      linkToProfile={false}
    />
    <Text variant="headingSerif" sx={{ fontSize: "h2" }}>
      Simona Pop
    </Text>
    <Pill size="large" variant="status.affirmative">
      {shortenAddress("0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67")}
    </Pill>
    <Text variant="body">
      Imagination is everything. Co-Founder & CMO of Bounties Network and fora at ConsenSys. Queen bee of the hive. You
      test me I sting you.
    </Text>

    <Flex sx={{ "> svg:first-of-type": { mr: 2 }, alignItems: "center" }}>
      <FontAwesomeIcon sx={{ color: "brandGray.400" }} icon={faBriefcase}></FontAwesomeIcon>
      <Text variant="body" color="brandGray.400">
        Bounties Network
      </Text>
    </Flex>
    <Flex sx={{ "> svg:first-of-type": { mr: 2 }, alignItems: "center" }}>
      <FontAwesomeIcon sx={{ color: "brandGray.400" }} icon={faComments}></FontAwesomeIcon>
      <Text variant="body" color="brandGray.400">
        English, Romanian
      </Text>
    </Flex>

    <Flex sx={{ flexDirection: "column", "> div:first-of-type": { mb: 2 } }}>
      <Text variant="bodyStrong" sx={{ fontSize: "h5" }}>
        Skills
      </Text>
      <Flex sx={{ flexWrap: "wrap", minWidth: "250px", m: -1, "> *": { m: 1 } }}>
        <SkillPill category="React"></SkillPill>
        <SkillPill category="CSS"></SkillPill>
        <SkillPill category="HTML"></SkillPill>
        <SkillPill category="Translations"></SkillPill>
        <SkillPill category="JavaScript"></SkillPill>
      </Flex>
    </Flex>

    <Flex sx={{ flexDirection: "column", "> div:first-of-type": { mb: 2 } }}>
      <Text variant="bodyStrong" sx={{ fontSize: "h5" }}>
        Elsewhere
      </Text>
      <Flex sx={{ flexDirection: "column", "> *:not(:last-of-type)": { mb: 2 } }}>
        <ElsewhereLink icon={faGlobe} href={"www.google.co.uk"} linkText="firstNameLastName.com"></ElsewhereLink>
        <ElsewhereLink icon={faTwitter} href={"www.google.co.uk"} linkText="@twitterUsername"></ElsewhereLink>
        <ElsewhereLink icon={faGithub} href={"www.google.co.uk"} linkText="@githubUsername"></ElsewhereLink>
      </Flex>
    </Flex>
  </Flex>
);

export default Profile;
