/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Flex, Text } from "rebass";
import { Tabs, TabList, TabPanels, TabPanel, Tab } from "fora-components/Tabs";
import Pill from "fora-components/Pill";

type YourBountiesProps = {
  drafts: any[]
  active: any[]
  activeNotificationCount: number
  draftsNotificationCount: number
}

const YourBountiesTab = React.forwardRef<any, { isSelected?: any, label: string, notificationCount: number }>((props, ref) => {
  return (
    <Tab ref={ref} isSelected={props.isSelected} {...props}>
      <Flex sx={{ '> :first-of-type': { mr: 2 } }}>
        <Text variant='body' color={props.isSelected ? 'seaGlass400' : 'gray400'}>
          {props.label}
        </Text>
        <Pill styles={{ bg: props.isSelected ? 'seaGlass400' : 'gray200', color: props.isSelected ? 'white' : 'gray500' }} variant='tabNotificationCount'>{props.notificationCount}</Pill>
      </Flex>
    </Tab>
  );
});


const YourBounties: React.FunctionComponent<YourBountiesProps> = props => (
  <Tabs sx={{ bg: 'white', boxSizing: 'border-box', borderRadius: 2, border: 'base' }}>
    <TabList>
      <YourBountiesTab label='Active' notificationCount={props.activeNotificationCount}></YourBountiesTab>
      <YourBountiesTab label='Drafts' notificationCount={props.draftsNotificationCount}></YourBountiesTab>
    </TabList>

    <TabPanels>
      <TabPanel>
        <Text variant='body'>One</Text>
      </TabPanel>
      <TabPanel>
        <Text variant='body'>Two</Text>
      </TabPanel>
    </TabPanels>
  </Tabs>
);

export default YourBounties;
