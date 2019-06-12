import React from 'react';
import {
  WalletRequired,
  UnlockWallet,
  AddressMismatch,
  ErrorModal,
  SignIn,
  SigningIn,
  SigningInToPortis,
  WrongNetwork
} from './components';

const FunctionalLoginLock = props => {
  const {
    visible,
    hide,
    choosePortisProvider,
    signingInToPortis,
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
    showSigningInToPortis: false,
    showSignIn: false,
    showWrongNetwork: false
  };

  if (visible) {
    if (error) {
      config.showError = true;
    } else if (!hasWallet) {
      config.showWalletRequired = true;
    } else if (signingInToPortis) {
      config.showSigningInToPortis = true;
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
        visible={config.showWrongNetwork}
        network={network}
        onClose={hide}
        closable
      />
      <WalletRequired
        visible={config.showWalletRequired}
        closable
        onClose={hide}
        choosePortisProvider={choosePortisProvider}
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
      <SigningInToPortis visible={config.showSigningInToPortis} />
      <SignIn visible={config.showSignIn} onClose={hide} signIn={login} />
    </React.Fragment>
  );
};

export default FunctionalLoginLock;
