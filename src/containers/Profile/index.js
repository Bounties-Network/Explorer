import React from 'react';
import ReactDOM from 'react-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';
import { ExplorerBody } from 'containers';
import { filterConfig } from './constants';
import FilterNav from 'containers/FilterNav';
import styles from './Profile.module.scss';
import { SideOverlay, ZeroState } from 'components';
import { actions as bountiesActions } from 'public-modules/Bounties';
import { actions as userInfoActions } from 'public-modules/UserInfo';
import { actions as appActions } from 'layout/App/reducer';
import { userInfoSelector } from 'public-modules/UserInfo/selectors';
import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import { rootBountiesSelector } from 'public-modules/Bounties/selectors';
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
      resetState,
      initializeFilterNav
    } = this.props;

    initializeFilterNav(filterConfig);

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
      location,
      match,
      batch,
      loadBounties,
      loadUserInfo,
      locationNonce,
      setActiveTab,
      setProfileAddress,
      resetState,
      resetFilter,
      bountiesLoading
    } = this.props;
    const { position } = this.state;

    if (
      prevProps.locationNonce !== locationNonce &&
      (history.action === 'POP' || location.search === '')
    ) {
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

    if (
      prevProps.bountiesLoading &&
      !this.props.bountiesLoading &&
      this.explorerBody &&
      position === 'fixed'
    ) {
      ReactDOM.findDOMNode(this.explorerBody).scrollIntoView(false);
    }
  }

  componentDidMount() {
    const body = document.getElementsByClassName('page-body')[0];
    body.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    const body = document.getElementsByClassName('page-body')[0];
    body.removeEventListener('scroll', this.onScroll);
    this.props.hideFilters();
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
    if (top > headerHeight + 1 && position === 'fixed') {
      this.setState({ position: 'relative' });
    }
  };

  render() {
    const { error, loaded, user, loading, showFilters } = this.props;
    const { position } = this.state;

    const profileFilterNav = (
      <FilterNav
        position={position}
        config={filterConfig.rootConfig}
        resetFilters={filterConfig.resetFilters}
        defaultStageFilters={filterConfig.defaultStageFilters}
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
            <ExplorerBody
              ref={re => {
                this.explorerBody = re;
              }}
              className={styles.explorerBody}
              onOpenFilters={showFilters}
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
            icon={['fal', 'exclamation-triangle']}
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
            icon={['fal', 'exclamation-triangle']}
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
  const bountyState = rootBountiesSelector(state);

  return {
    currentUser,
    user: userInfo.loadedUser.user,
    bountiesLoading: bountyState.loading,
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
      setProfileAddress: actions.setProfileAddress,
      showFilters: appActions.showFilterNav,
      initializeFilterNav: appActions.initializeFilterNav,
      hideFilters: appActions.resetFilterNav
    }
  )
)(ProfileComponent);

export default Profile;
