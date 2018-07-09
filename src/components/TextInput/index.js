import React from 'react';
import PropTypes from 'prop-types';
import styles from './TextInput.module.scss';
import { Text } from 'components';

const debounceTimer = 300;

class TextInput extends React.Component {
  state = {
    text: ''
  };

  onTextChange = e => {
    const { value } = e.target;
    this.setState({ text: value });
    this.props.onChange(value);
  };

  render() {
    const {
      className,
      label,
      disabled,
      error,
      optional,
      placeholder
    } = this.props;

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
          type="text"
          value={this.state.text}
          onChange={this.onTextChange}
        />
        {error ? (
          <div>
            <Text
              className={`${styles.inputHelpText}`}
              typeScale="Small"
              color={'red'}
            >
              * {error}
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
  onChange: PropTypes.func
};

TextInput.defaultProps = {
  onChange: () => {}
};

export default TextInput;
