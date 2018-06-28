import React from 'react';
import PropTypes from 'prop-types';
import { FetchComponent, LoadComponent } from 'hocs';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions, sagas, selectors } from 'public-modules';
import styles from './SignInPage.module.scss';

import { Text, Button, Dialogue, TextInput } from 'components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSignIn from '@fortawesome/fontawesome-pro-light/faSignIn';
import faWallet from '@fortawesome/fontawesome-pro-light/faWallet';

const { authStateSelector, rootAuthSelector } = selectors;

class SignInPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displaySignInModal: false,
      displayWalletConfirmationModal: false,
      signIntoMetamaskTextColor: 'grey'
    };

    this.renderSignInDialogue = this.renderSignInDialogue.bind(this);
    this.renderWalletConfirmationDialogue = this.renderWalletConfirmationDialogue.bind(
      this
    );
    this.closeAllModals = this.closeAllModals.bind(this);
    this.openSignInDialogue = this.openSignInDialogue.bind(this);
    this.openRenderWalletConfirmationDialogue = this.openRenderWalletConfirmationDialogue.bind(
      this
    );
    this.openWalletSignIn = this.openWalletSignIn.bind(this);
    this.updateText = this.updateText.bind(this);
  }

  renderSignInDialogue() {
    return (
      <Dialogue
        size="large"
        onCloseButtonClick={() => this.closeAllModals()}
        buttons={[
          <Button style="secondary" onClick={this.closeAllModals}>
            Cancel
          </Button>,
          <Button
            style="primary"
            onClick={this.openRenderWalletConfirmationDialogue}
          >
            Continue
          </Button>
        ]}
        header={
          <div className={`${styles.signInHeaderText}`}>
            <Text style="H3">Sign in to</Text>
            <Text
              style="H3"
              link
              color="purple"
              className={`${styles.link}`}
              noUnderline
            >
              bounties.network
            </Text>
          </div>
        }
      >
        <div className={`${styles.modalBody}`}>
          <Text
            style="BodySmall"
            color="grey"
            className={`${styles.modalText}`}
          >
            Please provide a name so that other individuals on the network can
            identify you more easily.
          </Text>
          <Text
            style="BodySmall"
            color="grey"
            className={`${styles.modalText}`}
          >
            Your email is required in order to receive important information
            about your bounties and submissions.
          </Text>
          <div className={`${styles.modalInputArea}`}>
            <div className={`${styles.modalInput}`}>
              <Text style="BodySmall" color="grey">
                Your Name (Optional)
              </Text>
              <TextInput onChange={e => this.updateText('name', e)} />
            </div>
            <div className={`${styles.modalInput}`}>
              <Text style="BodySmall" color="grey">
                Your Contact Email
              </Text>
              <TextInput onChange={e => this.updateText('email', e)} />
            </div>
          </div>
        </div>
      </Dialogue>
    );
  }

  renderWalletConfirmationDialogue() {
    return (
      <Dialogue
        size="large"
        onCloseButtonClick={() => this.closeAllModals()}
        buttons={[
          <Button style="primary" onClick={this.openWalletSignIn}>
            OK
          </Button>
        ]}
        header={
          <FontAwesomeIcon
            icon={faWallet}
            className={`${styles.modalHeaderIcon} fa-4x`}
          />
        }
      >
        <div
          className={`${styles.modalBody} ${styles.walletConfirmationDialogue}`}
        >
          <Text style="H4" color="black" className={`${styles.modalText}`}>
            Your wallet will take it from here!
          </Text>
          <Text
            style="BodySmall"
            color="grey"
            className={`${styles.modalText}`}
          >
            After clicking "ok", a wallet dialogue will prompt you to verify
            your unique address. Once you sign in, you will be signed in to the
            network.
          </Text>
        </div>
      </Dialogue>
    );
  }

  closeAllModals() {
    this.setState({
      displaySignInModal: false,
      displayWalletConfirmationModal: false
    });
  }

  openSignInDialogue() {
    let web3 = window.web3;

    if (web3 && web3.eth && web3.eth.accounts) {
      let address = web3.eth.accounts[0];

      if (address !== undefined) {
        this.setState({
          displaySignInModal: true,
          displayWalletConfirmationModal: false
        });
      } else {
        this.setState({ signIntoMetamaskTextColor: 'red' });
      }
    }
  }

  openRenderWalletConfirmationDialogue() {
    let { loadNonce } = this.props;
    let web3 = window.web3;

    if (web3 && web3.eth && web3.eth.accounts) {
      let address = web3.eth.accounts[0];
      loadNonce(address);
    }

    this.setState({
      displaySignInModal: false,
      displayWalletConfirmationModal: true
    });
  }

  openWalletSignIn() {
    let { login, nonce } = this.props;
    let web3 = window.web3;

    if (web3 && web3.eth && web3.eth.accounts) {
      let address = web3.eth.accounts[0];
      let signature = '';
      web3.personal.sign(
        web3.fromUtf8('Hi there! Your special nonce: ' + nonce),
        web3.eth.accounts[0],
        (err, resp) => {
          signature = resp;
          login(address, signature);
        }
      );
    }
  }

  updateText(props, e) {
    let tempState = Object.assign({}, this.state);
    tempState[props] = e;
    this.setState(tempState, () => this.state);
  }

  render() {
    const { loading, error, user } = this.props;
    const {
      displaySignInModal,
      displayWalletConfirmationModal,
      signIntoMetamaskTextColor
    } = this.state;

    return (
      <div className={`${styles.signInPage}`}>
        <div className={`${styles.test} container-fluid`}>
          <div className="row middle-xs center-xs">
            <div className="col-xs-8">
              {displaySignInModal && this.renderSignInDialogue()}
              {displayWalletConfirmationModal &&
                this.renderWalletConfirmationDialogue()}
              <div className={`${styles.signInPageBody}`}>
                <div className="row center-xs middle-xs">
                  <div className="col-xs-6">
                    <FontAwesomeIcon
                      icon={faSignIn}
                      className={`fa-6x ${styles.signInIcon}`}
                    />
                    <div className={`${styles.signInHeaderText}`}>
                      <Text style="H2">Sign in to use</Text>
                      <Text
                        style="H2"
                        link
                        color="purple"
                        className={`${styles.link}`}
                        noUnderline
                      >
                        bounties.network
                      </Text>
                    </div>
                    <div className={`${styles.descriptionText}`}>
                      <Text style="CardHeading" color="grey">
                        In order for you to use certain features of the network
                        like creating and fulfilling bounties, commenting, or
                        viewing your network stats, please sign into Metamask
                        and then press sign in.
                      </Text>
                    </div>
                    <div className={`${styles.instructionText}`}>
                      <Text style="CardHeading" color="grey">
                        If you don't wish to sign in but wish to explore, feel
                        free to check out some bounties using the
                      </Text>
                      <Text
                        style="CardHeading"
                        link
                        className={`${styles.link}`}
                      >
                        explorer.
                      </Text>
                    </div>
                    <Button
                      className={`${styles.signInButton}`}
                      onClick={this.openSignInDialogue}
                    >
                      Sign In
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, router) => {
  let auth = rootAuthSelector(state);

  return {
    user: auth.user,
    nonce: auth.nonce,
    ...authStateSelector(state)
  };
};

SignInPage.propTypes = {
  load: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.bool
};

const check = compose(
  FetchComponent(sagas.fetch),
  connect(
    mapStateToProps,
    { load: actions.loadBounties, ...actions }
  ),
  LoadComponent('')
)(SignInPage);

export default check;
