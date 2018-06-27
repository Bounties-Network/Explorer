import React from 'react';
import PropTypes from 'prop-types';
import styles from './Select.module.scss';

// import { Text } from 'components';
import SelectComponent from 'react-select';
import '../../styles/ReactSelect.scss';

class Select extends React.Component {
  state = {
    selectedOption: ''
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  render() {
    const { options, onChange, placeholder } = this.props;
    const { selectedOption } = this.state;

    return (
      <div className={`${styles.select}`}>
        <SelectComponent
          searchable={false}
          clearable={false}
          options={options}
          onChange={this.handleChange}
          placeholder={placeholder}
          value={selectedOption}
        />
      </div>
    );
  }
}

Select.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.function,
  placeholder: PropTypes.string
};

Select.defaultProps = {
  options: [],
  onChange: () => {},
  placeholder: ''
};

export default Select;
