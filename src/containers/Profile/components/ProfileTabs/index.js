import React from 'react';
import styles from './ProfileTabs.module.scss';
import { Tabs } from 'components';

// TODO: handle too many skills to display

const ProfileTabs = props => {
  const { currentTab, setActiveTab, issuedCount, fulfilledCount } = props;

  return (
    <Tabs
      className={styles.centerTabs}
      currentKey={currentTab}
      defaultActiveKey={currentTab}
      onSelect={setActiveTab}
    >
      <Tabs.Tab tabColor="lightGrey" tabCount={issuedCount} eventKey={'issued'}>
        Bounties created
      </Tabs.Tab>
      <Tabs.Tab
        tabColor="lightGrey"
        tabCount={fulfilledCount}
        eventKey={'fulfilled'}
      >
        Submissions
      </Tabs.Tab>
    </Tabs>
  );
};

export default ProfileTabs;
