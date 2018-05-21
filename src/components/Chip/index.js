import React from 'react';
import PropTypes from 'prop-types';
import styles from './Chip.module.scss';

import { Text } from 'components';

const Chip = props => {
  const { style, onClick } = props;

  return (
    <span className={`${styles.chip} ${styles[style]}`} onClick={onClick}>
      <Text>{props.children}</Text>
    </span>
  );
};

Chip.propTypes = {
  style: PropTypes.oneOf(['round', 'rectangle']),
  onClick: PropTypes.func
};

Chip.defaultProps = {
  style: 'round',
  onClick: () => {}
};

export default Chip;
