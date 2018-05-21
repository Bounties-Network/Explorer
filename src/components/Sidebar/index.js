import React from 'react';
import PropTypes from 'prop-types';
import styles from './Sidebar.module.scss';

import { i } from '../../fontawesome-all.js';

import BeeLogo from '../../styles/logo.js';

// import { Text } from 'components';

const Sidebar = props => {
  const { options, onClick } = props;

  const renderIcons = options => {
    return options.map(elem => {
      const activeStatus = elem.active ? 'active' : '';

      return (
        <div
          key={elem.icon}
          className={`${styles[activeStatus]} ${styles.iconTab}`}
          onClick={elem => onClick(elem)}
        >
          <i className={`fal fa-${elem.icon}`} />
        </div>
      );
    });
  };

  return (
    <div className={`${styles.sidebar}`}>
      <div className={`${styles.logoBar}`}>
        {/* TEMPORARY FAKE ICON*/}
        {/* <i className="fab fa-chrome" /> */}
        <BeeLogo />
      </div>
      <div className={`${styles.iconBar}`}>{renderIcons(options)}</div>
    </div>
  );
};

Sidebar.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  active: PropTypes.bool
};

Sidebar.defaultProps = {
  options: [],
  onChange: () => {},
  active: false
};

export default Sidebar;
