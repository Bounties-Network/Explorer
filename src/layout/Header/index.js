import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { includes } from 'lodash';
import { actions as loginActions } from 'containers/Login/reducer';
import { hasWalletSelector } from 'public-modules/Client/selectors';
import { actions as authActions } from 'public-modules/Authentication';
import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import styles from './Header.module.scss';
import { Button, Avatar, Dropdown, Network, Text } from 'components';
import { NotificationDropdown } from 'containers';
import intl from 'react-intl-universal';

const BeeLogo = require(`../../styles/${process.env.APP_LOGO}.js`).default;
const { MenuItem, DropdownTrigger, DropdownContent } = Dropdown;

const HeaderComponent = props => {
  const {
    user,
    network,
    showLogin,
    logout,
    history,
    onShowNav,
    hasWallet
  } = props;

  const loginStatus = !!user;

  return (
    <div className={`${styles.header} page-header`}>
      <div className={`${styles.iconArea}`}>
        <Link to="/">
          <BeeLogo />
        </Link>
      </div>
      {hasWallet && <Network network={network} className={styles.network} />}
      <div className={styles.sideNavTrigger} onClick={onShowNav}>
        <Text typeScale="h3" color="blue">
          <FontAwesomeIcon icon={['far', 'bars']} />
        </Text>
      </div>
      {loginStatus ? (
        <div className={`${styles.buttonArea}`}>
          {history.location.pathname !== '/createBounty' &&
            !includes(['createBounty/draft'], history.location.pathname) && (
              <Button
                type="primary"
                onClick={() => {
                  history.push('/createBounty');
                }}
                className={styles.button}
              >
                <Text className={styles.mobileButtonText}>
                  <FontAwesomeIcon icon={['far', 'plus']} />
                </Text>
                <Text className={styles.desktopButtonText}>
                  {intl.get('actions.create_bounty')}
                </Text>
              </Button>
            )}
          <div className={styles.notification}>
            <NotificationDropdown />
          </div>
          <div className={styles.profile}>
            <Dropdown
              position="left"
              className={styles.profileDropdown}
              hideOnClick
            >
              <DropdownTrigger>
                <Avatar
                  size="small"
                  img={user.small_profile_image_url}
                  hash={user.public_address}
                />
              </DropdownTrigger>
              <DropdownContent className={styles.profileDropdown}>
                <MenuItem
                  key="profile"
                  icon={['fal', 'user-alt']}
                  onClick={() => {
                    history.push('/profile');
                  }}
                >
                  {intl.get('actions.profile')}
                </MenuItem>
                <MenuItem
                  key="settings"
                  icon={['fal', 'cog']}
                  onClick={() => {
                    history.push('/settings');
                  }}
                >
                  {intl.get('actions.settings`')}
                </MenuItem>
                <MenuItem
                  icon={['fal', 'sign-out']}
                  onClick={logout}
                  key="logout"
                >
                  {intl.get('actions.signout')}
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
            {intl.get('actions.signin')}
          </Button>
        </div>
      )}
    </div>
  );
};

HeaderComponent.propTypes = {
  loginStatus: PropTypes.bool,
  network: PropTypes.oneOf(['rinkeby', 'mainNet', 'unknown'])
};

HeaderComponent.defaultProps = {
  loginStatus: false
};

const mapStateToProps = state => ({
  hasWallet: hasWalletSelector(state),
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
