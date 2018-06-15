import React from 'react';
import PropTypes from 'prop-types';
import styles from './Textbox.module.scss';

import { Text } from 'components';

const debounceTimer = 300;

class Textbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };
    this.onTextareaChange = this.onTextareaChange.bind(this);
  }

  onTextareaChange(e) {
    const { value } = e.target;
    this.setState({ text: value });

    // debounce
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(
      () => this.props.onChange(this.state.text),
      debounceTimer
    );
  }

  render() {
    const { className, error, resizeNone, size } = this.props;

    return (
      <textarea
        className={`${styles.textarea} ${styles[size]} ${className} ${
          styles[resizeNone ? 'resizeNone' : '']
        } ${styles[error ? 'error' : '']}`}
        value={this.state.text}
        onChange={this.onTextareaChange}
      />
    );
  }
}

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
