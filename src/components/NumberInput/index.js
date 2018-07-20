import React from 'react';
import PropTypes from 'prop-types';
import styles from './NumberInput.module.scss';
import { Text } from 'components';

class NumberInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue
    };
  }

  increment = () => {
    const { disabled } = this.props;
    if (disabled) {
      return null;
    }

    const { value } = this.state;
    const newValue = value + 1;

    this.setState({ value: newValue });
    this.props.onChange(newValue);
  };

  decrement = () => {
    const { disabled } = this.props;
    if (disabled) {
      return null;
    }

    const { value } = this.state;
    const newValue = value - 1;

    this.setState({ value: newValue });
    this.props.onChange(newValue);
  };

  render() {
    const { min, max, value, defaultValue, disabled, label } = this.props;
    const { value: stateValue } = this.state;

    const inputValue = value || stateValue || defaultValue;
    let numberInputClass = styles.numberInput;
    if (disabled) {
      numberInputClass += ` ${styles.disabled}`;
    }

    return (
      <div className={numberInputClass}>
        {label ? (
          <div>
            <Text inputLabel>{label}</Text>
          </div>
        ) : null}
        <span className={styles.decrement} onClick={this.decrement}>
          –
        </span>
        <input
          className={styles.input}
          type="text"
          value={inputValue}
          min={min}
          max={max}
          disabled={disabled}
        />
        <span className={styles.increment} onClick={this.increment}>
          +
        </span>
      </div>
    );
  }
}

NumberInput.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
  defaultValue: PropTypes.number
};

NumberInput.defaultProps = {
  onChange: () => {},
  min: 0,
  max: 10,
  defaultValue: 0
};

export default NumberInput;
