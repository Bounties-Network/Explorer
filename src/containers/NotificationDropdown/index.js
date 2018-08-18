import React from 'react';
import PropTypes from 'prop-types';
import styles from './NotificationDropdown.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { map } from 'lodash';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { notificationsListSelector } from 'public-modules/Notification/selectors';
import { NotificationItem } from 'explorer-components';
import { Dropdown, CardNotification, ListGroup } from 'components';

const { DropdownTrigger, DropdownContent } = Dropdown;

const renderNotifications = notifications => {
  return map(notification => {
    const {
      notification_name,
      bounty_title,
      created,
      from_user,
      link
    } = notification;

    return (
      <ListGroup.ListItem hover>
        <Link to={link} className={styles.link}>
          <NotificationItem
            type={notification_name}
            title={bounty_title}
            createdAt={created}
            userAddress={from_user && from_user.public_address}
            profileImg={from_user && from_user.profile_image}
          />
        </Link>
      </ListGroup.ListItem>
    );
  }, notifications);
};

const NotificationDropdown = props => {
  const { notifications } = props;

  return (
    <Dropdown position="left" className={styles.customDropdown}>
      <DropdownTrigger>
        <FontAwesomeIcon icon={['fal', 'bell']} />
      </DropdownTrigger>
      <DropdownContent>
        <div className={styles.notificationBox}>
          <ListGroup>{renderNotifications(notifications)}</ListGroup>
        </div>
      </DropdownContent>
    </Dropdown>
  );
};

NotificationDropdown.propTypes = {};

NotificationDropdown.defaultProps = {};

const mapStateToProps = state => {
  return {
    notifications: notificationsListSelector(state)
  };
};

export default compose(connect(mapStateToProps))(NotificationDropdown);
