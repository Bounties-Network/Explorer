import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { LoadComponent } from 'hocs';
import ProfileDetails from './ProfileDetails';
import ProfileBounties from './ProfileBounties';
import FilterNav from './FilterNav';
import styles from './Profile.module.scss';
import { ZeroState } from 'components';
import {
  userInfoSelector,
  loadedUserSelector,
  loadedUserStatsSelector
} from 'public-modules/UserInfo/selectors';
import { rootProfileUISelector } from './selectors';
import { actions as userInfoActions } from 'public-modules/UserInfo';
import { actions } from './reducer';

import { StickyContainer, Sticky } from 'react-sticky';

class ProfileComponent extends React.Component {
  componentWillMount() {
    this.props.setProfileAddress(
      this.props.match.params.address.toLowerCase() || ''
    );
  }

  render() {
    const { error, loaded, loading, user } = this.props;

    let body = (
      <div className="fullHeight">
        <div className={`${styles.profileDetails}`}>
          <ProfileDetails />
        </div>
        <StickyContainer>
          <div className={styles.profileBounties}>
            <div className="row fullHeight">
              <div className={`col-xs-3 fullHeight`}>
                <Sticky topOffset={-50}>
                  {({ style }) => (
                    <div
                      className={styles.filterNav}
                      style={{
                        transform: style.transform,
                        position: style.position,
                        top: 50
                      }}
                    >
                      <FilterNav />
                    </div>
                  )}
                </Sticky>
              </div>
              <div className={`col-xs-9 fullHeight ${styles.explorerBody}`}>
                <ProfileBounties />
              </div>
            </div>
          </div>
        </StickyContainer>
      </div>
    );

    if (loaded && !user) {
      body = (
        <div className={`fullHeight ${styles.zeroStateCentered}`}>
          <ZeroState
            className={styles.centeredItem}
            iconColor="black"
            title="No User Found"
            text="Check the address is correct and try again"
          />
        </div>
      );
    }

    if (error) {
      body = (
        <div className={`fullHeight ${styles.zeroStateCentered}`}>
          <ZeroState
            className={styles.centeredItem}
            iconColor="red"
            title="Error"
            text="Please try again"
          />
        </div>
      );
    }

    return body;
  }
}

const mapStateToProps = state => {
  const userInfo = userInfoSelector(state);

  return {
    user: userInfo.loadedUser.user,
    loading: userInfo.loading,
    loaded: userInfo.loaded,
    error: userInfo.error
  };
};

const Profile = compose(
  connect(
    mapStateToProps,
    { setProfileAddress: actions.setProfileAddress }
  )
)(ProfileComponent);

export default Profile;
