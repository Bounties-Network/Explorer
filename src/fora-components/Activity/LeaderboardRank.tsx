/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Flex, Text, Link, Box } from "@theme-ui/components";
import Divider from "fora-components/Divider";
import AvatarImage from "fora-components/AvatarImage";
import numbro from "numbro";
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

export interface ILeaderboardRankProps {
  activityType: "leaderboardRank";
  avatarSrc: string;
  authorName: string | undefined;
  authorAddress: string;
  rankChangeAmount: number;
  timestamp: string;
  communityName: string;
  communityId: string;
  href: string;
}

const LeaderboardRank: React.FC<ILeaderboardRankProps> = ({
  avatarSrc,
  authorName,
  authorAddress,
  rankChangeAmount,
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
          <AuthorName>{authorName || "--"}</AuthorName>
          <Text>{` moved up the ranks to `}</Text>
          <Text sx={{ fontWeight: "medium", color: "black" }}>
            {numbro(rankChangeAmount).format({
              output: "ordinal"
            })}
          </Text>
          <Text>{` on the  `}</Text>
          <Link
            href={href}
            sx={{ fontWeight: "medium" }}
          >{`leaderboard!`}</Link>
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

export default LeaderboardRank;
