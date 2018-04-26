import React from 'react';
import PropTypes from 'prop-types';
import styles from './Dialogue.module.scss';

const Dialogue = props => {
  const { className, size, header, text, closeButton, buttons } = props;

  let addedClasses = '';
  if (disabled) {
    addedClasses += styles.disabled;
  }

  return <div />;
};

Dialogue.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
  header: PropTypes.string,
  text: PropTypes.string,
  closeButton: PropTypes.boolean,
  button: PropTypes.array
};

Dialogue.defaultProps = {
  size: 'medium',
  disabled: false,
  buttons: []
};

export default Dialogue;
