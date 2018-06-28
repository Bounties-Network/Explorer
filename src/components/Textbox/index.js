import React from 'react';
import PropTypes from 'prop-types';
import styles from './Textbox.module.scss';

import { Text } from 'components';

const debounceTimer = 300;

class Textbox extends React.Component {
  state = {
    text: ''
  };

  onTextareaChange = e => {
    const { value } = e.target;
    this.setState({ text: value });
    this.props.onChange(value);
  };

  render() {
    const {
      className,
      error,
      resizable,
      optional,
      label,
      disabled,
      placeholder
    } = this.props;

    let labelText = label;
    if (optional) {
      labelText = `(Optional) ${labelText || ''}`;
    }

    let inputClass = styles.textarea;
    if (error) {
      inputClass += ` ${styles.error}`;
    }

    if (disabled) {
      inputClass += ` ${styles.disabled}`;
    }

    if (!resizable) {
      inputClass += ` ${styles.resizeNone}`;
    }

    return (
      <div className={styles.wrapper}>
        {labelText ? (
          <div>
            <Text style="FormLabel" color={error ? 'red' : null}>
              {labelText}
            </Text>
          </div>
        ) : null}
        <textarea
          className={inputClass}
          placeholder={placeholder}
          disabled={disabled}
          value={this.state.text}
          onChange={this.onTextareaChange}
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

Textbox.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  resizable: PropTypes.bool,
  optional: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

Textbox.defaultProps = {
  onChange: () => {},
  resizable: true
};

export default Textbox;
