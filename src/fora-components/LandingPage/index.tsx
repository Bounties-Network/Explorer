import React from "react";
import { Flex, Box } from "rebass";
import IntroBanner from "fora-components/IntroBanner";
import PlatformStatisticsCard from "fora-components/Card/PlatformStatisticsCard";
import TopCommunities from "fora-components/TopCommunities";
import { Tabs, Tab, TabList, TabPanels, TabPanel } from "fora-components/Tabs";
import ActivityFeed from "fora-components/ActivityFeed/View";
import css from "@styled-system/css";
import emotionStyled from "lib/emotion-styled";
import Navbar from "fora-components/Navbar";
import Footer from "fora-components/Footer";
import mockLeaderboardData from "fora-components/Leaderboard/mock-leaderboard-data";
import Leaderboard from "fora-components/Leaderboard";
import SegmentedControl from "fora-components/SegmentedControl";
import Pill from "fora-components/Pill";
import Members from "fora-components/Members/View";
import { mockMembersData } from "fora-components/Members/mock-members-data";

const communities = [
  {
    id: "google",
    src:
      "https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo",
    name: "f • code",
    memberCount: 1274
  },
  {
    id: "google",
    src:
      "https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo",
    name: "yowza",
    memberCount: 1274
  },
  {
    id: "google",
    src:
      "https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo",
    name: "save mi",
    memberCount: 1274
  }
];

const Container = emotionStyled(Flex)(() => css({}));
const Statistics = emotionStyled(Flex)(() =>
  css({ mr: 7, "> :first-child": { mb: 6 } })
);
const Content = emotionStyled(Flex)(() => css({ py: 7, "> *": { px: 7 } }));
const LeaderboardContentContainer = emotionStyled(Flex)(() =>
  css({ "> :first-child": { ml: "auto", mb: 4 } })
);

// Super ignore the layout :))))))))
const LandingPage = () => (
  <Container flexDirection="column">
    <Navbar isLoggedIn={true} />
    <Content flexDirection="column">
      <IntroBanner />
      <Flex>
        <Statistics flexDirection="column">
          <PlatformStatisticsCard
            resourceType={'platform'}
            activePlatformBounties={999}
            platformBountiesIssued={9999}
            totalBountyIssuedValueInUSD={9999999}
          />
          <TopCommunities communities={communities} />
        </Statistics>
        <Box>
          <Tabs>
            <TabList>
              <Tab>Activity</Tab>
              <Tab>Leaderboard</Tab>
              <Tab>
                Members{" "}
                <Pill
                  css={css({ ml: 2 })}
                  variant={"pill.tabNotificationCount"}
                >
                  {20}
                </Pill>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ActivityFeed />
              </TabPanel>
              <TabPanel>
                <LeaderboardContentContainer flexDirection="column">
                  <SegmentedControl
                    firstOption={"Issuers"}
                    firstOptionHandleClick={() => {}}
                    secondOption={"Fulfillers"}
                    secondOptionHandleClick={() => {}}
                  ></SegmentedControl>
                  <Leaderboard
                    loadMore={() => {}}
                    data={mockLeaderboardData}
                  ></Leaderboard>
                </LeaderboardContentContainer>
              </TabPanel>
              <TabPanel>
                <Members loadMore={() => {}} data={mockMembersData}></Members>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </Content>
    <Footer />
  </Container>
);

export default LandingPage;
