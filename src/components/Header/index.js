import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.scss';
import { withRouter } from 'react-router-dom';

import { Button, Circle, NotificationDropdown, Dropdown } from 'components';
import BeeLogo from '../../styles/logo.js';
import cog from '@fortawesome/fontawesome-pro-light/faCog';
import signout from '@fortawesome/fontawesome-pro-light/faSignOut';

const { MenuItem, DropdownTrigger, DropdownContent } = Dropdown;

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
          <Dropdown position="left" className={styles.profileDropdown}>
            <DropdownTrigger>
              <Circle type="image" size="mini" input={profilePic} />
            </DropdownTrigger>
            <DropdownContent>
              <MenuItem icon={cog}>Account Settings</MenuItem>
              <MenuItem icon={signout}>Sign Out</MenuItem>
            </DropdownContent>
          </Dropdown>
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
