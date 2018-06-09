import React from 'react';
import PropTypes from 'prop-types';
import styles from './Text.module.scss';

const Text = props => {
  const { className, style, src, link, color, id, noUnderline } = props;

  let addedClasses = '';
  if (link) {
    addedClasses += styles.Link;
    if (noUnderline) {
      addedClasses += ` ${styles.noUnderline}`;
    }

    return (
      <span
        className={`text ${className} ${styles[style]} ${addedClasses}`}
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
      className={`text ${className} ${styles[style]} ${
        styles[color]
      } ${addedClasses}`}
      id={id}
    >
      {props.children}
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
    'Small',
    'FormLabel',
    'FormInvalid',
    'Alt'
  ]),
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
    'grey',
    'lightGrey',
    'darkGrey'
  ])
};

Text.defaultProps = {
  size: 'body',
  src: '',
  link: false,
  id: '',
  noUnderline: false
};

export default Text;
