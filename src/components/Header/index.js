import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.scss';

import { i } from '../../fontawesome-all.js';

import { Button, Circle } from 'components';
import BeeLogo from '../../styles/logo.js';

const Header = props => {
  const { notification, profilePic } = props;

  return (
    <div className={`${styles.header}`}>
      <div className={`${styles.iconArea}`}>
        <BeeLogo />
      </div>
      <div className={`${styles.buttonArea}`}>
        <Button style="create">Create New Bounty</Button>
        <i className="fal fa-bell" style={{ fontSize: '20px' }} />
        <Circle type="img" size="mini" input={profilePic} />
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

export default Header;
