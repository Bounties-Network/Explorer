import React from 'react';
import PropTypes from 'prop-types';
import styles from './Circle.module.scss';

import { Text } from 'components';
import Blockies from 'react-blockies';

const Circle = props => {
  let { type, input, size, color, textColor, textStyle = 'H2', border } = props;

  let textSize = 'Body';
  if (size === 'small') {
    textSize = 'BodySmall';
  }

  if (size === 'large') {
    textSize = 'H1';
  }

  let circleClass = `${styles.circle} ${styles[color]} ${styles[size]}`;
  if (border) {
    circleClass += ` ${styles.border}`;
  }

  const renderText = () => {
    if (type !== 'text') {
      return null;
    }

    return (
      <div className={`${styles.text}`}>
        <Text color={textColor} type={textSize}>
          {input}
        </Text>
      </div>
    );
  };

  const renderImg = () => {
    if (type !== 'img') {
      return null;
    }

    return <img className={`${styles.img}`} src={input} alt="circle" />;
  };

  const renderBlocky = () => {
    if (type !== 'blocky') {
      return null;
    }

    let blockySize = 25;
    let blockyScale = 4;
    if (size === 'small') {
      blockySize = 13;
      blockyScale = 4;
    }
    if (size === 'large') {
      blockySize = 40;
      blockyScale = 5;
    }

    return <Blockies seed={input} size={blockySize} scale={blockyScale} />;
  };

  return (
    <div className={circleClass}>
      {renderText()}
      {renderImg()}
      {renderBlocky()}
    </div>
  );
};

Circle.propTypes = {
  border: PropTypes.bool,
  type: PropTypes.oneOf(['text', 'img', 'blocky']),
  input: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf(['purple', 'blue', 'orange', 'green', 'red', 'white']),
  textColor: PropTypes.string,
  textStyle: PropTypes.string
};

Circle.defaultProps = {
  border: false,
  type: 'text',
  size: 'medium',
  color: 'white',
  textColor: 'black',
  textStyle: 'H2'
};

export default Circle;
