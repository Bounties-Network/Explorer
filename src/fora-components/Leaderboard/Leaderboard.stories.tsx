import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import Leaderboard from ".";
import LeaderboardEntry from "./LeaderboardEntry";
import mockLeaderboardData from "./mock-leaderboard-data";

addDecorator(centered);

storiesOf("Leaderboard", module)
  .add("Feed", () => <Leaderboard data={mockLeaderboardData} />)
  .add("Entry", () => (
    <LeaderboardEntry {...mockLeaderboardData[0]} position={1} />
  ));
