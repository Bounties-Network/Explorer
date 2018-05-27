import React from 'react';
import PropTypes from 'prop-types';
import styles from './Tab.module.scss';

import { Text } from 'components';

const Tab = props => {
  const { notificationAmount, active } = props;

  const activeStatus = active ? 'active' : 'notActive';

  return (
    <div className={`${styles.tab} ${styles[activeStatus]}`}>
      <span className={`${styles.tabName}`}>
        <Text
          color={active ? 'black' : 'grey'}
          style={active ? 'H4' : 'CardHeading'}
        >
          {props.children}
        </Text>
      </span>
      {notificationAmount !== 0 && (
        <div className={`${styles.notification}`}>
          <Text style="BodySmall" color="darkGrey">
            {notificationAmount}
          </Text>
        </div>
      )}
    </div>
  );
};

Tab.propTypes = {
  notificationAmount: PropTypes.number,
  active: PropTypes.bool
};

Tab.defaultProps = {
  notificationAmount: 0,
  active: false
};

export default Tab;
