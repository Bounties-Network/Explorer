import React from 'react';
import FilterNav from './FilterNav';
import ExplorerBody from './ExplorerBody';
import styles from './Explorer.module.scss';

const Explorer = props => {
  return (
    <div className={`${styles.explorerContainer}`}>
      <FilterNav />
      <ExplorerBody />
    </div>
  );
};

export default Explorer;
