import React from 'react';
import styles from './ProfileDetails.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  FullAddressBar,
  Avatar,
  Text,
  Sort,
  Loader,
  ZeroState,
  Button
} from 'components';
import {
  About,
  Elsewhere,
  NetworkStats,
  ProfileAvatar,
  ProfileTabs,
  Skills
} from './components';
import { LoadComponent } from 'hocs';

import { map } from 'lodash';

import { actions } from 'public-modules/Bounties';

const ProfileDetailsComponent = props => {
  const { user } = props;
  return (
    <div className={styles.detailsContainer}>
      <div className={styles.userInfoContainer}>
        <ProfileAvatar
          name={user.name}
          address={user.public_address}
          img={user.profile_image}
        />
      </div>

      <div className={styles.userStatsContainer}>
        <About organization={'ConsenSys'} languages={['English, German']} />
        <Skills
          skills={[
            'Javascript',
            'React',
            'C++',
            'CSS',
            'Python',
            'Ruby',
            'Sketch',
            'RabbitMQ'
          ]}
        />
        <NetworkStats />
        <Elsewhere />
      </div>

      <div className={styles.profileTabs}>
        <ProfileTabs />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

const ProfileDetails = compose(
  connect(
    mapStateToProps,
    {}
  )
)(ProfileDetailsComponent);

export default ProfileDetails;
