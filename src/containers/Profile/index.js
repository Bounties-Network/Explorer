import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';
import ProfileBounties from './ProfileBounties';
import FilterNav from './FilterNav';
import styles from './Profile.module.scss';
import { ZeroState } from 'components';
import { userInfoSelector } from 'public-modules/UserInfo/selectors';
import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import { actions } from './reducer';

import { StickyContainer, Sticky } from 'react-sticky';

class ProfileComponent extends React.Component {
  constructor(props) {
    super(props);

    const { currentUser, history, match, setProfileAddress } = this.props;

    let address = match.params.address;
    if (!address) {
      address = currentUser.public_address;

      // This anti-pattern is here in the constructor in order to simplify the
      // routing logic. We were unable to use a react-router-dom redirect
      // because the user needs to still hit the /profile page if they aren't
      // logged in. Even if they were to hit that page and login it wouldn't
      // have correctly redirect because not LOCATION_CHANGED event would be
      // dispatched after logging through the login hoc.
      history.replace(`/profile/${address}/`);
    }

    setProfileAddress(address.toLowerCase());
  }

  componentDidUpdate(prevProps) {
    const currentAddress = this.props.match.params.address;
    if (prevProps.match !== this.props.match) {
      this.props.setProfileAddress(currentAddress.toLowerCase());
    }
  }

  render() {
    const { error, loaded, user } = this.props;

    let body = (
      <div className={styles.profileContainer}>
        <div className={`${styles.profileDetails}`}>
          <ProfileDetails />
        </div>
        <div className={styles.profileBountiesContainer}>
          <div className={styles.profileBounties}>
            <FilterNav />
            <ProfileBounties />
          </div>
        </div>
      </div>
    );

    if (loaded && !user) {
      body = (
        <div className={`fullHeight ${styles.zeroStateCentered}`}>
          <ZeroState
            className={styles.centeredItem}
            iconColor="blue"
            title="No User Found"
            text="Check that the address is correct and try again"
            icon={['fal', 'bolt']}
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
            icon={['fal', 'bolt']}
          />
        </div>
      );
    }

    return body;
  }
}

const mapStateToProps = state => {
  const currentUser = getCurrentUserSelector(state);
  const userInfo = userInfoSelector(state);

  return {
    currentUser,
    user: userInfo.loadedUser.user,
    loading: userInfo.loading,
    loaded: userInfo.loaded,
    error: userInfo.error
  };
};

const Profile = compose(
  withRouter,
  connect(
    mapStateToProps,
    { setProfileAddress: actions.setProfileAddress }
  )
)(ProfileComponent);

export default Profile;
