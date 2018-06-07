import React from 'react';
import PropTypes from 'prop-types';
import styles from './TextInput.module.scss';

const debounceTimer = 400;

class TextInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };
    this.onTextChange = this.onTextChange.bind(this);
  }

  onTextChange(e) {
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
    const { className } = this.props;

    return (
      <input
        className={`${styles.textInput} ${className}`}
        type="text"
        value={this.state.text}
        onChange={this.onTextChange}
      />
    );
  }
}

TextInput.propTypes = {
  onChange: PropTypes.func
};

TextInput.defaultProps = {
  onChange: () => {}
};

export default TextInput;
