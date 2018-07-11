import React from 'react';
import PropTypes from 'prop-types';
import styles from './Pill.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { Text } from 'components';

const Chip = props => {
  const {
    type,
    onClick,
    close,
    onCloseClick,
    children,
    backgroundColor,
    noBorder,
    borderColor
  } = props;

  return (
    <span
      className={`${styles.chip} ${styles[type]} ${styles[backgroundColor]} ${
        styles[close ? 'close' : '']
      } ${styles[noBorder ? 'noBorder' : '']}
      } ${styles[borderColor + 'Border']}
      `}
      onClick={onClick}
    >
      <Text typeScale="Small">{props.children}</Text>
      {close && (
        <div className={`${styles.closeButton}`} onClick={onCloseClick}>
          <i>
            <FontAwesomeIcon icon={['fal', 'times']} />
          </i>
        </div>
      )}
    </span>
  );
};

Chip.propTypes = {
  type: PropTypes.oneOf(['round', 'rectangle']),
  backgroundColor: PropTypes.string,
  noBorder: PropTypes.bool,
  borderColor: PropTypes.string,
  onClick: PropTypes.func,
  close: PropTypes.bool,
  onCloseClick: PropTypes.func
};

Chip.defaultProps = {
  type: 'round',
  close: false,
  backgroundColor: 'white',
  noBorder: false,
  borderColor: 'lightGrey'
};

export default Chip;
