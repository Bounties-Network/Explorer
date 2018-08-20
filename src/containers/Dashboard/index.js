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

class Dashboard extends React.Component {
  render() {
    var settings = {
      dots: true,
      arrows: false
    };
    return (
      <div>
        <div className={`container-fluid ${styles.desktopContainer}`}>
          <div className="row center-xs">
            <div className="col-xs-10">
              <UserStats className={styles.statsContainer} />
            </div>
          </div>
          <div className="row center-xs">
            <div className="col-xs-5">
              <BountiesPanel
                className={styles.bountiesPanel}
                bodyClass={styles.bodyClass}
              />
            </div>
            <div className="col-xs-5">
              <ActivityPanel
                className={styles.activityPanel}
                bodyClass={styles.bodyClass}
              />
            </div>
          </div>
          <div className="row center-xs">
            <div className="col-xs-10">
              <SubmissionsPanel
                className={styles.submissionsPanel}
                bodyClass={styles.bodyClass}
              />
            </div>
          </div>
        </div>
        <div className={styles.mobileContainer}>
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
        </div>
      </div>
    );
  }
}

export default Dashboard;
