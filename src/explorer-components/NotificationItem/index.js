import React from 'react';
import PropTypes from 'prop-types';
import styles from './NotificationItem.module.scss';
import { notification_template } from 'utils/constants';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { ListGroup, Card, Text } from 'components';
import { LinkedAvatar } from 'explorer-components';
import moment from 'moment';

const NotificationItem = props => {
  const { createdAt, title, type } = props;
  const { message, icon } = notification_template[type];
  const formattedTime = moment(createdAt, 'YYYY-MM-DD').fromNow();

  return (
    <div className={`row ${styles.container}`}>
      <div className="col-xs-1">
        <div className={styles.alignLeft}>
          <FontAwesomeIcon icon={icon} className={styles.iconStyles} />
        </div>
      </div>
      <div className="col-xs-8">
        <div className={base.alignLeft}>
          <Text color="black" inline>
            {message}
          </Text>
          <Text color="black" weight="fontWeight-medium" inline>
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

NotificationItem.propTypes = {
  title: PropTypes.string
};

NotificationItem.defaultProps = {};

export default NotificationItem;
