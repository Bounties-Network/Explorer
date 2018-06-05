import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.scss';

import { Button, Circle } from 'components';
import BeeLogo from '../../styles/logo.js';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBell from '@fortawesome/fontawesome-pro-light/faBell';

const Header = props => {
  const {
    notification,
    profilePic = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
  } = props;

  return (
    <div className={`${styles.header}`}>
      <div className={`${styles.iconArea}`}>
        <BeeLogo />
      </div>
      <div className={`${styles.buttonArea}`}>
        <Button style="primary">Create New Bounty</Button>
        <FontAwesomeIcon icon={faBell} />
        <Circle type="image" size="mini" input={profilePic} />
      </div>
    </div>
  );
};

Header.propTypes = {
  notification: PropTypes.bool
};

Header.defaultProps = {
  notification: false
};

export default Header;
