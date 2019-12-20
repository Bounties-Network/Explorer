/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "fora-components/Tabs";
import ActivityFeed from 'fora-components/ActivityFeed/View';
import Bounties from './Bounties';
import { Text } from '@theme-ui/components'
import Submissions from './Submissions';

interface IProps { address: string }

const Content: React.FunctionComponent<IProps> = ({ address }) => (
  <Tabs size='lg'>
    <TabList>
      <Tab>
        <Text>Activity</Text>
      </Tab>
      <Tab>
        <Text>Bounties</Text>
      </Tab>
      <Tab>
        <Text>Submissions</Text>
      </Tab>
    </TabList>

    <TabPanels>
      <TabPanel>
        <ActivityFeed />
      </TabPanel>
      <TabPanel>
        <Bounties address={address}></Bounties>
      </TabPanel>
      <TabPanel>
        <Submissions address={address}></Submissions>
      </TabPanel>
    </TabPanels>
  </Tabs>

)

export default Content