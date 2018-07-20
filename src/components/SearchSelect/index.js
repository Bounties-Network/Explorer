import React from 'react';
import PropTypes from 'prop-types';
import styles from './SearchSelect.module.scss';
import Select from 'react-select';
import { reject, includes, filter, map, find } from 'lodash';
import '../../styles/ReactSelect.scss';

import { Text, Pill } from 'components';

// props = options, onChange, placeholder
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
            {label[labelKey]}
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
      options
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
            <Text type="FormLabel" color={error ? 'red' : null}>
              {labelText}
            </Text>
          </div>
        ) : null}
        <Select
          disabled={disabled}
          labelKey={labelKey}
          valueKey={valueKey}
          className={selectClass}
          options={this.filterOptions()}
          onChange={this.onDropdownSelect}
          placeholder={placeholder}
        />
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
  value: PropTypes.array
};

SearchSelect.defaultProps = {
  labelKey: 'label',
  valueKey: 'value',
  options: [],
  onClose: () => {},
  onChange: () => {}
};

export default SearchSelect;
