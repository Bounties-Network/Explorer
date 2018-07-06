import React from 'react';
import PropTypes from 'prop-types';
import styles from './Text.module.scss';

const Text = props => {
  const {
    className,
    typeScale,
    lineHeight,
    src,
    link,
    color,
    weight,
    id,
    noUnderline
  } = props;

  let addedClasses = '';
  if (link) {
    addedClasses += styles.Link;
    if (noUnderline) {
      addedClasses += ` ${styles.noUnderline}`;
    }

    return (
      <a
        className={`text ${className} ${styles[typeScale]} ${
          styles[lineHeight]
        } ${styles[color]} ${addedClasses}`}
        id={id}
        href={src}
        target="_blank"
      >
        {props.children}
      </a>
    );
  }

  return (
    <p
      className={`text ${className} ${styles[typeScale]} ${
        styles[lineHeight]
      } ${styles[color]} ${styles[weight]} ${addedClasses}`}
      id={id}
    >
      {props.children}
    </p>
  );
};

Text.propTypes = {
  className: PropTypes.string,
  typeScale: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'Body', 'Small']),
  lineHeight: PropTypes.oneOf(['lineHeight-default', 'lineHeight-reset']),
  src: PropTypes.string,
  link: PropTypes.bool,
  color: PropTypes.oneOf([
    'purple',
    'blue',
    'orange',
    'green',
    'red',
    'black',
    'white',
    'defaultGrey',
    'lightGrey',
    'darkGrey'
  ]),
  weight: PropTypes.oneOf([
    'fontWeight-regular',
    'fontWeight-medium',
    'fontWeight-bold'
  ])
};

Text.defaultProps = {
  typeScale: 'Body',
  src: '',
  link: false,
  weight: 'font-weight-regular',
  id: '',
  noUnderline: false
};

export default Text;
