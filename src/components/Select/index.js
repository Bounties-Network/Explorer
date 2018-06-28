import React from 'react';
import PropTypes from 'prop-types';
import styles from './Select.module.scss';

// import { Text } from 'components';
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
      optional
    } = this.props;
    const { selectedOption } = this.state;

    let labelText = label;
    if (optional) {
      labelText = `(Optional) ${labelText || ''}`;
    }

    let selectClass = styles.selectComponent;
    if (error) {
      selectClass += ` ${styles.error}`;
    }

    return (
      <div className={`${styles.select}`}>
        {labelText ? (
          <div>
            <Text style="FormLabel" color={error ? 'red' : null}>
              {labelText}
            </Text>
          </div>
        ) : null}
        <SelectComponent
          className={selectClass}
          disabled={disabled}
          searchable={false}
          clearable={false}
          options={options}
          onChange={this.handleChange}
          placeholder={placeholder}
          value={selectedOption}
        />
        {error ? (
          <div>
            <Text style="FormLabel" color={'red'}>
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
  optional: PropTypes.bool
};

Select.defaultProps = {
  options: [],
  onChange: () => {}
};

export default Select;
