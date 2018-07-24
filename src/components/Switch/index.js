import React from 'react';
import PropTypes from 'prop-types';
import styles from './Switch.module.scss';
import { uniqueId } from 'lodash';

class Switch extends React.Component {
  constructor(props) {
    super(props);
    const uuid = uniqueId();
    this.state = {
      uuid,
      value: props.offValue
    };
  }

  onChange = e => {
    const value = e.target.value;

    this.setState({ value: e.target.value });
    this.props.onChange(value);
  };

  render() {
    const {
      offValue,
      onValue,
      selectedColor,
      unselectedColor,
      backgroundColor,
      switchColor,
      value,
      defaultValue,
      size,
      curved
    } = this.props;
    const { uuid, value: stateValue } = this.state;

    const currentValue = value || stateValue || defaultValue;
    let switchClass = `${styles.switch} ${styles[backgroundColor]} ${
      styles[size]
    }`;
    let offClass = `${styles.switchLabel} ${styles.switchLabelOff}`;
    let onClass = `${styles.switchLabel} ${styles.switchLabelOn}`;

    if (curved) {
      switchClass += ` ${styles.curved}`;
    }

    let isOn = false;
    if (currentValue === onValue) {
      onClass += ` ${styles[selectedColor]}`;
      offClass += ` ${styles[unselectedColor]}`;
      isOn = true;
    }

    if (currentValue === offValue) {
      offClass += ` ${styles[selectedColor]}`;
      onClass += ` ${styles[unselectedColor]}`;
    }

    return (
      <div className={switchClass}>
        <input
          type="radio"
          className={styles.switchInput}
          name={uuid}
          value={offValue}
          id={uuid + 'off'}
          onChange={this.onChange}
          checked={!isOn}
        />
        <label htmlFor={uuid + 'off'} className={offClass}>
          {offValue}
        </label>
        <input
          type="radio"
          className={styles.switchInput}
          name={uuid}
          value={onValue}
          id={uuid + 'on'}
          onChange={this.onChange}
          checked={isOn}
        />
        <label htmlFor={uuid + 'on'} className={onClass}>
          {onValue}
        </label>
        <span className={`${styles.switchSelection} ${styles[switchColor]}`} />
      </div>
    );
  }
}

Switch.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  backgroundColor: PropTypes.string,
  switchColor: PropTypes.string,
  selectedColor: PropTypes.string,
  unselectedColor: PropTypes.string,
  size: PropTypes.string,
  curved: PropTypes.bool
};

Switch.defaultProps = {
  onChange: () => {},
  backgroundColor: 'lightGrey',
  switchColor: 'white',
  selectedColor: 'grey',
  unselectedColor: 'grey',
  size: 'small',
  curved: false
};

export default Switch;
