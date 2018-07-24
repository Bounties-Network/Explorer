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
            <About organization={'ConsenSys'} languages={['English, German']} />
          </div>
          <div className="col-xs-2">
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
          </div>
          <div className="col-xs-4">
            <NetworkStats />
          </div>
          <div className="col-xs-2">
            <Elsewhere />
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
  return {};
};

const ProfileDetails = compose(
  connect(
    mapStateToProps,
    {}
  )
)(ProfileDetailsComponent);

export default ProfileDetails;
