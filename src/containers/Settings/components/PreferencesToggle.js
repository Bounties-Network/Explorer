import React from 'react';
import PropTypes from 'prop-types';
import styles from './PreferencesToggle.module.scss';
import { Text, Toggle } from 'components';
import { FormInput } from 'hocs';

const PreferencesToggle = props => {
  const { value, label, onChange, className } = props;

  return (
    <div className={`${styles.body} ${className}`}>
      <div className={`${styles.toggleContainer}`}>
        <div className={`${styles.toggleLabel}`}>
          <Text color="darkGrey" typeScale="Body">
            {label}
          </Text>
        </div>
        <div className={`${styles.toggle}`}>
          <Toggle value={value} onChange={onChange} />
        </div>
      </div>
    </div>
  );
};

PreferencesToggle.propTypes = {
  text: PropTypes.string,
  onChange: PropTypes.func
};

PreferencesToggle.defaultProps = {};

export default FormInput(PreferencesToggle);
