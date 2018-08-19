import React from 'react';
import {
  WalletRequired,
  UnlockWallet,
  AddressMismatch,
  ErrorModal,
  SignIn,
  SigningIn
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
    error
  } = props;

  if (!visible) {
    return null;
  }

  if (error) {
    return (
      <ErrorModal
        visible
        onClose={() => {
          resetLogoutState();
          resetLoginState();
          hide();
        }}
      />
    );
  }

  if (!hasWallet) {
    return <WalletRequired visible closable onClose={hide} />;
  }

  if (walletLocked) {
    return <UnlockWallet visible closable onClose={hide} />;
  }

  if (addressMismatch) {
    return (
      <AddressMismatch
        closable
        visible
        onClose={hide}
        currentAddress={currentAddress}
        previousAddress={previousAddress}
        img={userImg}
        logout={logout}
        loggingOut={loggingOut}
      />
    );
  }

  if (signingIn) {
    return <SigningIn visible />;
  }

  if (!isLoggedIn) {
    return <SignIn visible onClose={hide} signIn={login} />;
  }

  return null;
};

export default FunctionalLoginLock;
