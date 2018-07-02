import React from 'react';
import PropTypes from 'prop-types';
import styles from './Toggle.module.scss';
import { Text } from 'components';
import ToggleComponent from 'react-toggle';
import '../../styles/Toggle.scss';

const Toggle = props => {
  const { checked, onChange, disabled, label } = props;

  return (
    <div>
      {label ? (
        <div>
          <Text type="FormLabel">{label}</Text>
        </div>
      ) : null}
      <ToggleComponent disabled={disabled} onChange={onChange} />
    </div>
  );
};

Toggle.propTypes = {};

Toggle.defaultProps = {};

export default Toggle;
