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
    inputLabel,
    color,
    weight,
    alignment,
    fontStyle,
    inline,
    id,
    onClick,
    download,
    onMouseDown
  } = props;

  let addedClasses = '';
  if (inline) {
    addedClasses += ` ${styles.inline}`;

    return (
      <span
        onMouseDown={onMouseDown}
        onClick={onClick}
        className={`text ${className} ${styles[typeScale]} ${
          styles[lineHeight]
        } ${styles[color]} ${styles[weight]} ${styles[alignment]} ${
          styles[fontStyle]
        } ${addedClasses}`}
        id={id}
      >
        {props.children}
      </span>
    );
  }

  if (link) {
    addedClasses += ` ${styles.Link}`;

    return (
      <a
        onMouseDown={onMouseDown}
        className={`text ${className} ${styles[typeScale]} ${
          styles[lineHeight]
        } ${styles[color]} ${styles[alignment]} ${
          styles[fontStyle]
        } ${addedClasses}`}
        id={id}
        href={src}
        onClick={onClick}
        download={download}
      >
        {props.children}
      </a>
    );
  }

  if (inputLabel) {
    addedClasses += `${styles.inputLabel}`;

    return (
      <p
        onClick={onClick}
        onMouseDown={onMouseDown}
        className={`text ${className} ${styles[lineHeight]} ${styles[color]} ${
          styles[weight]
        } ${styles[alignment]} ${addedClasses}`}
        id={id}
      >
        {props.children}
      </p>
    );
  }

  return (
    <p
      onMouseDown={onMouseDown}
      className={`text ${className} ${styles[typeScale]} ${
        styles[lineHeight]
      } ${styles[color]} ${styles[weight]} ${styles[alignment]} ${
        styles[fontStyle]
      } ${addedClasses}`}
      id={id}
      onClick={onClick}
    >
      {props.children}
    </p>
  );
};

Text.propTypes = {
  className: PropTypes.string,
  typeScale: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'Body', 'Small']),
  lineHeight: PropTypes.oneOf([
    'lineHeight-default',
    'lineHeight-small',
    'lineHeight-reset'
  ]),
  inline: PropTypes.bool,
  src: PropTypes.string,
  link: PropTypes.bool,
  onClick: PropTypes.func,
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
  fontStyle: PropTypes.oneOf([
    'underline',
    'noUnderline',
    'italic',
    'uppercase'
  ])
};

Text.defaultProps = {
  typeScale: 'Body',
  onClick: () => {},
  onMouseDown: () => {},
  src: null,
  link: false,
  weight: 'fontWeight-regular',
  id: ''
};

export default Text;
