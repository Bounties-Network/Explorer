import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = props => {
  const { className, style, size, disabled, onClick, text } = props;

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
      {' '}
      {text}{' '}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  style: PropTypes.oneOf(['primary', 'secondary', 'destructive', 'link']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string
};

Button.defaultProps = {
  style: 'primary',
  size: 'medium',
  disabled: false,
  text: 'button'
};

export default Button;
