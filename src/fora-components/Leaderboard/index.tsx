import React from "react";
import { Flex, Button } from "rebass";
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
  loadMore: () => void;
}

const Leaderboard: React.FC<IProps> = ({ data, loadMore }) => (
  <Container>
    {data.map((entry, index) => (
      <LeaderboardEntry {...entry} position={index + 1}></LeaderboardEntry>
    ))}
    <Button
      onClick={loadMore}
      variant="secondary"
      color="seaGlass.300"
      width={"100%"}
    >
      Load More
    </Button>
  </Container>
);

export default Leaderboard;
