import React from 'react';
import PropTypes from 'prop-types';
import styles from './Dialogue.module.scss';

import { Text, Button } from 'components';

const Dialogue = props => {
  const { className, size, header, text, closeButton, buttonsData } = props;

  const renderButtons = buttons => {
    return buttons.map(elem => (
      <span className={`${styles.buttonRow}`}>
        <Button
          text={elem.text}
          onClick={() => elem.onClick()}
          style={elem.style}
        />
      </span>
    ));
  };

  return (
    <div className={`${styles.dialogue} ${styles[className]} ${styles[size]} `}>
      <div className={`${styles.dialogueTop}`}>
        <Text style="H3">{header}</Text>
        <Text style="Alt">X</Text>
      </div>
      <div className={`${styles.dialogueMid}`}>
        <Text style="Body">{text}</Text>
      </div>
      <div className={`${styles.dialogueBot}`}>
        {renderButtons(buttonsData)}
      </div>
    </div>
  );
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
