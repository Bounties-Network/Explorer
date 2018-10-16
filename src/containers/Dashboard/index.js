import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './Dashboard.module.scss';
import '../../styles/slick.scss';
import '../../styles/slick-theme.scss';
import Slider from 'react-slick';
import {
  ActivityPanel,
  BountiesPanel,
  SubmissionsPanel,
  UserStats
} from 'containers';
import { Text, PageBanner, ProgressBar } from 'components';
import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import { profileStrengthSelector } from 'containers/Profile/selectors';
import { actions as activityActions } from 'public-modules/Activity';
import { actions as bountiesActions } from 'public-modules/Bounties';
import { actions as draftsActions } from 'public-modules/Drafts';
import { actions as userInfoActions } from 'public-modules/UserInfo';
import { SORT_CREATED } from 'public-modules/Bounties/constants';

import { actions as submissionsPanelActions } from 'containers/SubmissionsPanel/reducer';

class DashboardComponent extends React.Component {
  constructor(props) {
    super(props);

    const {
      // general loaders
      loadActivity,
      loadBounties,
      loadDrafts,
      loadUserInfo,

      // bounties panel helpers
      resetState,
      addIssuerFilter,
      toggleStageFilter,
      setSort,
      public_address,

      // submissions panel helpers
      setActiveSubmissionsTab
    } = props;

    // load bounties panel
    resetState();
    addIssuerFilter(public_address);
    toggleStageFilter('active');
    setSort(SORT_CREATED, 'desc');
    loadBounties(true);
    loadDrafts();

    // load activity panel
    loadActivity(public_address);

    // load submissions panel
    loadUserInfo(public_address);
    setActiveSubmissionsTab('received');
  }

  render() {
    const { profileStrength, history } = this.props;

    var settings = {
      dots: true,
      arrows: false
    };

    const profileStrengthBanner =
      50 === 100 ? null : (
        <PageBanner wrapClass="pageWrapper-large">
          <div className={`${styles.profileStrength}`}>
            <Text typeScale="Small" color="defaultGrey" inline>
              Profile strength
            </Text>
            <ProgressBar
              className={`${styles.profileStrengthProgress}`}
              color="purple"
              percent={25}
            />
            <Text
              link
              fontStyle="underline"
              onClick={() => {
                history.push('/settings');
              }}
            >
              Edit profile
            </Text>
          </div>
        </PageBanner>
      );

    return (
      <div>
        {profileStrengthBanner}
        <div className={`pageWrapper-large ${styles.desktopContainer}`}>
          <UserStats />
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
          <UserStats />
          <Slider {...settings}>
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
    public_address,
    profileStrength: profileStrengthSelector(state)
  };
};

const Dashboard = compose(
  connect(
    mapStateToProps,
    {
      loadActivity: activityActions.loadActivity,
      loadBounties: bountiesActions.loadBounties,
      loadDrafts: draftsActions.loadDrafts,
      loadUserInfo: userInfoActions.loadUserInfo,
      resetState: bountiesActions.resetState,
      addIssuerFilter: bountiesActions.addIssuerFilter,
      toggleStageFilter: bountiesActions.toggleStageFilter,
      setSort: bountiesActions.setSort,
      setActiveSubmissionsTab: submissionsPanelActions.setActiveTab,

      activeLoadMore: bountiesActions.loadMoreBounties,
      draftsLoadMore: draftsActions.loadMoreDrafts
    }
  )
)(DashboardComponent);

export default Dashboard;
