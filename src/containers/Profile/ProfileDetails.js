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
import { About, ProfileAvatar } from './components';
import { LoadComponent } from 'hocs';

import { map } from 'lodash';

import { actions } from 'public-modules/Bounties';

const ProfileDetailsComponent = props => {
  return (
    <div className={styles.detailsContainer}>
      <div className={styles.userInfoContainer}>
        <ProfileAvatar
          name={'Simona Pop'}
          address={'0x1234567891011121314151617181920212223242'}
          img={'https://i.imgur.com/lhTwRZY.png'}
        />
      </div>

      <div className={styles.userStatsContainer}>
        <About />
        <About />
        <About />
        <About />
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
