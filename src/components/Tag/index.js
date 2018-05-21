import React from 'react';
import PropTypes from 'prop-types';
import styles from './Tag.module.scss';

import { Text } from 'components';

const Tag = props => {
  const { onXClick } = props;

  return (
    <span className={`${styles.tag}`}>
      <Text>{props.children}</Text>
      <div onClick={onXClick} className={`${styles.x}`}>
        <Text color="blue">x</Text>
      </div>
    </span>
  );
};

Tag.PropTypes = {
  onXClick: PropTypes.function
};

export default Tag;
