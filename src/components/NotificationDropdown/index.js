import React from 'react';
import PropTypes from 'prop-types';
import styles from './NotificationDropdown.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBell from '@fortawesome/fontawesome-pro-light/faBell';

const NotificationDropdown = props => {
  return <FontAwesomeIcon icon={faBell} />;
};

NotificationDropdown.propTypes = {};

NotificationDropdown.defaultProps = {};

export default NotificationDropdown;
