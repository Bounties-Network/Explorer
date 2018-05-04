import React from 'react';
import PropTypes from 'prop-types';
import styles from './Dialogue.module.scss';

import { Text, Button } from 'components';

const Dialogue = props => {
  const { className, size, header, text, closeButton, buttons } = props;

  const renderButtons = buttons => {
    return buttons.map(elem => (
      <span className={`${styles.buttonRow}`} key={elem.props.children}>
        {elem}
      </span>
    ));
  };

  return (
    <div className={`${styles.dialogue} ${styles[className]} ${styles[size]} `}>
      <div className={`${styles.dialogueTop}`}>
        <Text style="H3">{header}</Text>
        <Text style="Alt">X</Text>
      </div>
      <div className={`${styles.dialogueMid}`}>{props.children}</div>
      <div className={`${styles.dialogueBot}`}>{renderButtons(buttons)}</div>
    </div>
  );
};

Dialogue.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  header: PropTypes.string,
  closeButton: PropTypes.boolean,
  buttons: PropTypes.array
};

Dialogue.defaultProps = {
  size: 'medium',
  disabled: false,
  buttons: [],
  children: '',
  closeButton: false
};

export default Dialogue;
