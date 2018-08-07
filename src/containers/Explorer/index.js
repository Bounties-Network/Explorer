import React from 'react';
import FilterNav from './FilterNav';
import ExplorerBody from './ExplorerBody';
import styles from './Explorer.module.scss';

const Explorer = props => {
  return (
    <div className="container-fluid">
      <div className="row fullHeight">
        <div className={`fullHeight ${styles.filterNav}`}>
          <FilterNav />
        </div>
        <div className={`col-xs fullHeight ${styles.explorerBody}`}>
          <ExplorerBody />
        </div>
      </div>
    </div>
  );
};

export default Explorer;
