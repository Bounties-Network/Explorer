import React from 'react';
import styles from './ProfileDetails.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
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
  loadedUserSelector,
  loadedUserStatsSelector
} from 'public-modules/UserInfo/selectors';
import { profileUISelector } from './selectors';
import { actions as userInfoActions } from 'public-modules/UserInfo';
import { actions } from './reducer';

const ProfileDetailsComponent = props => {
  const {
    user,
    userStats,
    profileUI,
    switchValue,
    toggleNetworkSwitch
  } = props;

  if (!user) {
    return <div />;
  }

  return (
    <div className="col-xs-12 fullHeight">
      <div className="row">
        <div className="col-xs-12">
          <ProfileAvatar
            name={user.name}
            address={user.public_address}
            img={user.profile_image}
            className={styles.profileAvatar}
          />
        </div>
      </div>
      <div className={`row ${styles.marginBottom}`}>
        <div className={`col-xs-12 row ${styles.centerContent}`}>
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
          <ProfileTabs />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const userInfo = userInfoSelector(state);
  const loadedUser = loadedUserSelector(state);
  const profileUI = profileUISelector(state);
  const userStats = loadedUserStatsSelector(state);

  return {
    userInfo,
    user: loadedUser,
    userStats,
    switchValue: profileUI.switchValue
  };
};

const ProfileDetails = compose(
  connect(
    mapStateToProps,
    {
      toggleNetworkSwitch: actions.toggleNetworkSwitch
    }
  )
)(ProfileDetailsComponent);

export default ProfileDetails;
