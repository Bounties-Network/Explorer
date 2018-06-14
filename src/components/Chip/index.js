import React from 'react';
import PropTypes from 'prop-types';
import styles from './Chip.module.scss';

import { Text } from 'components';

const Chip = props => {
  const { style, onClick, close, onCloseClick, children, color } = props;

  const onChipClick = () => {
    onClick(children);
  };

  const onXClick = () => {
    onCloseClick(children);
  };

  return (
    <span
      className={`${styles.chip} ${styles[style]} ${styles[color]} ${
        styles[close ? 'close' : '']
      }`}
      onClick={onChipClick}
    >
      <Text>{props.children}</Text>
      {close && (
        <div className={`${styles.closeButton}`} onClick={onXClick}>
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
  onClick: () => {},
  close: false,
  onCloseClick: e => console.log(e),
  color: ''
};

export default Chip;
