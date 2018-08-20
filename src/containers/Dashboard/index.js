import React from 'react';
import styles from './Dashboard.module.scss';
import {
  ActivityPanel,
  BountiesPanel,
  SubmissionsPanel,
  UserStats
} from 'containers';

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
          <BountiesPanel className={styles.bountiesPanel} />
        </div>
        <div className="col-xs-5">
          <ActivityPanel className={styles.activityPanel} />
        </div>
      </div>
      <div className="row center-xs">
        <div className="col-xs-10">
          <SubmissionsPanel className={styles.submissionsPanel} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
