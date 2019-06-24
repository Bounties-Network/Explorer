import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import styles from './RequireLoginComponent.module.scss';
import { ZeroState, Card } from 'components';
import { actions as loginActions } from 'containers/Login/reducer';
import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import LoginLock from 'containers/Login/LoginLock';
import intl from 'react-intl-universal';

function RequireLoginComponentHOC(WrappedComponent) {
  class RequireLoginComponent extends Component {
    static propTypes = {};

    render() {
      const { isLoggedIn, showLogin } = this.props;

      if (!isLoggedIn) {
        return (
          <div className={styles.notLoggedInWrapper}>
            <div className={`${styles.notLoggedIn}`}>
              <Card className={styles.notLoggedInCard}>
                <Card.Body>
                  <ZeroState
                    title={intl.get('hocs.require_login.zero_state.title')}
                    action
                    actionText={intl.get(
                      'hocs.require_login.zero_state.action'
                    )}
                    iconColor="blue"
                    onActionClick={() => showLogin(true)}
                    icon="lock"
                  >
                    <div>
                      <ZeroState.BodyText>
                        {intl.get('hocs.require_login.zero_state.body')}
                      </ZeroState.BodyText>
                    </div>
                    <div className={styles.subText}>
                      <ZeroState.BodyText>
                        {intl.get('hocs.require_login.zero_state.subtext')}
                      </ZeroState.BodyText>
                      <ZeroState.BodyText>
                        <Link to="/explorer">
                          {intl.get('hocs.require_login.explorer')}
                        </Link>
                      </ZeroState.BodyText>
                      <ZeroState.BodyText>.</ZeroState.BodyText>
                    </div>
                  </ZeroState>
                </Card.Body>
              </Card>
            </div>
          </div>
        );
      }

      return (
        <div className={styles.loginWrapper}>
          <LoginLock />
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  }

  RequireLoginComponent.proptypes = {
    isLoggedIn: PropTypes.bool,
    showLogin: PropTypes.func
  };

  const mapStateToProps = state => ({
    isLoggedIn: !!getCurrentUserSelector(state)
  });
  return compose(
    withRouter,
    connect(
      mapStateToProps,
      { showLogin: loginActions.showLogin }
    )
  )(RequireLoginComponent);
}

export default RequireLoginComponentHOC;
