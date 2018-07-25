import React from 'react';
import PropTypes from 'prop-types';
import styles from './SearchSelect.module.scss';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';
import { reject, includes, filter, map, find } from 'lodash';
import '../../styles/ReactSelect.scss';

import { Text, Pill } from 'components';

class SearchSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || []
    };
  }

  filterOptions = () => {
    const { options, value, valueKey } = this.props;
    const { value: stateValue } = this.state;

    const selectValue = value || stateValue;
    return reject(
      optionItem => includes(optionItem[valueKey], selectValue),
      options
    );
  };

  onDropdownSelect = selectedValue => {
    const { value, valueKey } = this.props;
    const { value: stateValue } = this.state;

    const selectValue = value || stateValue;

    this.setState({ value: [...selectValue, selectedValue[valueKey]] });
    this.props.onChange([...selectValue, selectedValue[valueKey]]);
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
    const { value, options, valueKey, labelKey } = this.props;
    const { value: stateValue } = this.state;

    const selectValue = value || stateValue;

    return map(valueItem => {
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
  };

  render() {
    const {
      className,
      disabled,
      label,
      error,
      labelKey,
      valueKey,
      optional,
      placeholder,
      options,
      creatable,
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

    return (
      <div className={`${styles.dropdownSearch}`}>
        {labelText ? (
          <div>
            <Text inputLabel color={error ? 'red' : null}>
              {labelText}
            </Text>
          </div>
        ) : null}
        {creatable ? (
          <CreatableSelect
            disabled={disabled}
            labelKey={labelKey}
            valueKey={valueKey}
            className={selectClass}
            options={this.filterOptions()}
            onChange={this.onDropdownSelect}
            onCreateOption={this.onDropdownSelect}
            onFocus={onFocus}
            onBlur={() => onBlur(this.state.value)}
            placeholder={placeholder}
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
          />
        )}
        {error ? (
          <div>
            <Text type="FormLabel" color={'red'}>
              {error}
            </Text>
          </div>
        ) : null}
        <div>
          <div className={`${styles.pillBar}`}>{this.renderPills()}</div>
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
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.string,
  optional: PropTypes.bool,
  placeholder: PropTypes.string,
  creatable: PropTypes.bool,
  value: PropTypes.array,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};

SearchSelect.defaultProps = {
  labelKey: 'label',
  valueKey: 'value',
  options: [],
  onClose: () => {},
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {}
};

export default SearchSelect;
