import React from 'react';
import PropTypes from 'prop-types';
import styles from './Avatar.module.scss';

import { Text, Circle } from 'components';

const Avatar = props => {
  const {
    size,
    name,
    address,
    nameTextType,
    nameTextColor,
    addressTextType,
    addressTextColor,
    border
  } = props;

  return <div className={styles.avatar}>circle component goes here.</div>;
};

Avatar.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  border: PropTypes.bool,
  name: PropTypes.string,
  address: PropTypes.string,
  nameTextType: PropTypes.string,
  nameTextColor: PropTypesstring,
  addressTextType: PropTypes.string,
  addressTextColor: PropTypesstring
};

Avatar.defaultProps = {
  size: 'medium',
  border: false
};

export default Avatar;
