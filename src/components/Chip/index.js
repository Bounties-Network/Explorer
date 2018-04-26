import React from 'react';
import PropTypes from 'prop-types';
import styles from './Chip.module.scss';

const Chip = props => {
  return <span className={`${styles.chip}`}>{props.children}</span>;
};

export default Chip;
