import React from 'react';
import baseStyles from '../BaseStyles.module.scss';
import styles from './ProfileTabs.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Tabs, Text } from 'components';
import { map } from 'lodash';

// TODO: handle too many skills to display

const ProfileTabs = props => {
  return (
    <Tabs onSelect={() => {}}>
      <Tabs.Tab tabColor="blue" eventKey={1}>
        Bounties created
      </Tabs.Tab>
      <Tabs.Tab tabColor="green" eventKey={2}>
        Submissions
      </Tabs.Tab>
    </Tabs>
  );
};

export default ProfileTabs;
