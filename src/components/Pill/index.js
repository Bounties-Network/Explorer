import React from 'react';
import PropTypes from 'prop-types';
import styles from './Pill.module.scss';

import { Text } from 'components';

const Chip = props => {
  const { type, onClick, close, onCloseClick, children, color } = props;

  return (
    <span
      className={`${styles.chip} ${styles[type]} ${styles[color]} ${
        styles[close ? 'close' : '']
      }`}
      onClick={onClick}
    >
      <Text>{props.children}</Text>
      {close && (
        <div className={`${styles.closeButton}`} onClick={onCloseClick}>
          <Text color="blue" type="BodySmall">
            x
          </Text>
        </div>
      )}
    </span>
  );
};

Chip.propTypes = {
  type: PropTypes.oneOf(['round', 'rectangle']),
  onClick: PropTypes.func,
  close: PropTypes.bool,
  onCloseClick: PropTypes.func
};

Chip.defaultProps = {
  type: 'round',
  close: false,
  color: ''
};

export default Chip;
