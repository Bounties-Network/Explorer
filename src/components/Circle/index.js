import React from 'react';
import PropTypes from 'prop-types';
import styles from './Circle.module.scss';

import { Text } from 'components';

const Circle = props => {
  const { type, input, size, color, textColor, textStyle = 'H2' } = props;

  return (
    <div className={`${styles.circle} ${styles[color]} ${styles[size]}`}>
      {type === 'text' ? (
        <div className={`${styles.text}`}>
          <Text color={textColor} style={textStyle}>
            {input}
          </Text>
        </div>
      ) : (
        <img className={`${styles.img}`} src={input} alt="circle" />
      )}
    </div>
  );
};

Circle.propTypes = {
  type: PropTypes.oneOf(['text', 'image']),
  input: PropTypes.string,
  size: PropTypes.oneOf(['mini', 'small', 'medium', 'large']),
  color: PropTypes.oneOf(['purple', 'blue', 'orange', 'green', 'red', 'white']),
  textColor: PropTypes.oneOf([
    'purple',
    'blue',
    'orange',
    'green',
    'red',
    'black',
    'white',
    'grey'
  ]),
  textStyle: PropTypes.oneOf([
    'H1',
    'H2',
    'H3',
    'H4',
    'CardHeading',
    'Body',
    'BodySmall',
    'FormLabel',
    'FormInvalid',
    'Alt'
  ])
};

Circle.defaultProps = {
  type: 'text',
  input: '',
  size: 'medium',
  color: 'white',
  textColor: 'black',
  textStyle: 'H2'
};

export default Circle;
