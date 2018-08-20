import React from 'react';
import styles from './Dashboard.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
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

class MobileDashboard extends React.Component {
  render() {
    var settings = {
      dots: false,
      arrows: false
    };
    return (
      <Slider {...settings}>
        <div>
          <BountiesPanel bodyClass={styles.bodyClass} />
        </div>
        <div>
          <ActivityPanel bodyClass={styles.bodyClass} />
        </div>
        <div>
          <SubmissionsPanel bodyClass={styles.bodyClass} />
        </div>
      </Slider>
    );
  }
}

export default MobileDashboard;
