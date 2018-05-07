import React from 'react';
import PropTypes from 'prop-types';
import styles from './Search.module.scss';

import { Text } from 'components';

const Search = props => {
  const { onChange } = props;

  return (
    <input
      className={`${styles.search}`}
      type="text"
      placeholder="🔍  Search"
      onChange={onChange}
    />
  );
};

export default Search;
