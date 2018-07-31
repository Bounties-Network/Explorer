import React from 'react';
import PropTypes from 'prop-types';
import styles from './Login.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Modal } from 'components';
import {
  WalletRequired,
  UnlockWallet,
  SignIn,
  SigningIn,
  AddressMismatch,
  ErrorModal,
  AddProfileDetails
} from './components';
import { rootLoginSelector } from './selectors';
import { actions } from './reducer';
import { actions as authActions } from 'public-modules/Authentication';
import {
  getCurrentUserSelector,
  loginStateSelector,
  logoutStateSelector
} from 'public-modules/Authentication/selectors';
import {
  addressSelector,
  walletLockedSelector,
  hasWalletSelector
} from 'public-modules/Client/selectors';

const LoginComponent = props => {
  const {
    visible,
    stage,
    form,
    showForm,
    hasWallet,
    walletLocked,
    walletAddress,
    userAddress,
    userName,
    userEmail,
    img,
    showLogin,
    login,
    logout,
    signingIn,
    loggingOut,
    resetLoginState,
    resetLogoutState,
    loginError,
    logoutError
  } = props;

  if (!hasWallet) {
    return (
      <WalletRequired visible={visible} onClose={() => showLogin(false)} />
    );
  }

  if (walletLocked) {
    return <UnlockWallet visible={visible} onClose={() => showLogin(false)} />;
  }

  if (loginError || logoutError) {
    return (
      <ErrorModal
        visible={visible}
        onClose={loginError ? resetLoginState : resetLogoutState}
      />
    );
  }

  if (signingIn) {
    return <SigningIn visible={visible} />;
  }

  if (stage === 'profile') {
    return (
      <AddProfileDetails
        visible={visible}
        onClose={() => showLogin(false)}
        form={form}
        showForm={() => showForm(true)}
      />
    );
  }

  return (
    <SignIn visible={visible} onClose={() => showLogin(false)} signIn={login} />
  );
};

const mapStateToProps = state => {
  const rootLogin = rootLoginSelector(state);
  const user = getCurrentUserSelector(state);
  const loginState = loginStateSelector(state);
  const logoutState = logoutStateSelector(state);

  return {
    hasWallet: hasWalletSelector(state),
    walletLocked: walletLockedSelector(state),
    walletAddress: addressSelector(state),
    userAddress: user && user.public_address,
    userName: user && user.name,
    userEmail: user && user.email,
    visible: rootLogin.visible,
    form: rootLogin.form,
    stage: rootLogin.stage,
    img: user && user.img,
    signingIn: loginState.loading,
    loginError: loginState.error,
    logoutError: logoutState.error,
    loggingOut: logoutState.loading
  };
};

const Login = compose(
  connect(
    mapStateToProps,
    {
      showLogin: actions.showLogin,
      showForm: actions.showForm,
      login: authActions.login,
      logout: authActions.logout,
      resetLoginState: authActions.resetLoginState,
      resetLogoutState: authActions.resetLogoutState
    }
  )
)(LoginComponent);

Login.propTypes = {
  visible: PropTypes.bool,
  stage: PropTypes.string,
  hasWallet: PropTypes.bool,
  walletLocked: PropTypes.bool,
  walletAddress: PropTypes.string,
  userAddress: PropTypes.string,
  img: PropTypes.string,
  showLogin: PropTypes.bool,
  login: PropTypes.func,
  logout: PropTypes.func,
  signingIn: PropTypes.bool,
  loggingOut: PropTypes.bool,
  resetLoginState: PropTypes.func,
  resetLogoutState: PropTypes.func,
  loginError: PropTypes.bool,
  logoutError: PropTypes.bool
};

export default Login;
