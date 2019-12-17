/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "fora-components/Tabs";
import ActivityFeed from 'fora-components/ActivityFeed/View';

interface IProps {  }

const Content: React.FunctionComponent<IProps> = (props) => (
  <Tabs size='lg'>
    <TabList>
      <Tab>Activity</Tab>
      <Tab>Bounties</Tab>
      <Tab>Submissions</Tab>
    </TabList>

    <TabPanels>
      <TabPanel>
        <ActivityFeed />
      </TabPanel>
      <TabPanel>
        Bounties
      </TabPanel>
      <TabPanel>
        Submissions
      </TabPanel>
    </TabPanels>
  </Tabs>

)

export default Content