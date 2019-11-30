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

export interface ICommentPreviewProps {
  activityType: "commentPreview";
  avatarSrc: string | undefined;
  authorName: string | undefined;
  authorAddress: string;
  bountyTitle: string;
  timestamp: string;
  communityName: string;
  communityId: string;
}
const CommentPreview: React.FC<ICommentPreviewProps> = ({
  avatarSrc,
  authorName,
  bountyTitle,
  timestamp,
  communityName,
  communityId,
  authorAddress
}) => (
  <ActivityItem>
    <ContentContainer>
      <AvatarImage
        address={authorAddress}
        src={avatarSrc}
        resourceType="user"
      />
      <Flex sx={{ flexDirection: "column", ml: "3" }}>
        <Description>
          <Text variant="bodyStrong" sx={{ color: "black" }}>
            {authorName || "--"}
          </Text>
          <Text>{` commented on `}</Text>
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

export default CommentPreview;
