import { hot } from 'react-hot-loader/root';
import React from 'react';
import styles from './App.module.scss';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { SEOHeader } from './SEOHeader';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { map } from 'lodash';
import {
  hasWalletSelector,
  initializedSelector,
  walletLockedSelector
} from 'public-modules/Client/selectors';
import { NAV_ITEMS } from './constants';
import {
  Bounty,
  CreateBounty,
  Dashboard,
  Explorer,
  Leaderboard,
  Login,
  Profile,
  Settings
} from 'containers';
import { RequireLoginComponent } from 'hocs';
import {
  Dropdown,
  Loader,
  Network,
  Sidebar,
  SideOverlay,
  Text,
  ToastContainer
} from 'components';
import { BountyFilterNav } from 'containers/FilterNav';
import { Header, Privacy, TOS } from 'layout';
import { rootAppSelector } from './selectors';
import { actions as appActions } from './reducer';
import { actions as authActions } from 'public-modules/Authentication';
import { actions as categoryActions } from 'public-modules/Categories';
import { actions as translationActions } from 'public-modules/i18n';
import { getCurrentUserStateSelector } from 'public-modules/Authentication/selectors';
import { currentRouteSelector, scrollToTop } from 'utils/helpers';
import { translationSelector } from 'public-modules/i18n/selectors';

import '../../styles/flexboxgrid.css';
import { faInfoCircle } from '@fortawesome/pro-regular-svg-icons';

const { DropdownTrigger, DropdownContent, MenuItem } = Dropdown;

class HeaderComponent extends React.Component {
  state = {
    showMobileSidebar: false
  };

  renderSideNavItems() {
    return map(navItem => {
      return <Sidebar.TabIcon {...navItem} key={navItem.tabKey} />;
    }, NAV_ITEMS);
  }

  componentDidUpdate(prevProps) {
    const {
      location: { pathname }
    } = this.props;

    if (prevProps.location.pathname !== pathname) {
      scrollToTop();
      this.setState({ showMobileSidebar: false });
    }
  }

  render() {
    const { showMobileSidebar } = this.state;
    const { history, network, location, hasWallet, walletLocked } = this.props;

    return (
      <React.Fragment>
        <SEOHeader />
        <Header onShowNav={() => this.setState({ showMobileSidebar: true })} />
        <Sidebar
          activeTab={currentRouteSelector(location.pathname)}
          defaultActiveTab="dashboard"
          className={styles.sideNav}
          onTabClick={route => {
            history.push(route);
            scrollToTop();
            this.setState({ showMobileSidebar: false });
          }}
          mobileVisible={showMobileSidebar}
          onMobileHide={() => this.setState({ showMobileSidebar: false })}
        >
          <Sidebar.TabGroup>{this.renderSideNavItems()}</Sidebar.TabGroup>
          <Sidebar.Footer>
            {hasWallet &&
              !walletLocked && (
                <div className={styles.network}>
                  <Network network={network} theme="light" />
                </div>
              )}
            <div className={styles.subNav}>
              <Text
                link
                color="white"
                className={styles.subNavLink}
                typeScale="h5"
                onClick={() => history.push('/privacy')}
              >
                Privacy policy
              </Text>
              <Text
                link
                color="white"
                className={styles.subNavLink}
                typeScale="h5"
                onClick={() => history.push('/tos')}
              >
                Terms of service
              </Text>
            </div>
            <div className={styles.tosDropdownWrapper}>
              <Dropdown
                position="right"
                animateDirection="right"
                hideOnClick
                hoverTrigger
                className={styles.tosDropdown}
                containerClass={styles.dropdownContainer}
              >
                <DropdownTrigger>
                  <Sidebar.TabIcon icon={faInfoCircle} />
                </DropdownTrigger>
                <DropdownContent className={styles.tosDropdown}>
                  <MenuItem onClick={() => history.push('/privacy')}>
                    Privacy Policy
                  </MenuItem>
                  <MenuItem onClick={() => history.push('/tos')}>
                    Terms of Service
                  </MenuItem>
                </DropdownContent>
              </Dropdown>
            </div>
          </Sidebar.Footer>
        </Sidebar>
      </React.Fragment>
    );
  }
}

