import React from 'react';
import { Flex, Box } from 'rebass';
import IntroBanner from 'fora-components/IntroBanner';
import PlatformStatistics from 'fora-components/PlatformStatistics';
import TopCommunities from 'fora-components/TopCommunities';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from 'fora-components/Tabs';
import ActivityFeed from 'fora-components/ActivityFeed/View';
import css from '@styled-system/css';
import emotionStyled from 'lib/emotion-styled';
import Navbar from 'fora-components/Navbar';

const communities = [
  {
    id: 'google',
    src:
      'https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo',
    name: 'f • code',
    memberCount: 1274
  },
  {
    id: 'google',
    src:
      'https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo',
    name: 'yowza',
    memberCount: 1274
  },
  {
    id: 'google',
    src:
      'https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo',
    name: 'save mi',
    memberCount: 1274
  }
];

const Container = emotionStyled(Flex)(() =>
  css({ '> :first-child': { mb: 7 }, '> :not(:first-child)': { px: 7 } })
);
const Statistics = emotionStyled(Flex)(() =>
  css({ mr: 7, '> :first-child': { mb: 6 } })
);

const LandingPage = () => (
  <Container flexDirection="column">
    <Navbar isLoggedIn={true} />
    <IntroBanner />
    <Flex>
      <Statistics flexDirection="column">
        <PlatformStatistics
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
            <Tab>Members</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <ActivityFeed />
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  </Container>
);

export default LandingPage;
