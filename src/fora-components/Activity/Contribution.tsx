/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Flex, Text, Link, Box } from "@theme-ui/components";
import Divider from "fora-components/Divider";
import AvatarImage from "fora-components/AvatarImage";
import MetaData from "./MetaData";

const ActivityItem = props => <Box {...props} sx={{ px: ["2", "0"] }} />;

const ContentContainer = props => <Flex {...props} sx={{ mb: "3" }} />;

const Description = props => (
  <Box
    {...props}
    sx={{
      color: "brandGray.400",
      "> *": {
        display: "inline",
        fontSize: "base",
        lineHeight: "standard"
      }
    }}
  />
);

const AuthorName = props => (
  <Text {...props} sx={{ fontWeight: "medium", color: "black" }}></Text>
);

export interface IContributionProps {
  activityType: "contribution";
  avatarSrc: string;
  authorName: string | undefined;
  authorAddress: string;
  bountyTitle: string;
  ethContributionAmount: number;
  timestamp: string;
  communityName: string;
  communityId: string;
  href?: string;
}

const Contribution: React.FC<IContributionProps> = ({
  avatarSrc,
  authorName,
  authorAddress,
  ethContributionAmount,
  timestamp,
  communityName,
  communityId,
  bountyTitle,
  href
}) => (
  <ActivityItem>
    <ContentContainer>
      <AvatarImage address={authorAddress} src={avatarSrc} />
      <Flex sx={{ flexDirection: "column", ml: "3" }}>
        <Description>
          <AuthorName>{authorName || "--"}</AuthorName>
          <Text>{` just contributed `}</Text>
          <Text
            sx={{ fontWeight: "medium", color: "black" }}
          >{`${ethContributionAmount} ETH`}</Text>
          <Text>{` to  `}</Text>
          <Link href={href} sx={{ fontWeight: "medium" }}>
            {bountyTitle}
          </Link>
        </Description>
        <MetaData
          timestamp={timestamp}
          communityName={communityName}
          communityId={communityId}
        />
      </Flex>
    </ContentContainer>
    <Divider />
  </ActivityItem>
);

export default Contribution;
