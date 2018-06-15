import React from 'react';
import PropTypes from 'prop-types';
import styles from './Dialogue.module.scss';

import { Text, Button } from 'components';

const Dialogue = props => {
  const {
    className,
    size,
    header,
    text,
    closeButton,
    buttons,
    onCloseButtonClick
  } = props;

  const renderButtons = buttons => {
    return buttons.map(elem => (
      <span className={`${styles.buttonRow}`} key={elem.props.children}>
        {elem}
      </span>
    ));
  };

  const showButtonLine = buttons.length === 0 ? 'hide' : 'show';

  return (
    <div className={`${styles.background}`}>
      <div
        className={`${styles.dialogue} ${styles[className]} ${styles[size]} `}
      >
        <div className={`${styles.dialogueTop}`}>
          <div className={`${styles.dialogueHeaderText}`}>
            <Text style="H3">{header}</Text>
          </div>
          {closeButton && (
            <div onClick={onCloseButtonClick}>
              <Text style="Alt" className={`${styles.closeButton}`}>
                X
              </Text>
            </div>
          )}
        </div>
        {props.children}
        <div className={`${styles.dialogueBot} ${styles[showButtonLine]}`}>
          {renderButtons(buttons)}
        </div>
      </div>
    </div>
  );
};

Dialogue.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  closeButton: PropTypes.bool,
  buttons: PropTypes.array
};

Dialogue.defaultProps = {
  size: 'medium',
  disabled: false,
  buttons: [],
  children: '',
  closeButton: true
};

export default Dialogue;
