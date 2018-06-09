import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.scss';
import { withRouter } from 'react-router-dom';

import { Button, Circle } from 'components';
import BeeLogo from '../../styles/logo.js';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBell from '@fortawesome/fontawesome-pro-light/faBell';

const Header = props => {
  const {
    history,
    notification,
    profilePic = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
    loggedIn = false
  } = props;

  const onCreateClick = () => {
    history.push('/create');
  };

  const onSignInClick = () => {
    history.push('/signin');
  };

  return (
    <div className={`${styles.header}`}>
      <div className={`${styles.iconArea}`}>
        <BeeLogo />
      </div>
      {loggedIn ? (
        <div className={`${styles.buttonArea}`}>
          <Button style="primary" onClick={onCreateClick}>
            Create New Bounty
          </Button>
          <FontAwesomeIcon icon={faBell} />
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
