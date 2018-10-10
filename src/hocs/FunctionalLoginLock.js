import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { curry } from 'lodash';
import siteConfig from 'public-modules/config';
import FunctionalLoginLock from 'containers/Login/FunctionalLoginLock';
import { actions as authActions } from 'public-modules/Authentication';
import { actions } from 'containers/Login/reducer';
import {
  addressSelector,
  walletLockedSelector,
  hasWalletSelector
} from 'public-modules/Client/selectors';
import {
  getCurrentUserSelector,
  loginStateSelector,
  logoutStateSelector
} from 'public-modules/Authentication/selectors';
import { rootLoginSelector } from 'containers/Login/selectors';

function FunctionalLoginLockHOC(config, WrappedComponent) {
  class FunctionalLoginLockComponent extends React.Component {
    state = {
      onConfirm: () => {}
    };

    initiateLoginProtection = onConfirm => {
      const { showFunctionalLock } = this.props;

      this.setState(
        {
          onConfirm
        },
        () => showFunctionalLock(true)
      );
    };

    componentDidUpdate(prevProps) {
      if (!prevProps.callbackCanTrigger && this.props.callbackCanTrigger) {
        this.props.showFunctionalLock(false);
        this.state.onConfirm();
      }
    }

    componentWillUnmount() {
      this.props.showFunctionalLock(false);
    }

    render() {
      const {
        hasWallet,
        walletLocked,
        currentAddress,
        previousAddress,
        addressMismatch,
        isLoggedIn,
        userImg,
        visible,
        signingIn,
        error,
        loggingOut,
        showFunctionalLock,
        login,
        logout,
        resetLoginState,
        resetLogoutState,
        isCorrectNetwork,
        ...rest
      } = this.props;

      return (
        <div className={config.wrapperClassName}>
          <WrappedComponent
            {...rest}
            initiateLoginProtection={this.initiateLoginProtection}
          />
          <FunctionalLoginLock
            visible={visible}
            hide={() => showFunctionalLock(false)}
            hasWallet={hasWallet}
            walletLocked={walletLocked}
            currentAddress={currentAddress}
            previousAddress={previousAddress}
            addressMismatch={addressMismatch}
            isLoggedIn={isLoggedIn}
            isCorrectNetwork={isCorrectNetwork}
            userImg={userImg}
            signingIn={signingIn}
            error={error}
            loggingOut={loggingOut}
            login={login}
            logout={logout}
            resetLoginState={resetLoginState}
            resetLogoutState={resetLogoutState}
          />
        </div>
      );
    }
  }

  const mapStateToProps = state => {
    const rootLogin = rootLoginSelector(state);
    const user = getCurrentUserSelector(state);
    const loginState = loginStateSelector(state);
    const logoutState = logoutStateSelector(state);
    const hasWallet = hasWalletSelector(state);
    const walletLocked = walletLockedSelector(state);
    const currentAddress = addressSelector(state);
    const addressMismatch =
      user && addressSelector(state).toLowerCase() !== user.public_address;
    const visible = rootLogin.functionalVisible;
    const isLoggedIn = !!user;
    const network = state.client.network;
    const isCorrectNetwork = siteConfig.requiredNetwork
      ? network === siteConfig.requiredNetwork
      : network === 'mainNet' || network === 'rinkeby';
    const callbackCanTrigger =
      hasWallet &&
      !walletLocked &&
      isLoggedIn &&
      !addressMismatch &&
      isCorrectNetwork &&
      visible;

    return {
      hasWallet,
      walletLocked,
      currentAddress,
      addressMismatch,
      isLoggedIn,
      visible,
      callbackCanTrigger,
      network,
      isCorrectNetwork,
      previousAddress: user && user.public_address,
      userImg: user && user.small_profile_image_url,
      signingIn: loginState.loading,
      error: loginState.error || logoutState.error,
      loggingOut: logoutState.loading
    };
  };

  return compose(
    connect(
      mapStateToProps,
      {
        showFunctionalLock: actions.showFunctionalLock,
        login: authActions.login,
        logout: authActions.logout,
        resetLoginState: authActions.resetLoginState,
        resetLogoutState: authActions.resetLogoutState
      }
    )
  )(FunctionalLoginLockComponent);
}

export default curry(FunctionalLoginLockHOC);
