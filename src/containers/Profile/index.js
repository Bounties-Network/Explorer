import React from 'react';
import ProfileDetails from './ProfileDetails';
import styles from './Profile.module.scss';

const Profile = props => {
  return (
    <div className="fullHeight">
      <div className={`${styles.profileDetails}`}>
        <ProfileDetails />
      </div>
    </div>
  );
};

export default Profile;
