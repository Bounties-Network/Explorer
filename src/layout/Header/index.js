import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './Header.module.scss';

import {
  Button,
  Avatar,
  NotificationDropdown,
  Dropdown,
  Network
} from 'components';
import BeeLogo from '../../styles/logo.js';

const { MenuItem, DropdownTrigger, DropdownContent } = Dropdown;

const HeaderComponent = props => {
  const {
    history,
    notifications,
    profilePic,
    userAddress,
    loginStatus,
    network
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
      {network !== 'unknown' ? (
        <Network network={network} className={styles.network} />
      ) : null}
      {loginStatus ? (
        <div className={`${styles.buttonArea}`}>
          <Button
            type="primary"
            onClick={onCreateClick}
            className={styles.button}
          >
            Create New Bounty
          </Button>
          <div className={styles.notification}>
            <NotificationDropdown notifications={notifications} />
          </div>
          <div className={styles.profile}>
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
        </div>
      ) : (
        <div className={`${styles.buttonArea}`}>
          <Button
            type="primary"
            onClick={onSignInClick}
            className={styles.button}
          >
            Sign In
          </Button>
        </div>
      )}
    </div>
  );
};

HeaderComponent.propTypes = {
  loginStatus: PropTypes.bool,
  network: PropTypes.oneOf(['rinkeby', 'mainnet', 'unknown'])
};

HeaderComponent.defaultProps = {
  loginStatus: false
};

const mapStateToProps = state => ({ network: state.client.network });

const Header = compose(connect(mapStateToProps))(HeaderComponent);

export default Header;
