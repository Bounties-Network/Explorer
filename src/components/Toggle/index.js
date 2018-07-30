import React from 'react';
import PropTypes from 'prop-types';
import styles from './Toggle.module.scss';
import { Text } from 'components';
import ToggleComponent from 'react-toggle';
import '../../styles/Toggle.scss';
import { uniqueId } from 'lodash';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    const uuid = uniqueId();
    this.state = {
      uuid,
      value: props.value || props.defaultValue
    };
  }

  onChange = e => {
    const value = !this.state.value;
    this.setState({ value });
    this.props.onChange(value);
  };

  render() {
    const { defaultValue, disabled, label, value } = this.props;
    const { uuid, value: stateValue } = this.state;

    const currentValue = value || stateValue || defaultValue;

    return (
      <div>
        {label ? (
          <div>
            <Text inputLabel>{label}</Text>
          </div>
        ) : null}
        <ToggleComponent
          checked={currentValue}
          disabled={disabled}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

Toggle.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.bool,
  defaultValue: PropTypes.bool
};

Toggle.defaultProps = {
  onChange: () => {},
  defaultValue: false,
  backgroundColor: 'lightGrey',
  switchColor: 'white',
  selectedColor: 'grey',
  unselectedColor: 'grey',
  size: 'small',
  curved: false
};

export default Toggle;
