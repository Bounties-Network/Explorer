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
import { ProfileAvatar } from './components';
import { LoadComponent } from 'hocs';
import { BountyCard } from 'explorer-components';
import { map } from 'lodash';
import {
  SORT_VALUE,
  SORT_CREATED,
  SORT_EXPIRY,
  PAGE_SIZE
} from 'public-modules/Bounties/constants';
import {
  rootBountiesSelector,
  bountiesCategoryFiltersSelector
} from 'public-modules/Bounties/selectors';
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
    </div>
  );
};

const mapStateToProps = state => {
  const bountyState = rootBountiesSelector(state);

  return {};
};

const ProfileDetails = compose(
  connect(
    mapStateToProps,
    {}
  )
)(ProfileDetailsComponent);

export default ProfileDetails;
