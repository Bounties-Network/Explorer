import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
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

import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import { actions as activityActions } from 'public-modules/Activity';
import { actions as bountiesPanelActions } from 'containers/BountiesPanel/reducer';
import { actions as submissionsPanelActions } from 'containers/SubmissionsPanel/reducer';

class DashboardComponent extends React.Component {
  constructor(props) {
    super(props);
    props.loadActivityPanel(props.public_address);
    props.loadBountiesPanel();
    props.loadSubmissionsPanel();
  }

  render() {
    var settings = {
      dots: true,
      arrows: false
    };
    return (
      <div>
        <div className={`pageWrapper-large ${styles.desktopContainer}`}>
          <UserStats className={styles.statsContainer} />
          <div className={styles.panelContainer}>
            <BountiesPanel
              className={styles.bountiesPanel}
              bodyClass={styles.bodyClass}
            />
            <ActivityPanel
              className={styles.activityPanel}
              bodyClass={styles.bodyClass}
            />
            <SubmissionsPanel
              className={styles.submissionsPanel}
              bodyClass={styles.bodyClass}
            />
          </div>
        </div>
        <div className={styles.mobileContainer}>
          <UserStats className={styles.statsContainer} />
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

const mapStateToProps = state => {
  const currentUser = getCurrentUserSelector(state);
  const { public_address } = currentUser;

  return {
    public_address
  };
};

const Dashboard = compose(
  connect(
    mapStateToProps,
    {
      loadSubmissionsPanel: submissionsPanelActions.loadSubmissionsPanel,
      loadBountiesPanel: bountiesPanelActions.loadBountiesPanel,
      loadActivityPanel: activityActions.loadActivity
    }
  )
)(DashboardComponent);

export default Dashboard;
