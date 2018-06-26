import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.scss';
import { withRouter } from 'react-router-dom';

import { Button, Circle, NotificationDropdown } from 'components';
import BeeLogo from '../../styles/logo.js';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBell from '@fortawesome/fontawesome-pro-light/faBell';

const Header = props => {
  const {
    history,
    notifications,
    profilePic = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
    loginStatus = false
  } = props;

  const onCreateClick = () => {
    history.push('/create');
  };

  const onSignInClick = () => {
    history.push('/dashboard');
  };

  return (
    <div className={`${styles.header}`}>
      <div className={`${styles.iconArea}`}>
        <BeeLogo />
      </div>
      {loginStatus ? (
        <div className={`${styles.buttonArea}`}>
          <Button style="primary" onClick={onCreateClick}>
            Create New Bounty
          </Button>
          <NotificationDropdown notifications={notifications} />
          <Circle type="image" size="mini" input={profilePic} />
        </div>
      ) : (
        <div className={`${styles.signInButton}`}>
          <Button style="primary" onClick={onSignInClick}>
            Sign In
          </Button>
        </div>
      )}
    </div>
  );
};

Header.propTypes = {
  notification: PropTypes.bool
};

Header.defaultProps = {
  notification: false
};

export default withRouter(Header);
