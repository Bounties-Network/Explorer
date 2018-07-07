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
    alignment,
    style,
    id
  } = props;

  let addedClasses = '';
  if (link) {
    addedClasses += ` ${styles.Link}`;

    return (
      <a
        className={`text ${className} ${styles[typeScale]} ${
          styles[lineHeight]
        } ${styles[color]} ${styles[alignment]} ${
          styles[style]
        } ${addedClasses}`}
        id={id}
        href={src}
        target="_blank"
      >
        {props.children}
      </a>
    );
  }

  return (
    <span
      className={`text ${className} ${styles[typeScale]} ${
        styles[lineHeight]
      } ${styles[color]} ${styles[weight]} ${styles[alignment]} ${
        styles[style]
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
  ]),
  alignment: PropTypes.oneOf(['align-left', 'align-center', 'align-right']),
  style: PropTypes.oneOf(['underline', 'noUnderline', 'italic', 'uppercase'])
};

Text.defaultProps = {
  typeScale: 'Body',
  src: '',
  link: false,
  weight: 'font-weight-regular',
  id: ''
};

export default Text;
