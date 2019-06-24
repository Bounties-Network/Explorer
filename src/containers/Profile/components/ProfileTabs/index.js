import React from 'react';
import styles from './ProfileTabs.module.scss';
import { Tabs } from 'components';
import intl from 'react-intl-universal';

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
        {intl.get('sections.profile.tabs.bounties')}
      </Tabs.Tab>
      <Tabs.Tab
        tabColor="lightGrey"
        tabCount={fulfilledCount}
        eventKey={'fulfilled'}
      >
        {intl.get('sections.profile.tabs.submissions')}
      </Tabs.Tab>
    </Tabs>
  );
};

export default ProfileTabs;
