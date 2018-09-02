import React from 'react';
import PropTypes from 'prop-types';
import styles from './SearchSelect.module.scss';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';
import { reject, includes, map, find, isUndefined } from 'lodash';
import '../../styles/ReactSelect.scss';

import { Text, Pill } from 'components';

class SearchSelect extends React.Component {
  constructor(props) {
    super(props);
    const { value, single } = this.props;
    this.state = {
      value: value || (!single && [])
    };
  }

  filterOptions = () => {
    const { options, value, valueKey, single } = this.props;
    const { value: stateValue } = this.state;

    const selectValue = value || stateValue;

    return reject(
      optionItem => includes(optionItem[valueKey], selectValue) && !single,
      options
    );
  };

  onCreateOption = value => {
    this.props.onCreate(value);
    this.onDropdownSelect(value);
  };

  onDropdownSelect = selectedValue => {
    const { value, valueKey, single, onChange } = this.props;
    const { value: stateValue } = this.state;

    const selectValue = value || stateValue;

    if (single) {
      this.setState({ value: selectedValue && selectedValue.normalized_name });
      onChange(selectedValue);
    } else {
      this.setState({ value: [...selectValue, selectedValue[valueKey]] });
      onChange([...selectValue, selectedValue[valueKey]]);
    }
  };

  closePill = closedValue => {
    const { value } = this.props;
    const { value: stateValue } = this.state;

    const selectValue = value || stateValue;

    const updatedValue = reject(
      valueItem => valueItem === closedValue,
      selectValue
    );
    this.setState({ value: updatedValue });
    this.props.onClose(closedValue);
    this.props.onChange(updatedValue);
  };

  renderPills = () => {
    const { value, options, valueKey, labelKey, single } = this.props;
    const { value: stateValue } = this.state;

    const selectValue = value || stateValue;

    if (!single) {
      return map(valueItem => {
        if (isUndefined(valueItem)) {
          return null;
        }

        const label = find(
          optionItem => optionItem[valueKey] === valueItem,
          options
        );

        return (
          <div className={`${styles.pill}`} key={valueItem}>
            <Pill close onCloseClick={() => this.closePill(valueItem)}>
              {label ? label[labelKey] : valueItem}
            </Pill>
          </div>
        );
      }, selectValue);
    }
  };

  render() {
    const {
      className,
      disabled,
      label,
      error,
      labelKey,
      valueKey,
      value,
      maxLength,
      optional,
      placeholder,
      single,
      creatable,
      clearable,
      onFocus,
      onBlur
    } = this.props;

    let labelText = label;
    if (optional) {
      labelText = `(Optional) ${labelText || ''}`;
    }

    let selectClass = className;
    if (error) {
      selectClass += ` ${styles.error}`;
    }

    let select = creatable ? (
      <CreatableSelect
        disabled={disabled}
        labelKey={labelKey}
        valueKey={valueKey}
        className={selectClass}
        options={this.filterOptions()}
        onChange={this.onDropdownSelect}
        onCreateOption={this.onCreateOption}
        onFocus={onFocus}
        onBlur={() => onBlur(this.state.value)}
        placeholder={placeholder}
        inputProps={{ maxLength }}
      />
    ) : (
      <Select
        disabled={disabled}
        labelKey={labelKey}
        valueKey={valueKey}
        className={selectClass}
        options={this.filterOptions()}
        onChange={this.onDropdownSelect}
        placeholder={placeholder}
        inputProps={{ maxLength }}
      />
    );

    if (single) {
      const { value: stateValue } = this.state;
      const selectedValue = value || stateValue;

      select = (
        <Select
          disabled={disabled}
          labelKey={labelKey}
          valueKey={valueKey}
          clearable={clearable}
          className={selectClass}
          onChange={this.onDropdownSelect}
          options={this.filterOptions()}
          placeholder={placeholder}
          value={selectedValue}
        />
      );
    }

    return (
      <div className={`${styles.dropdownSearch}`}>
        {labelText && (
          <div>
            <Text inputLabel color={error ? 'red' : null}>
              {labelText}
            </Text>
          </div>
        )}
        {select}
        {error && (
          <div>
            <Text
              className={styles.inputHelpText}
              typeScale="Small"
              color="red"
            >
              {error}
            </Text>
          </div>
        )}
        <div>
          <div className={`${styles.pillBar}`}>
            {!single && this.renderPills()}
          </div>
        </div>
      </div>
    );
  }
}

SearchSelect.propTypes = {
  labelKey: PropTypes.string,
  valueKey: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  maxLength: PropTypes.number,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.string,
  optional: PropTypes.bool,
  placeholder: PropTypes.string,
  single: PropTypes.bool,
  creatable: PropTypes.bool,
  clearable: PropTypes.bool,
  value: PropTypes.array,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onCreate: PropTypes.func
};

SearchSelect.defaultProps = {
  labelKey: 'label',
  valueKey: 'value',
  options: [],
  maxLength: 20,
  single: false,
  creatable: false,
  clearable: true,
  onClose: () => {},
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onCreate: () => {}
};

export default SearchSelect;
