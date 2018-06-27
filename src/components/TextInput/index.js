import React from 'react';
import PropTypes from 'prop-types';
import styles from './TextInput.module.scss';

const TextInput = props => {
  const { input, className, error, title, name, placeholder, touched } = props;

  return (
    <div>
      <label>{title}</label>
      <input
        className={`${styles.textInput} ${className} ${
          styles[error ? 'error' : '']
        }`}
        name={name}
        placeholder={placeholder}
        {...input}
      />
      {touched && error && <span className="error">{error}</span>}
    </div>
  );
};

TextInput.propTypes = {
  onChange: PropTypes.func
};

TextInput.defaultProps = {
  error: false
};

export default TextInput;
