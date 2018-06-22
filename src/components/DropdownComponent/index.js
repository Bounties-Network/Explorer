import React from 'react';
import PropTypes from 'prop-types';
import styles from './Dropdown.module.scss';

// import { Text } from 'components';
import Dropdown from 'react-dropdown';
import '../../styles/ReactDropdown.scss';

const DropdownComponent = props => {
  const { options, onChange, placeholder } = props;

  return (
    <div className={`${styles.dropdown}`}>
      <Dropdown
        options={options}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

DropdownComponent.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.function,
  placeholder: PropTypes.string
};

DropdownComponent.defaultProps = {
  options: [],
  onChange: () => {},
  placeholder: ''
};

export default DropdownComponent;
