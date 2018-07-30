import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Loader } from 'components';

const Button = props => {
  const {
    className,
    type,
    disabled,
    onClick,
    loading,
    icon,
    fitWidth,
    margin
  } = props;

  const onClickHandler = e => {
    if (!loading && !disabled) {
      onClick(e);
    }
  };

  let loaderColor = 'white';
  if (type === 'default') {
    loaderColor = 'blue';
  }

  let addedClasses = '';
  if (disabled) {
    addedClasses += styles.disabled;
  }

  if (margin) {
    addedClasses += styles.margin;
  }

  if (loading) {
    addedClasses += styles.buttonLoading;
  }

  if (fitWidth) {
    addedClasses += styles.fitWidth;
  }

  let childwrapper = '';
  if (loading) {
    childwrapper = styles.childwrapper;
  }

  return (
    <button
      className={`${className} ${styles.button}
        ${styles[type]} ${addedClasses}`}
      onClick={onClickHandler}
      disabled={disabled}
    >
      <div className={childwrapper}>
        {icon ? <FontAwesomeIcon icon={icon} className={styles.icon} /> : null}
        {props.children}
      </div>
      {loading ? (
        <Loader className={styles.loader} color={loaderColor} />
      ) : null}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf([
    'primary',
    'default',
    'destructive',
    'action',
    'link',
    'link-destructive'
  ]),
  icon: PropTypes.array,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

Button.defaultProps = {
  onClick: () => {},
  type: 'default',
  fitWidth: false
};

export default Button;
