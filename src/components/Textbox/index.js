import React from 'react';
import PropTypes from 'prop-types';
import Textarea from 'react-textarea-autosize';
import styles from './Textbox.module.scss';

import { Text } from 'components';

class Textbox extends React.Component {
  state = {
    text: ''
  };

  onTextareaChange = e => {
    const { value } = e.target;
    if (typeof this.props.value !== 'string') {
      this.setState({ text: value });
    }
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
      value,
      onFocus,
      onBlur
    } = this.props;

    const { text: textStateValue } = this.state;
    const textValue = typeof value === 'string' ? value : textStateValue;

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
      <div className={`${styles.wrapper} ${className}`}>
        {labelText && (
          <div>
            <Text inputLabel color={error ? 'red' : null}>
              {labelText}
            </Text>
          </div>
        )}
        <div className={styles.textareaWrapper}>
          <Textarea
            className={`${inputClass} ${textAreaClass}`}
            placeholder={placeholder}
            disabled={disabled}
            onFocus={onFocus}
            onBlur={onBlur}
            value={textValue}
            onChange={this.onTextareaChange}
          />
          {overlay ? <div className={styles.overlay}>{overlay}</div> : null}
        </div>
        {error && (
          <div>
            <Text
              className={styles.inputHelpText}
              typeScale="Small"
              color={'red'}
            >
              {error}
            </Text>
          </div>
        )}
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
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.string
};

Textbox.defaultProps = {
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
  resizable: true
};

export default Textbox;
