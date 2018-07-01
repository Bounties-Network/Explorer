import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.scss';
import { withRouter } from 'react-router-dom';

import { Button, Avatar, NotificationDropdown, Dropdown } from 'components';
import BeeLogo from '../../styles/logo.js';

const { MenuItem, DropdownTrigger, DropdownContent } = Dropdown;

const Header = props => {
  const {
    history,
    notifications,
    profilePic,
    userAddress,
    loginStatus
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
          <Button type="primary" onClick={onCreateClick}>
            Create New Bounty
          </Button>
          <NotificationDropdown notifications={notifications} />
          <Dropdown position="left" className={styles.profileDropdown}>
            <DropdownTrigger>
              <Avatar size="small" img={profilePic} hash={userAddress} />
            </DropdownTrigger>
            <DropdownContent>
              <MenuItem icon={['fal', 'cog']}>Account Settings</MenuItem>
              <MenuItem icon={['fal', 'sign-out']}>Sign Out</MenuItem>
            </DropdownContent>
          </Dropdown>
        </div>
      ) : (
        <div className={`${styles.signInButton}`}>
          <Button type="primary" onClick={onSignInClick}>
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
  notification: false,
  loginStatus: false
};

export default withRouter(Header);
