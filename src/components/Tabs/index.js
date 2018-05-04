import React from 'react';
import PropTypes from 'prop-types';
import styles from './Tabs.module.scss';

import { Tab } from 'components';

const Tabs = props => {
  const { className, tabs } = props;

  const renderTabs = tabs => {
    return tabs.map(elem => {
      return (
        <Tab
          notificationAmount={elem.notificationAmount}
          notificationColor={elem.notificationColor}
          active={elem.active}
        >
          {elem.title}
        </Tab>
      );
    });
  };

  return <div className={`${styles.tabs}`}>{renderTabs(tabs)}</div>;
};

Tabs.propTypes = {
  tabs: PropTypes.array
};

Tabs.defaultProps = {
  tabs: []
};

export default Tabs;

// Tabs Example:
// tabs: [ {
//   title: 'Active',
//   notificationAmount: 3,
//   notificationColor: 'blue',
// }, {
//   title: 'Pending Submissions',
//   badge: 2,
//   badgeStyle: 'yellow',
// } ]
