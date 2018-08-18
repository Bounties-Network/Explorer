import React from 'react';
import PropTypes from 'prop-types';
import base from '../BaseStyles.module.scss';
import styles from './ActivityItem.module.scss';
import { notification_template } from './constants';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Text } from 'components';
import moment from 'moment';

const ActivityItem = props => {
  const { createdAt, title, type } = props;
  const { message, icon } = notification_template[type];
  const formattedTime = moment(createdAt, 'YYYY-MM-DD').fromNow();

  return (
    <div className={`row ${styles.container}`}>
      <div className="col-xs-1">
        <div className={base.alignLeft}>
          <FontAwesomeIcon icon={icon} className={styles.iconStyles} />
        </div>
      </div>
      <div className="col-xs-8">
        <div className={base.alignLeft}>
          <Text inline>{message}</Text>
          <Text weight="fontWeight-medium" inline>
            {' ' + title}
          </Text>
        </div>
      </div>
      <div className="col-xs-3">
        <Text color="defaultGrey" typeScale="Small">
          {formattedTime}
        </Text>
      </div>
    </div>
  );
};

ActivityItem.propTypes = {
  title: PropTypes.string
};

ActivityItem.defaultProps = {};

export default ActivityItem;
