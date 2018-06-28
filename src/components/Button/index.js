import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = props => {
  const { className, style, disabled, onClick, loading } = props;

  const onClickHandler = () => {
    if (!loading && !disabled) {
      onClick();
    }
  };

  let addedClasses = '';
  if (disabled) {
    addedClasses += styles.disabled;
  }

  if (loading) {
    addedClasses += styles.buttonLoading;
  }

  let childwrapper = '';
  if (loading) {
    childwrapper = styles.childwrapper;
  }

  return (
    <button
      className={`${className} ${styles.button}
        ${styles[style]} ${addedClasses}`}
      onClick={onClickHandler}
      disabled={disabled}
    >
      <div className={childwrapper}>{props.children}</div>
      {loading ? <div className={styles.loader} /> : null}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  style: PropTypes.oneOf([
    'primary',
    'secondary',
    'destructive',
    'action',
    'link'
  ]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

Button.defaultProps = {
  style: 'primary'
};

export default Button;
