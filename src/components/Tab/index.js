import React from 'react';
import PropTypes from 'prop-types';
import styles from './Tab.module.scss';

import { Text } from 'components';

const Tab = props => {
  const { notificationAmount, notificationColor, active } = props;

  const activeStatus = active ? 'active' : 'notActive';

  return (
    <div className={`${styles.tab} ${activeStatus}`}>
      <span className={`${styles.tabName}`}>
        <Text>{props.children}</Text>
      </span>
      {notificationAmount !== 0 && (
        <span className={`${styles.notification} ${styles[notificationColor]}`}>
          <Text>{notificationAmount}</Text>
        </span>
      )}
    </div>
  );
};

Tab.propTypes = {
  notificationAmount: PropTypes.number,
  notificationColor: PropTypes.string,
  active: PropTypes.bool
};

Tab.defaultProps = {
  active: false
};

export default Tab;
