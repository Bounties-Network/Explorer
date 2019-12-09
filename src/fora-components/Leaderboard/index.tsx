import React from "react";
import { Flex } from "@theme-ui/components";
import Button from 'fora-components/Button'
import styled from "lib/emotion-styled";
import css from "@styled-system/css";
import LeaderboardEntry from "./LeaderboardEntry";
import mockLeaderboardData from "./mock-leaderboard-data";

const Container = styled(Flex)(() =>
  css({
    flexDirection: "column",
    "> :last-child": { mt: 6 }
  })
);

interface IProps {
  data: typeof mockLeaderboardData;
  loadMore: any;
}

const Leaderboard: React.FC<IProps> = ({ data, loadMore }) => (
  <Container>
    {data.map((entry, index) => (
      <LeaderboardEntry {...entry} position={index + 1}></LeaderboardEntry>
    ))}
    <Button
      onClick={loadMore}
      variant="secondary.affirmative"
      fullWidth={true}
    >
      Load More
    </Button>
  </Container>
);

export default Leaderboard;
