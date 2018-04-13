import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = props => {
  const { className, style, size, disabled, onClick } = props;

  let addedClasses = '';
  if (disabled) {
    addedClasses += styles.disabled;
  }

  return (
    <button
      className={`${styles.button} ${styles[size]} ${
        styles[style]
      } ${addedClasses}`}
      onClick={onClick}
      disabled={disabled}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  style: PropTypes.oneOf(['primary', 'secondary']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

Button.defaultProps = {
  size: 'medium',
  style: 'primary',
  disabled: false
};

export default Button;
