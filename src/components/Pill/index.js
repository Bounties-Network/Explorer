import React from 'react';
import PropTypes from 'prop-types';
import styles from './Pill.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Text } from 'components';
import { faTimes } from '@fortawesome/pro-light-svg-icons';

const Pill = props => {
  const {
    type,
    onClick,
    close,
    onCloseClick,
    backgroundColor,
    textColor,
    noBorder,
    borderColor,
    hoverBackgroundColor,
    className
  } = props;

  return (
    <span
      className={`${styles.pill} ${styles[type]} ${className} ${
        styles[backgroundColor]
      } ${styles['hover' + hoverBackgroundColor]} ${
        styles[close ? 'close' : '']
      } ${styles[noBorder ? 'noBorder' : '']}
      } ${styles[borderColor + 'Border']}
      `}
      onClick={onClick}
    >
      <Text typeScale="Small" color={textColor}>
        {props.children}
      </Text>
      {close && (
        <div className={`${styles.closeButton}`} onClick={onCloseClick}>
          <i>
            <FontAwesomeIcon icon={faTimes} />
          </i>
        </div>
      )}
    </span>
  );
};

Pill.propTypes = {
  type: PropTypes.oneOf(['round', 'rectangle']),
  className: PropTypes.string,
  backgroundColor: PropTypes.string,
  hoverBackgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  noBorder: PropTypes.bool,
  borderColor: PropTypes.string,
  onClick: PropTypes.func,
  close: PropTypes.bool,
  onCloseClick: PropTypes.func
};

Pill.defaultProps = {
  type: 'round',
  close: false,
  backgroundColor: 'white',
  noBorder: false,
  borderColor: 'lightGrey'
};

export default Pill;
