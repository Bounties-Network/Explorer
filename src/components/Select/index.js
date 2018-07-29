import React from 'react';
import PropTypes from 'prop-types';
import styles from './Select.module.scss';
import SelectComponent from 'react-select';
import { Text } from 'components';
import '../../styles/ReactSelect.scss';

class Select extends React.Component {
  state = {
    selectedOption: ''
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    this.props.onChange(selectedOption);
  };

  render() {
    const {
      options,
      onChange,
      placeholder,
      label,
      disabled,
      error,
      optional,
      labelKey,
      valueKey
    } = this.props;
    const { selectedOption } = this.state;

    let labelText = label;
    if (optional) {
      labelText = `${labelText || ''} (Optional)`;
    }

    let selectClass = styles.selectComponent;
    if (error) {
      selectClass += ` ${styles.error}`;
    }

    return (
      <div className={`${styles.select}`}>
        {labelText ? (
          <div>
            <Text inputLabel color={error ? 'red' : null}>
              {labelText}
            </Text>
          </div>
        ) : null}
        <SelectComponent
          className={selectClass}
          disabled={disabled}
          searchable={false}
          clearable={false}
          labelKey={labelKey}
          valueKey={valueKey}
          options={options}
          onChange={this.handleChange}
          placeholder={placeholder}
          value={selectedOption}
        />
        {error ? (
          <div>
            <Text
              className={styles.inputHelpText}
              typeScale="Small"
              color="red"
            >
              {error}
            </Text>
          </div>
        ) : null}
      </div>
    );
  }
}

Select.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.function,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  optional: PropTypes.bool,
  labelKey: PropTypes.string,
  valueKey: PropTypes.string
};

Select.defaultProps = {
  labelKey: 'label',
  valueKey: 'value',
  options: [],
  onChange: () => {}
};

export default Select;
