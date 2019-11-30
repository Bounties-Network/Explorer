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

export interface ISubmissionProps {
  activityType: "submission";
  avatarSrc: string | undefined;
  authorName: string | undefined;
  authorAddress: string;
  bountyTitle: string;
  timestamp: string;
  communityName: string;
  communityId: string;
  href: string;
}

const Submission: React.FC<ISubmissionProps> = ({
  avatarSrc,
  authorName,
  authorAddress,
  bountyTitle,
  timestamp,
  communityName,
  communityId,
  href
}) => (
  <ActivityItem>
    <ContentContainer>
      <AvatarImage address={authorAddress} src={avatarSrc} />
      <Flex sx={{ flexDirection: "column", ml: "3" }}>
        <Description>
          <Text sx={{ color: "black" }}>{authorName || "--"}</Text>
          <Text mx="1">{`submitted to`}</Text>
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

export default Submission;
