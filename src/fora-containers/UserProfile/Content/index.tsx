/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "fora-components/Tabs";
import ActivityFeed from 'fora-components/ActivityFeed/View';
import Bounties from './Bounties';
import { Text } from '@theme-ui/components'

interface IProps {  }

const Content: React.FunctionComponent<IProps> = (props) => (
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
        <Bounties></Bounties>
      </TabPanel>
      <TabPanel>
        Submissions
      </TabPanel>
    </TabPanels>
  </Tabs>

)

export default Content