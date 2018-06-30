import React from 'react';
import PropTypes from 'prop-types';
import styles from './Chip.module.scss';

import { Text } from 'components';

const Chip = props => {
  const { style, onClick, close, onCloseClick, children, color } = props;

  return (
    <span
      className={`${styles.chip} ${styles[style]} ${styles[color]} ${
        styles[close ? 'close' : '']
      }`}
      onClick={onClick}
    >
      <Text>{props.children}</Text>
      {close && (
        <div className={`${styles.closeButton}`} onClick={onCloseClick}>
          <Text color="blue" style="BodySmall">
            x
          </Text>
        </div>
      )}
    </span>
  );
};

Chip.propTypes = {
  style: PropTypes.oneOf(['round', 'rectangle']),
  onClick: PropTypes.func,
  close: PropTypes.bool,
  onCloseClick: PropTypes.func
};

Chip.defaultProps = {
  style: 'round',
  close: false,
  color: ''
};

export default Chip;
