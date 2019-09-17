import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "./index";
import ActivityFeed from "fora-components/ActivityFeed/View";
import mockLeaderboardData from "fora-components/Leaderboard/mock-leaderboard-data";
import Leaderboard from "fora-components/Leaderboard";

addDecorator(centered);

storiesOf("Tabs", module).add("Mi Fora", () => (
  <Tabs>
    <TabList>
      <Tab>Activity</Tab>
      <Tab>Leaderboard</Tab>
      <Tab>Members</Tab>
    </TabList>

    <TabPanels>
      <TabPanel>
        <ActivityFeed />
      </TabPanel>
      <TabPanel>
        <Leaderboard data={mockLeaderboardData}></Leaderboard>
      </TabPanel>
      <TabPanel>
        <p>three!</p>
      </TabPanel>
    </TabPanels>
  </Tabs>
));
