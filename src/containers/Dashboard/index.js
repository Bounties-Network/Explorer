import React from 'react';
import styles from './Dashboard.module.scss';
import {
  ActivityPanel,
  BountiesPanel,
  SubmissionsPanel,
  UserStats
} from './components';

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
          <BountiesPanel />
        </div>
        <div className="col-xs-5">
          <ActivityPanel />
        </div>
      </div>
      <div className={`center-xs ${styles.submissionsFlex}`}>
        <div className="col-xs-10">
          <SubmissionsPanel className={styles.submissionsContainer} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
