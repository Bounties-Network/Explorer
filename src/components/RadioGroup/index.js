/** @jsx jsx */
import { jsx } from "theme-ui";
import React from 'react';
import PropTypes from 'prop-types';
import styles from './RadioGroup.module.scss';
import { map as fpMap } from 'lodash';
import { Text } from 'components';
import Radio from 'fora-components/Radio';

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

    const selectedValue = value !== null ? value : stateValue;

    return map(
      (option, idx) => (
        <Radio
          key={`radio${idx}`}
          id={`radio${idx}`}
          checked={selectedValue === option[valueKey]}
          label={option[labelKey]}
          name={option[labelKey]}
          value={option[labelKey]}
          disabled={false}
          onClick={() => {
            this.onChange(option[valueKey])
          }}
        /> 
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
        <div sx={{ '> :not(:last-of-type)': { mb: 2 } }}>
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
  valueKey: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

RadioGroup.defaultProps = {
  labelKey: 'label',
  valueKey: 'value',
  options: [],
  onChange: () => {}
};

export default RadioGroup;
