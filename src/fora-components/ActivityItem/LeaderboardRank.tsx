/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Text, Link } from "@theme-ui/components";
import numbro from "numbro";
import Description from "./Description";

export interface ILeaderboardRankProps {
  activityType: "leaderboardRank";
  authorName: string | undefined;
  rankChangeAmount: number;
  href: string;
}

const LeaderboardRank: React.FC<ILeaderboardRankProps> = ({
  authorName,
  rankChangeAmount,
  href
}) => (
  <Description authorName={authorName}>
    <Text>{` moved up the ranks to `}</Text>
    <Text variant="bodyStrong" sx={{ color: "black" }}>
      {numbro(rankChangeAmount).format({
        output: "ordinal"
      })}
    </Text>
    <Text>{` on the  `}</Text>
    <Link href={href} sx={{ fontWeight: "medium" }}>{`leaderboard!`}</Link>
  </Description>
);

export default LeaderboardRank;
