import React from 'react';
import PropTypes from 'prop-types';
import styles from './FormToggle.module.scss';
import { Text, Toggle } from 'components';
import { LinkedAvatar } from 'explorer-components';

const FormToggle = props => {
  const { text, onChange, className } = props;

  return (
    <div className={`container-fluid ${styles.body} ${className}`}>
      <div className={`row ${styles.rowContainer}`}>
        <div className={`col-xs-10 ${styles.text}`}>
          <Text color="darkGrey" typeScale="h4">
            {text}
          </Text>
        </div>
        <div className={`col-xs-2 ${styles.toggle}`}>
          <Toggle />
        </div>
      </div>
    </div>
  );
};

FormToggle.propTypes = {
  text: PropTypes.string,
  onChange: PropTypes.func
};

FormToggle.defaultProps = {};

export default FormToggle;
