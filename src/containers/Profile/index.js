import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { LoadComponent } from 'hocs';
import ProfileDetails from './ProfileDetails';
import ProfileBounties from './ProfileBounties';
import styles from './Profile.module.scss';
import { userSelector } from 'public-modules/UserInfo/selectors';

import { actions } from 'public-modules/UserInfo';

const ProfileComponent = props => {
  // hack for now //
  let { user } = props.user;
  user = user.user || { name: '', address: '' };
  /////////////////

  return (
    <div className="fullHeight">
      <div className={`${styles.profileDetails}`}>
        <ProfileDetails user={user} />
      </div>
      <div className={styles.profileBounties}>
        <div className="row fullHeight">
          <div className={`col-xs-3 fullHeight ${styles.filterNav}`}>
            <div />
          </div>
          <div className={`col-xs-9 fullHeight ${styles.explorerBody}`}>
            <ProfileBounties />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const user = userSelector(state);
  console.log('ms2p', user);
  return {
    address: '0x60adc0f89a41af237ce73554ede170d733ec14e0',
    user: user
  };
};

const Profile = compose(
  connect(
    mapStateToProps,
    {
      load: actions.loadUserInfo
    }
  ),
  LoadComponent('address')
)(ProfileComponent);

export default Profile;
