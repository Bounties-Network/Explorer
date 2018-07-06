import React from 'react';
import PropTypes from 'prop-types';
import styles from './Text.module.scss';

const Text = props => {
  const {
    className,
    typeScale,
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
      <span
        className={`text ${className} ${styles[typeScale]} ${addedClasses}`}
        id={id}
      >
        <a
          className={`${styles[color]} ${addedClasses}`}
          href={src}
          target="_blank"
        >
          {props.children}
        </a>
      </span>
    );
  }

  return (
    <span
      className={`text ${className} ${styles[typeScale]} ${styles[color]} ${
        styles[weight]
      } ${addedClasses}`}
      id={id}
    >
      {props.children}
    </span>
  );
};

Text.propTypes = {
  className: PropTypes.string,
  typeScale: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'Body', 'Small']),
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
    'font-weight-regular',
    'font-weight-medium',
    'font-weight-bold'
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
