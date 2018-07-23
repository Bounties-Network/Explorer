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
      placeholder,
      textAreaClass,
      overlay,
      value
    } = this.props;

    let labelText = label;
    if (optional) {
      labelText = `${labelText || ''} (Optional)`;
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
            <Text inputLabel color={error ? 'red' : null}>
              {labelText}
            </Text>
          </div>
        ) : null}
        <div className={styles.textareaWrapper}>
          <textarea
            className={`${inputClass} ${textAreaClass}`}
            placeholder={placeholder}
            disabled={disabled}
            value={this.state.text || value}
            onChange={this.onTextareaChange}
          />
          {overlay ? <div className={styles.overlay}>{overlay}</div> : null}
        </div>
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
