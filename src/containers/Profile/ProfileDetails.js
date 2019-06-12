import React from 'react';
import styles from './ProfileDetails.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Loader } from 'components';
import {
  About,
  Elsewhere,
  NetworkStats,
  ProfileAvatar,
  ProfileTabs,
  Skills
} from './components';

import {
  userInfoSelector,
  loadedUserInfoSelector,
  loadedUserSelector,
  loadedUserStatsSelector
} from 'public-modules/UserInfo/selectors';
import { profileUISelector } from './selectors';
import { actions } from './reducer';

class ProfileDetailsComponent extends React.Component {
  constructor(props) {
    super(props);

    // Don't use state, this is a set-and-forget, once-only check.
    // We don't want to involve the lifecycle of the component at all,
    // only as a "first load" concept to avoid a visual toggle of the switch.
    this.networkSwitchAlreadySet = undefined;
  }

  mostInterestingStats() {
    const { userStats, switchValue, switchValueOverride } = this.props;

    if (switchValueOverride) {
      return switchValueOverride;
    } else {
      if (
        userStats.fulfiller.total === 0 &&
        userStats.issuer.total === 0 &&
        userStats.fulfiller.acceptance
      ) {
        return 'fulfiller';
      } else if (userStats.fulfiller.total > userStats.issuer.total) {
        return 'fulfiller';
      }
    }

    return switchValue;
  }

  componentDidUpdate(prevProps) {
    if (!this.networkSwitchAlreadySet) {
      const {
        switchValue,
        switchValueOverride,
        toggleNetworkSwitch,
        setActiveTab
      } = this.props;

      const mostInterestingStats = this.mostInterestingStats();
      if (mostInterestingStats !== switchValue) {
        this.networkSwitchAlreadySet = mostInterestingStats;
        toggleNetworkSwitch();
        setActiveTab();
      } else if (switchValueOverride) {
        this.networkSwitchAlreadySet = mostInterestingStats;
      }
    }
  }

  render() {
    const {
      loading,
      user,
      userStats,
      loadedUserInfo,
      switchValue,
      toggleNetworkSwitch,
      currentTab,
      setActiveTab,
      setReviewsModalVisible
    } = this.props;

    let newSwitchValue = switchValue;
    if (!this.networkSwitchAlreadySet) {
      newSwitchValue = this.mostInterestingStats();
    }

    let bodyClass;

    let defaultTab =
      loadedUserInfo.stats.total_bounties >
      loadedUserInfo.stats.total_fulfillments
        ? 'issued'
        : 'fulfilled';
    let body = (
      <React.Fragment>
        <ProfileAvatar
          name={user.name}
          address={user.public_address}
          img={user.large_profile_image_url}
          className={styles.profileAvatar}
        />
        <div className={styles.details}>
          <div className={`${styles.detailsSection} ${styles.detailsStats}`}>
            <NetworkStats
              stats={userStats}
              switchValue={newSwitchValue}
              toggleNetworkSwitch={toggleNetworkSwitch}
              address={user.public_address}
              setReviewsModalVisible={setReviewsModalVisible}
            />
          </div>
          {!!user.skills &&
            !!user.skills.length && (
              <div
                className={`${styles.detailsSection} ${styles.detailsSkills}`}
              >
                <Skills skills={user.skills} />
              </div>
            )}
          {(!!user.organization ||
            (user.languages && !!user.languages.length)) && (
            <div className={`${styles.detailsSection} ${styles.detailsAbout}`}>
              <About
                organization={user.organization}
                languages={user.languages}
              />
            </div>
          )}
          {(user.website || user.twitter || user.github || user.linkedin) && (
            <div
              className={`${styles.detailsSection} ${styles.detailsElsewhere}`}
            >
              <Elsewhere
                website={user.website}
                twitter={user.twitter}
                github={user.github}
                linkedin={user.linkedin}
              />
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-xs-12">
            <ProfileTabs
              currentTab={currentTab}
              defaultTab={defaultTab}
              setActiveTab={setActiveTab}
              issuedCount={loadedUserInfo.stats.total_bounties || 0}
              fulfilledCount={loadedUserInfo.stats.total_fulfillments || 0}
            />
          </div>
        </div>
      </React.Fragment>
    );

    if (loading) {
      bodyClass = styles.bodyLoading;
      body = <Loader color="blue" size="medium" />;
    }

    return <div className={`col-xs-12 fullHeight ${bodyClass}`}>{body}</div>;
  }
}

const mapStateToProps = state => {
  const userInfo = userInfoSelector(state);
  const loadedUserInfo = loadedUserInfoSelector(state);
  const loadedUser = loadedUserSelector(state);
  const profileUI = profileUISelector(state);
  const userStats = loadedUserStatsSelector(state);

  return {
    loading: userInfo.loading,
    user: loadedUser,
    userStats,
    switchValue: profileUI.switchValue,
    currentTab: profileUI.currentTab,
    loadedUserInfo
  };
};

const ProfileDetails = compose(
  connect(
    mapStateToProps,
    {
      toggleNetworkSwitch: actions.toggleNetworkSwitch,
      setActiveTab: actions.setActiveTab,
      setReviewsModalVisible: actions.setReviewsModalVisible
    }
  )
)(ProfileDetailsComponent);

export default ProfileDetails;
