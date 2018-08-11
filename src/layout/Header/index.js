import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actions as loginActions } from 'containers/Login/reducer';
import { actions as authActions } from 'public-modules/Authentication';
import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import { ipfsToHttp } from 'utils/helpers';
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
  const { user, network, showLogin, logout, history } = props;

  const loginStatus = !!user;

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
            onClick={() => {
              history.push('/createBounty');
            }}
            className={styles.button}
          >
            Create New Bounty
          </Button>
          <div className={styles.notification}>
            <NotificationDropdown />
          </div>
          <div className={styles.profile}>
            <Dropdown position="left" className={styles.profileDropdown}>
              <DropdownTrigger>
                <Avatar
                  size="small"
                  img={
                    user.isProfileImageDirty
                      ? ipfsToHttp(
                          user.profileDirectoryHash,
                          user.profileFileName
                        )
                      : user.profile_image
                  }
                  hash={user.public_address}
                />
              </DropdownTrigger>
              <DropdownContent>
                <MenuItem
                  icon={['fal', 'cog']}
                  onClick={() => {
                    history.push('/settings');
                  }}
                >
                  Account Settings
                </MenuItem>
                <MenuItem icon={['fal', 'sign-out']} onClick={logout}>
                  Sign Out
                </MenuItem>
              </DropdownContent>
            </Dropdown>
          </div>
        </div>
      ) : (
        <div className={`${styles.buttonArea}`}>
          <Button
            type="primary"
            onClick={() => showLogin(true)}
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

const mapStateToProps = state => ({
  network: state.client.network,
  user: getCurrentUserSelector(state)
});

const Header = compose(
  withRouter,
  connect(
    mapStateToProps,
    { showLogin: loginActions.showLogin, logout: authActions.logout }
  )
)(HeaderComponent);

export default Header;
