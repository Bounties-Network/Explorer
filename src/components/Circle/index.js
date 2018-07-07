import React from 'react';
import PropTypes from 'prop-types';
import styles from './Circle.module.scss';

import { Text, Loader } from 'components';
import Blockies from 'react-blockies';

const Circle = props => {
  let {
    type,
    input,
    size,
    color,
    textColor,
    textStyle = 'H2',
    border,
    className
  } = props;

  let textSize = 'Body';
  if (size === 'small') {
    textSize = 'Small';
  }

  if (size === 'medium') {
    textSize = 'h4';
  }

  if (size === 'large') {
    textSize = 'h3';
  }

  let circleClass = `${styles.circle} ${styles[color]} ${
    styles[size]
  } ${className}`;
  if (border) {
    circleClass += ` ${styles.hasBorder}`;
  }

  const renderText = () => {
    if (type !== 'text') {
      return null;
    }

    return (
      <div className={`${styles.text}`}>
        <Text color={textColor} typeScale={textSize}>
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

    let blockySize = 15;
    let blockyScale = 5;

    return <Blockies seed={input} size={blockySize} scale={blockyScale} />;
  };

  const renderLoading = () => {
    if (type !== 'loading') {
      return null;
    }

    let loaderSize = 'small';
    if (size === 'large') {
      loaderSize = 'medium';
    }

    return (
      <div className={`${styles.loading}`}>
        <Loader size={loaderSize} />
      </div>
    );
  };

  return (
    <div className={circleClass}>
      {renderLoading()}
      {renderText()}
      {renderImg()}
      {renderBlocky()}
    </div>
  );
};

Circle.propTypes = {
  className: PropTypes.string,
  border: PropTypes.bool,
  type: PropTypes.oneOf(['text', 'img', 'blocky', 'loading']),
  input: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  size: PropTypes.oneOf(['small', 'large']),
  color: PropTypes.oneOf(['orange', 'green', 'red', 'lightGrey']),
  textColor: PropTypes.string,
  textStyle: PropTypes.string
};

Circle.defaultProps = {
  border: false,
  type: 'text',
  size: 'small',
  color: 'white',
  textColor: 'black',
  textSize: 'h3'
};

export default Circle;