const mapHeaderStateToProps = state => {
  return {
    walletLocked: walletLockedSelector(state),
    hasWallet: hasWalletSelector(state),
    network: state.client.network
  };
};

const PageHeader = compose(
  withRouter,
  connect(mapHeaderStateToProps)
)(HeaderComponent);

class FilterNavComponent extends React.Component {
  render() {
    const { showNav, config, hideFilterNav } = this.props;

    return (
      <div className={styles.mobileFilter}>
        <SideOverlay
          hasMask
          visible={showNav}
          theme="light"
          position="right"
          onClose={hideFilterNav}
        >
          <div className={styles.filterWrapper}>
            <BountyFilterNav
              config={config.rootConfig ? config.rootConfig : undefined}
              resetFilters={
                config.resetFilters ? config.resetFilters : undefined
              }
              defaultStageFilters={
                config.defaultStageFilters
                  ? config.defaultStageFilters
                  : undefined
              }
            />
          </div>
        </SideOverlay>
      </div>
    );
  }
}

const mapFilterNavStateToProps = state => {
  const appState = rootAppSelector(state);
  return {
    config: appState.filterConfig,
    showNav: appState.showFilterNav
  };
};

const PageFilterNav = compose(
  connect(
    mapFilterNavStateToProps,
    {
      hideFilterNav: appActions.hideFilterNav
    }
  )
)(FilterNavComponent);

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.body = React.createRef();
    props.loadTranslation();
  }

  currentRouteSelector = () => {
    const { pathname } = this.props.location;
    return pathname.split('/')[1] || '';
  };

  render() {
    const {
      loadingUser,
      clientInitialized,
      userFail,
      translationsLoading
    } = this.props;
    const isPageLoading =
      loadingUser || translationsLoading || !clientInitialized;

    return (
      <div className={styles.app}>
        <ToastContainer
          newestOnTop
          autoClose={false}
          hideProgressBar
          draggable
        />
        {isPageLoading && (
          <div className={`${styles.loadingBody}`}>
            {' '}
            <Loader size="medium" />
          </div>
        )}
        {!isPageLoading &&
          !userFail && (
            <React.Fragment>
              <PageHeader />
              <PageFilterNav />
              <div className={`${styles.body} page-body`} ref={this.body}>
                <Switch>
                  <Route exact path="/leaderboard" component={Leaderboard} />
                  <Route exact path="/explorer" component={Explorer} />
                  <Route
                    exact
                    path="/createBounty"
                    component={RequireLoginComponent(CreateBounty)}
                  />
                  <Route
                    exact
                    path="/createBounty/draft/:id/"
                    component={RequireLoginComponent(CreateBounty)}
                  />
                  <Route
                    exact
                    path="/editBounty/:id/"
                    component={RequireLoginComponent(CreateBounty)}
                  />
                  <Route exact path="/bounty/draft/:id/" component={Bounty} />
                  <Route exact path="/bounty/:id/" component={Bounty} />
                  <Route
                    exact
                    path="/settings"
                    component={RequireLoginComponent(Settings)}
                  />
                  <Route
                    exact
                    path="/dashboard"
                    component={RequireLoginComponent(Dashboard)}
                  />
                  <Route exact path="/profile/:address/" component={Profile} />
                  <Route
                    exact
                    path="/profile/"
                    component={RequireLoginComponent(Profile)}
                  />
                  <Route exact path="/privacy" component={Privacy} />
                  <Route exact path="/tos" component={TOS} />
                  <Redirect from="/" to="/explorer" />
                </Switch>
              </div>
            </React.Fragment>
          )}
        <Login />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const currentUserState = getCurrentUserStateSelector(state);
  const translationState = translationSelector(state);
  return {
    clientInitialized: initializedSelector(state),
    loadingUser: currentUserState.loading || !currentUserState.loaded,
    translationsLoading: translationState.loading || !translationState.loaded,
    userFail: currentUserState.error
  };
};

const App = compose(
  withRouter,
  connect(
    mapStateToProps,
    {
      getCurrentUser: authActions.getCurrentUser,
      loadCategories: categoryActions.loadCategories,
      loadTranslation: translationActions.initTranslations
    }
  )
)(AppComponent);

export default hot(App);
