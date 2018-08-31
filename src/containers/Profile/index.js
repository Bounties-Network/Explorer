import React from 'react';
import ReactDOM from 'react-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';
import { ExplorerBody } from 'containers';
import FilterNav from 'containers/FilterNav';
import styles from './Profile.module.scss';
import { SideOverlay, ZeroState } from 'components';
import { actions as bountiesActions } from 'public-modules/Bounties';
import { actions as userInfoActions } from 'public-modules/UserInfo';
import { userInfoSelector } from 'public-modules/UserInfo/selectors';
import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import { locationNonceSelector } from 'layout/App/selectors';
import { actions } from './reducer';

import { StickyContainer, Sticky } from 'react-sticky';

class ProfileComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileFilterVisible: false,
      position: 'relative'
    };

    const {
      currentUser,
      history,
      match,
      loadUserInfo,
      setActiveTab,
      setProfileAddress,
      resetState
    } = this.props;

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

    resetState();
    loadUserInfo(address.toLowerCase());
    setProfileAddress(address.toLowerCase());
    setActiveTab('issued');
  }

  componentDidUpdate(prevProps) {
    const {
      currentUser,
      history,
      match,
      batch,
      loadBounties,
      loadUserInfo,
      locationNonce,
      setActiveTab,
      setProfileAddress,
      resetState,
      resetFilter
    } = this.props;

    if (prevProps.locationNonce !== locationNonce) {
      batch(true);
      resetFilter('sort');
      resetFilter('stage');
      loadBounties(true);
    }

    let address = match.params.address;
    if (prevProps.match.params.address !== address) {
      if (!address) {
        address = currentUser.public_address;
        history.replace(`/profile/${address}/`);
      }

      resetState();
      loadUserInfo(address.toLowerCase());
      setProfileAddress(address.toLowerCase());
      setActiveTab('issued');
    }
  }

  componentDidMount() {
    const body = document.getElementsByClassName('page-body')[0];
    body.scrollTo(0, 0); // ensure profile is scrolled to the top on mount
    body.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    const body = document.getElementsByClassName('page-body')[0];
    body.removeEventListener('scroll', this.onScroll);
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

    const profileFilterNav = (
      <FilterNav
        position={position}
        config={{
          sort: true,
          search: false,
          stage: true,
          difficulty: false,
          category: false,
          platform: false
        }}
        resetFilters={{
          address: false,
          search: true,
          stage: true,
          difficulty: true,
          category: true,
          platform: true
        }}
        defaultStageFilters={{
          active: false,
          completed: false,
          expired: false,
          dead: false
        }}
      />
    );

    let body = (
      <div className={styles.profileContainer}>
        <div className={`${styles.profileDetails}`}>
          <ProfileDetails />
        </div>
        <div className={styles.profileBountiesContainer}>
          <div className={styles.profileBounties}>
            <div className={styles.desktopFilter}>{profileFilterNav}</div>
            <div className={styles.mobileFilter}>
              <SideOverlay
                hasMask
                visible={this.state.mobileFilterVisible}
                theme="light"
                position="right"
                onClose={() => this.setState({ mobileFilterVisible: false })}
              >
                <div className={styles.filterWrapper}>{profileFilterNav}</div>
              </SideOverlay>
            </div>

            <ExplorerBody
              className={styles.explorerBody}
              onOpenFilters={() => this.setState({ mobileFilterVisible: true })}
            />
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
    error: userInfo.error,
    locationNonce: locationNonceSelector(state)
  };
};

const Profile = compose(
  withRouter,
  connect(
    mapStateToProps,
    {
      loadBounties: bountiesActions.loadBounties,
      batch: bountiesActions.batch,
      resetState: bountiesActions.resetState,
      resetFilter: bountiesActions.resetFilter,
      loadUserInfo: userInfoActions.loadUserInfo,
      setActiveTab: actions.setActiveTab,
      setProfileAddress: actions.setProfileAddress
    }
  )
)(ProfileComponent);

export default Profile;
