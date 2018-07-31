import React from 'react';
import styles from './Dashboard.module.scss';
import { UserStats } from './components';

const Dashboard = props => {
  return (
    <div className="container-fluid">
      <div className="row center-xs">
        <div className="col-xs-11">
          <UserStats className={styles.statsContainer} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
