import React from 'react';
import baseStyles from '../BaseStyles.module.scss';
import styles from './ProfileTabs.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Tabs, Text } from 'components';
import { map } from 'lodash';

// TODO: handle too many skills to display

const ProfileTabs = props => {
  const { currentTab, setActiveTab } = props;

  return (
    <Tabs
      className={styles.centerTabs}
      currentKey={currentTab}
      defaultActiveKey={currentTab}
      onSelect={setActiveTab}
    >
      <Tabs.Tab tabColor="lightGrey" tabCount={10} eventKey={'issued'}>
        Bounties created
      </Tabs.Tab>
      <Tabs.Tab tabColor="lightGrey" tabCount={5} eventKey={'fulfilled'}>
        Submissions
      </Tabs.Tab>
    </Tabs>
  );
};

export default ProfileTabs;
