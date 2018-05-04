import React from 'react';
import PropTypes from 'prop-types';
import styles from './Chip.module.scss';

import { Text } from 'components';

const Chip = props => {
  return (
    <span className={`${styles.chip}`}>
      <Text>{props.children}</Text>
    </span>
  );
};

export default Chip;
