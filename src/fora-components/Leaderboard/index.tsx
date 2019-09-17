import React from "react";
import { Flex } from "rebass";
import styled from "lib/emotion-styled";
import css from "@styled-system/css";
import LeaderboardEntry from "./LeaderboardEntry";
import mockLeaderboardData from "./mock-leaderboard-data";

const Container = styled(Flex)(() =>
  css({
    flexDirection: "column",
    "> div:last-child > div:last-child": {
      display: "none"
    }
  })
);

interface IProps {
  data: typeof mockLeaderboardData;
}

const Leaderboard: React.FC<IProps> = ({ data }) => (
  <Container>
    {data.map((entry, index) => (
      <LeaderboardEntry {...entry} position={index + 1}></LeaderboardEntry>
    ))}
  </Container>
);

export default Leaderboard;
