import React from 'react';
import ReactDOM from 'react-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
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
  state = {
    position: 'relative'
  };

  componentDidMount() {
    const body = document.getElementsByClassName('page-body')[0];
    body.addEventListener('scroll', this.onScroll);
  }

  componentWillMount() {
    const address =
      this.props.match.params.address || this.props.currentUser.public_address;
    this.props.setProfileAddress(address.toLowerCase() || '');
  }

  componentWillUnmount() {
    const body = document.getElementsByClassName('page-body')[0];
    body.removeEventListener('scroll', this.onScroll);
  }

  componentDidUpdate(prevProps) {
    const currentAddress = this.props.match.params.address;
    if (prevProps.match !== this.props.match) {
      this.props.setProfileAddress(currentAddress.toLowerCase());
    }
  }

  onScroll = () => {
    const { position } = this.state;

    const headerHeight = document
      .getElementsByClassName('page-header')[0]
      .getBoundingClientRect().height;
    const top = document
      .getElementsByClassName('explorer-body')[0]
      .getBoundingClientRect().top;
    if (top < headerHeight && position === 'relative') {
      this.setState({ position: 'fixed' });
    }

    if (top > headerHeight && position === 'fixed') {
      this.setState({ position: 'relative' });
    }
  };

  render() {
    const { error, loaded, user } = this.props;
    const { position } = this.state;

    let body = (
      <div className={styles.profileContainer}>
        <div className={`${styles.profileDetails}`}>
          <ProfileDetails />
        </div>
        <div className={styles.profileBountiesContainer}>
          <div className={styles.profileBounties}>
            <FilterNav position={position} />
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
  connect(
    mapStateToProps,
    { setProfileAddress: actions.setProfileAddress }
  )
)(ProfileComponent);

export default Profile;
