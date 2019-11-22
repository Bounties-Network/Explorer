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
      "> *": {
        display: "inline",
        fontSize: "sm",
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
}

const Submission: React.FC<ISubmissionProps> = ({
  avatarSrc,
  authorName,
  authorAddress,
  bountyTitle,
  timestamp,
  communityName,
  communityId
}) => (
  <ActivityItem>
    <ContentContainer>
      <AvatarImage address={authorAddress} src={avatarSrc} />
      <Flex sx={{ flexDirection: "column", ml: "3" }}>
        <Description>
          <Text sx={{ fontWeight: "medium" }}>{authorName || "--"}</Text>
          <Text color="gray.400" mx="1">{`submitted to`}</Text>
          <Link sx={{ fontWeight: "medium" }}>{bountyTitle}</Link>
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
