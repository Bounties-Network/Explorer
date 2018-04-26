import React from 'react';
import PropTypes from 'prop-types';
import styles from './Text.module.scss';

const Text = props => {
  const { className, style, src } = props;

  return (
    <span className={`${styles.button} ${styles[style]} `}>
      <alt src={src}>{props.children}</alt>
    </span>
  );
};

Text.propTypes = {
  className: PropTypes.string,
  style: PropTypes.oneOf([
    'H1',
    'H2',
    'H3',
    'H4',
    'CardHeading',
    'Body',
    'BodySmall',
    'FormLabel',
    'FormInvalid',
    'Link',
    'Alt'
  ]),
  src: Proptypes.string
};

Text.defaultProps = {
  size: 'medium',
  src: ''
};

export default Text;
