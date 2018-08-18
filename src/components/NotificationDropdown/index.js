import React from 'react';
import styles from './NotificationDropdown.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Dropdown, CardNotification } from 'components';

const { DropdownTrigger, DropdownContent } = Dropdown;

const renderNotifications = data => {
  if (!data) {
    return null;
  }
  return data.map(elem => {
    return <CardNotification notificationData={elem} />;
  });
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
          {renderNotifications(notifications)}
        </div>
      </DropdownContent>
    </Dropdown>
  );
};

NotificationDropdown.propTypes = {};

NotificationDropdown.defaultProps = {};

export default NotificationDropdown;
