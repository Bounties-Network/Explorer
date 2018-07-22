import React from 'react';
import ProfileDetails from './ProfileDetails';
import ProfileBounties from './ProfileBounties';
import styles from './Profile.module.scss';

const Profile = props => {
  return (
    <div className="fullHeight">
      <div className={`${styles.profileDetails}`}>
        <ProfileDetails />
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

export default Profile;
