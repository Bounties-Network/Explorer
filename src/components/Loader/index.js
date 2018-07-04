import React from 'react';
import PropTypes from 'prop-types';
import styles from './Loader.module.scss';

const Loader = props => (
  <div className={`${styles.wrapper} ${styles[props.size]} ${props.className}`}>
    <div
      className={`${styles.loader} ${styles[props.color]} ${
        styles[props.size]
      }`}
    />
  </div>
);

Loader.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium']),
  color: PropTypes.oneOf([
    'purple',
    'blue',
    'orange',
    'green',
    'red',
    'black',
    'white',
    'grey',
    'lightGrey',
    'darkGrey'
  ])
};

Loader.defaultProps = {
  size: 'small',
  color: 'white'
};

export default Loader;
