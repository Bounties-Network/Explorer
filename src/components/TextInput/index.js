import React from 'react';
import PropTypes from 'prop-types';
import styles from './TextInput.module.scss';
import { Text } from 'components';

class TextInput extends React.Component {
  state = {
    text: ''
  };

  onTextChange = e => {
    const { value } = e.target;
    if (typeof this.props.value !== 'string') {
      this.setState({ text: value });
    }
    this.props.onChange(value);
  };

  render() {
    const {
      label,
      disabled,
      error,
      optional,
      onBlur,
      onFocus,
      value,
      placeholder,
      type
    } = this.props;

    const { text: textStateValue } = this.state;
    const textValue = typeof value === 'string' ? value : textStateValue;

    let labelText = label;
    if (optional) {
      labelText = `${labelText || ''} (Optional)`;
    }

    let inputClass = styles.textInput;
    if (error) {
      inputClass += ` ${styles.error}`;
    }

    if (disabled) {
      inputClass += ` ${styles.disabled}`;
    }

    return (
      <div>
        {labelText ? (
          <div>
            <Text inputLabel color={error ? 'red' : null}>
              {labelText}
            </Text>
          </div>
        ) : null}
        <input
          placeholder={placeholder}
          disabled={disabled}
          className={inputClass}
          type={type}
          value={textValue}
          onChange={this.onTextChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
        {error ? (
          <div>
            <Text
              className={styles.inputHelpText}
              typeScale="Small"
              color={'red'}
            >
              {error}
            </Text>
          </div>
        ) : null}
      </div>
    );
  }
}

TextInput.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  optional: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.string,
  type: PropTypes.oneOf(['number', 'text', 'datetime-local'])
};

TextInput.defaultProps = {
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
  type: 'text'
};

export default TextInput;
