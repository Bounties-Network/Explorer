import React from 'react';
import PropTypes from 'prop-types';
import styles from './Checkbox.module.scss';
import { Text } from 'components';

class Checkbox extends React.Component {
  state = {
    selected: false
  };

  toggleState = () => {
    this.setState({ selected: !this.state.selected });
  };

  render() {
    const { selected } = this.state;
    const { checked, label, onChange, disabled } = this.props;

    const checkedPropExists = typeof checked === 'boolean';

    return (
      <label className={`${styles.checkboxContainer}`}>
        <input
          type="checkbox"
          className={styles.checkbox}
          value
          disabled={disabled}
          checked={checkedPropExists ? checked : selected}
          onChange={onChange || this.toggleState}
        />
        <span className={`${styles.customCheckbox}`} />
        {label ? (
          <Text type="Body" className={`${styles.checkboxLabel}`}>
            {label}
          </Text>
        ) : null}
      </label>
    );
  }
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.string
};

export default Checkbox;
