import React from 'react';
import PropTypes from 'prop-types';
import styles from './RadioGroup.module.scss';
import { map as fpMap } from 'lodash';
import { Text } from 'components';

const map = fpMap.convert({ cap: false });

class RadioGroup extends React.Component {
  state = {
    value: ''
  };

  onChange = selection => {
    this.setState({ value: selection });
    this.props.onChange(selection);
  };

  renderRadioButtons = () => {
    const { value, valueKey, labelKey, options, disabled } = this.props;
    const { value: stateValue } = this.state;

    const selectedValue = value || stateValue;

    return map(
      (option, idx) => (
        <label key={'radio' + idx} className={`${styles.radioContainer}`}>
          <input
            className={`${styles.radio}`}
            disabled={disabled}
            type="radio"
            checked={selectedValue === option[valueKey]}
            onChange={() => this.onChange(option[valueKey])}
          />{' '}
          <span className={`${styles.customRadio}`} />
          <Text type="Body" className={`${styles.radioLabel}`}>
            {option[labelKey]}
          </Text>{' '}
        </label>
      ),
      options
    );
  };

  render() {
    const { className, label, optional, disabled } = this.props;

    let baseClass = `${styles.radioGroup} ${className}`;
    if (disabled) {
      baseClass += ` ${styles.disabled}`;
    }

    let labelText = label;
    if (optional) {
      labelText = `${labelText || ''} (Optional)`;
    }

    return (
      <div className={baseClass}>
        {labelText ? (
          <div>
            <Text inputLabel>{labelText}</Text>
          </div>
        ) : null}
        <div className={`${styles.stagesBody}`}>
          {this.renderRadioButtons()}
        </div>
      </div>
    );
  }
}

RadioGroup.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.array,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  optional: PropTypes.bool,
  labelKey: PropTypes.string,
  valueKey: PropTypes.string
};

RadioGroup.defaultProps = {
  labelKey: 'label',
  valueKey: 'value',
  options: [],
  onChange: () => {}
};

export default RadioGroup;
