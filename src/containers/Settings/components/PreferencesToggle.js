import React from 'react';
import PropTypes from 'prop-types';
import styles from './PreferencesToggle.module.scss';
import { Text, Toggle } from 'components';
import { FormInput } from 'hocs';

const PreferencesToggle = props => {
  const { value, label, onChange, className } = props;

  return (
    <div className={`container-fluid ${styles.body} ${className}`}>
      <div className={`row ${styles.rowContainer}`}>
        <div className={`col-xs-10 ${styles.text}`}>
          <Text color="darkGrey" typeScale="h4">
            {label}
          </Text>
        </div>
        <div className={`col-xs-2 ${styles.toggle}`}>
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
