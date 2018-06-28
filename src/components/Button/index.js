import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = props => {
  const { className, style, disabled, onClick } = props;

  let addedClasses = '';
  if (disabled) {
    addedClasses += styles.disabled;
  }

  return (
    <button
      className={`${className} ${styles.button}
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
  style: PropTypes.oneOf(['primary', 'secondary', 'destructive', 'action']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

Button.defaultProps = {
  style: 'primary'
};

export default Button;
