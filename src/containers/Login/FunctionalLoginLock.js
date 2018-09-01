import React from 'react';
import {
  WalletRequired,
  UnlockWallet,
  AddressMismatch,
  ErrorModal,
  SignIn,
  SigningIn,
  WrongNetwork
} from './components';

const FunctionalLoginLock = props => {
  const {
    visible,
    hide,
    addressMismatch,
    currentAddress,
    previousAddress,
    userImg,
    hasWallet,
    walletLocked,
    isLoggedIn,
    signingIn,
    login,
    logout,
    resetLoginState,
    resetLogoutState,
    loggingOut,
    network,
    isCorrectNetwork,
    error
  } = props;

  const config = {
    showError: false,
    showWalletRequired: false,
    showUnlockWallet: false,
    showMismatch: false,
    showSigningIn: false,
    showSignIn: false,
    showWrongNetwork: false
  };

  if (visible) {
    if (error) {
      config.showError = true;
    } else if (!hasWallet) {
      config.showWalletRequired = true;
    } else if (walletLocked) {
      config.showUnlockWallet = true;
    } else if (!isCorrectNetwork) {
      config.showWrongNetwork = true;
    } else if (addressMismatch) {
      config.showMismatch = true;
    } else if (signingIn) {
      config.showSigningIn = true;
    } else if (!isLoggedIn) {
      config.showSignIn = true;
    }
  }

  return (
    <React.Fragment>
      <ErrorModal
        visible={config.showError}
        onClose={() => {
          resetLogoutState();
          resetLoginState();
          hide();
        }}
      />
      <WrongNetwork
        visible={config.showUnlockWallet}
        pageLevel
        network={network}
        closable
      />
      <WalletRequired
        visible={config.showWalletRequired}
        closable
        onClose={hide}
      />
      <UnlockWallet visible={config.showUnlockWallet} closable onClose={hide} />
      <AddressMismatch
        closable
        visible={config.showMismatch}
        onClose={hide}
        currentAddress={currentAddress}
        previousAddress={previousAddress}
        img={userImg}
        logout={logout}
        loggingOut={loggingOut}
      />
      <SigningIn visible={config.showSigningIn} />
      <SignIn visible={config.showSignIn} onClose={hide} signIn={login} />
    </React.Fragment>
  );
};

export default FunctionalLoginLock;
