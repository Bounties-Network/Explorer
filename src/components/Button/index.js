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
      className={`${styles.button} ${styles[size]}
        ${styles[style]} ${addedClasses}`}
      onClick={onClick}
      disabled={disabled}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  style: PropTypes.oneOf(['primary', 'secondary', 'destructive', 'link']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

Button.defaultProps = {
  style: 'primary',
  size: 'medium',
  disabled: false
};

export default Button;
