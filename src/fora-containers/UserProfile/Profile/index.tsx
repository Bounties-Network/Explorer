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

interface IProps {}

const SkillPill = ({ category }) => (
  <Pill variant="tag.explorer">
    <Text color={"brandGray.400"} variant="body">
      {category}
    </Text>
  </Pill>
);

const Profile: React.FunctionComponent<IProps> = props => (
  <Flex sx={{ flexDirection: "column", mt: -75 }}>
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
    <Pill size="large" variant="status.affirmative">{shortenAddress("0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67")}</Pill>
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

    <Flex sx={{ flexDirection: "column" }}>
      <Text variant="bodyStrong" sx={{ fontSize: "h5" }}>
        Skills
      </Text>
      <Flex sx={{ flexWrap: 1, "> *:not(:last-of-type)": { mr: 1 } }}>
        <SkillPill category="React"></SkillPill>
        <SkillPill category="CSS"></SkillPill>
        <SkillPill category="HTML"></SkillPill>
        <SkillPill category="Translations"></SkillPill>
        <SkillPill category="JavaScript"></SkillPill>
      </Flex>
    </Flex>

    <Flex sx={{ flexDirection: "column" }}>
      <Text variant="bodyStrong" sx={{ fontSize: "h5" }}>
        Elsewhere
      </Text>
      <Flex sx={{ flexDirection: "column", "> *:not(:last-of-type)": { mb: 2 } }}>
        <Flex sx={{ alignItems: "center" }}>
          <FontAwesomeIcon sx={{ color: "brandGray.400" }} icon={faGlobe}></FontAwesomeIcon>
          <Link href="https://www.google.com" variant="text.link">
            firstNameLastName.com
          </Link>
        </Flex>
        <Flex sx={{ alignItems: "center" }}>
          <FontAwesomeIcon sx={{ color: "brandGray.400" }} icon={faGlobe}></FontAwesomeIcon>
          <Link href="https://www.google.com" variant="text.link">
            @twitterUsername
          </Link>
        </Flex>
        <Flex sx={{ alignItems: "center" }}>
          <FontAwesomeIcon sx={{ color: "brandGray.400" }} icon={faGlobe}></FontAwesomeIcon>
          <Link href="https://www.google.com" variant="text.link">
            @githubusername
          </Link>
        </Flex>
      </Flex>
    </Flex>
  </Flex>
);

export default Profile;
