import React from 'react';
import PropTypes from 'prop-types';
import styles from './LoginLock.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Modal } from 'components';
import {
  WalletRequired,
  UnlockWallet,
  AddressMismatch,
  ErrorModal
} from './components';
import { actions } from './reducer';
import { actions as authActions } from 'public-modules/Authentication';
import {
  getCurrentUserSelector,
  logoutStateSelector
} from 'public-modules/Authentication/selectors';
import {
  addressSelector,
  walletLockedSelector,
  hasWalletSelector
} from 'public-modules/Client/selectors';

const LoginLockComponent = props => {
  const {
    hasWallet,
    walletLocked,
    walletAddress,
    userAddress,
    img,
    logout,
    loggingOut,
    resetLogoutState,
    error
  } = props;

  if (walletLocked || !walletAddress) {
    return <UnlockWallet visible={true} pageLevel closable={false} />;
  }

  if (error) {
    return <ErrorModal visible={true} onClose={resetLogoutState} />;
  }

  if (
    userAddress &&
    userAddress.toLowerCase() !== walletAddress.toLowerCase()
  ) {
    return (
      <AddressMismatch
        closable={false}
        visible={true}
        currentAddress={walletAddress}
        previousAddress={userAddress}
        img={img}
        logout={logout}
        loggingOut={loggingOut}
      />
    );
  }

  return null;
};

const mapStateToProps = state => {
  const user = getCurrentUserSelector(state);
  const logoutState = logoutStateSelector(state);

  return {
    hasWallet: hasWalletSelector(state),
    walletLocked: walletLockedSelector(state),
    walletAddress: addressSelector(state),
    userAddress: user && user.public_address,
    img: user && user.img,
    error: logoutState.error,
    loggingOut: logoutState.loading
  };
};

const LoginLock = compose(
  connect(
    mapStateToProps,
    {
      logout: authActions.logout,
      resetLogoutState: authActions.resetLogoutState
    }
  )
)(LoginLockComponent);

LoginLock.propTypes = {
  hasWallet: PropTypes.bool,
  walletLocked: PropTypes.bool,
  walletAddress: PropTypes.string,
  userAddress: PropTypes.string,
  img: PropTypes.string,
  logout: PropTypes.func,
  loggingOut: PropTypes.bool,
  resetLogoutState: PropTypes.func,
  error: PropTypes.string
};

export default LoginLock;
