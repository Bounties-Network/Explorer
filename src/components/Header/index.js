import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.scss';
import { withRouter } from 'react-router-dom';

import { Button, Circle } from 'components';
import BeeLogo from '../../styles/logo.js';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBell from '@fortawesome/fontawesome-pro-light/faBell';

const Header = props => {
  const {
    history,
    notification,
    profilePic = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
    loginStatus = false
  } = props;

  const onCreateClick = () => {
    history.push('/create');
  };

  const onSignInClick = () => {
    history.push('/dashboard');
  };

  return (
    <div className={`${styles.header}`}>
      <div className="row middle-xs">
        <div className="col-xs-1">
          <div className={`${styles.iconArea}`}>
            <BeeLogo />
          </div>
        </div>
        <div className="col-xs-2">
          <div className="row middle-xs center-xs">Network</div>
        </div>
        {loginStatus ? (
          <div className="col-xs-offset-5 col-xs-4">
            <div className="row center-xs middle-xs">
              <div className="col-xs-5">
                <Button style="primary" onClick={onCreateClick}>
                  Create New Bounty
                </Button>
              </div>
              <div className="col-xs-1">
                <FontAwesomeIcon icon={faBell} />
              </div>
              <div className="col-xs-2">
                <Circle type="image" size="mini" input={profilePic} />
              </div>
            </div>
          </div>
        ) : (
          <div className="col-xs-offset-7 col-xs-2">
            <Button style="primary" onClick={onSignInClick}>
              Sign In
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

Header.propTypes = {
  notification: PropTypes.bool
};

Header.defaultProps = {
  notification: false
};

export default withRouter(Header);
