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
      labelText = `(Optional) ${labelText || ''}`;
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
            <Text style="FormLabel" color={error ? 'red' : null}>
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
            <Text style="FormLabel" color={'red'}>
              {error}
            </Text>
          </div>
        ) : null}
      </div>
    );
  }
}

TextInput.propTypes = {
  onChange: PropTypes.func
};

TextInput.defaultProps = {
  onChange: () => {},
  error: false
};

export default TextInput;
