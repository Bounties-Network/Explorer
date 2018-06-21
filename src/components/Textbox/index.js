import React from 'react';
import PropTypes from 'prop-types';
import styles from './Textbox.module.scss';

import { Text } from 'components';

const Textbox = props => {
  const { className, error, resizeNone, size, input } = props;

  return (
    <textarea
      className={`${styles.textarea} ${styles[size]} ${className} ${
        styles[resizeNone ? 'resizeNone' : '']
      } ${styles[error ? 'error' : '']}`}
      {...input}
    />
  );
};

Textbox.propTypes = {
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

Textbox.defaultProps = {
  onChange: () => {},
  error: false,
  size: 'medium'
};

export default Textbox;
