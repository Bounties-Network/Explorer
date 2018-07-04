import React from 'react';
import PropTypes from 'prop-types';
import styles from './Pill.module.scss';

import { Text } from 'components';

const Chip = props => {
  const {
    type,
    onClick,
    close,
    onCloseClick,
    children,
    backgroundColor,
    borderColor
  } = props;

  return (
    <span
      className={`${styles.chip} ${styles[type]} ${styles[backgroundColor]} ${
        styles[close ? 'close' : '']
      } ${styles[borderColor + 'Border']}
      `}
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
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  onClick: PropTypes.func,
  close: PropTypes.bool,
  onCloseClick: PropTypes.func
};

Chip.defaultProps = {
  type: 'round',
  close: false,
  backgroundColor: 'white',
  borderColor: 'lightGrey'
};

export default Chip;
