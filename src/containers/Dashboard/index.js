import React from 'react';
import styles from './Dashboard.module.scss';
import { UserBounties, UserStats } from './components';

const Dashboard = props => {
  return (
    <div className="container-fluid">
      <div className="row center-xs">
        <div className="col-xs-10">
          <UserStats className={styles.statsContainer} />
        </div>
      </div>
      <div className="row center-xs">
        <div className="col-xs-5">
          <UserBounties />
        </div>
        <div className="col-xs-5">
          <UserBounties />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
