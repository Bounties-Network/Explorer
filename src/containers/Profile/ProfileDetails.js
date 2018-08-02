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

import { map } from 'lodash';

import {
  userInfoSelector,
  loadedUserInfoSelector,
  loadedUserSelector,
  loadedUserStatsSelector
} from 'public-modules/UserInfo/selectors';
import { actions as userInfoActions } from 'public-modules/UserInfo';
import { ipfsToHttp } from 'utils/helpers';
import { profileUISelector } from './selectors';
import { actions } from './reducer';

const ProfileDetailsComponent = props => {
  const {
    loading,
    user,
    userStats,
    loadedUserInfo,
    profileUI,
    switchValue,
    toggleNetworkSwitch,
    currentTab,
    setActiveTab
  } = props;

  let bodyClass;

  let body = (
    <React.Fragment>
      <div className="row">
        <div className="col-xs-12">
          <ProfileAvatar
            name={user.name}
            address={user.public_address}
            img={ipfsToHttp(user.profileDirectoryHash, user.profileFileName)}
            className={styles.profileAvatar}
          />
        </div>
      </div>
      <div className={`row ${styles.marginBottom}`}>
        <div
          className={`col-xs-12 row ${styles.details} ${styles.centerContent}`}
        >
          <div className="col-xs-2">
            <About
              organization={user.organization}
              languages={user.languages}
            />
          </div>
          <div className="col-xs-2">
            <Skills skills={user.skills} />
          </div>
          <div className="col-xs-4">
            <NetworkStats
              stats={userStats}
              switchValue={switchValue}
              toggleNetworkSwitch={toggleNetworkSwitch}
            />
          </div>
          <div className="col-xs-2">
            <Elsewhere
              website={user.website}
              twitter={user.twitter}
              github={user.github}
              linkedin={user.linkedin}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <ProfileTabs
            currentTab={currentTab}
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
};

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
      setActiveTab: actions.setActiveTab
    }
  )
)(ProfileDetailsComponent);

export default ProfileDetails;
