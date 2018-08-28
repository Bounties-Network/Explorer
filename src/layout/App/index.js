import React from 'react';
import styles from './App.module.scss';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { NAV_ITEMS } from './constants';
import {
  Explorer,
  Dashboard,
  Bounty,
  Leaderboard,
  Login,
  CreateBounty,
  Profile,
  Settings
} from 'containers';
import { RequireLoginComponent } from 'hocs';
import { Sidebar, Loader, ToastContainer, Network } from 'components';
import { Header } from 'layout';
import { actions as authActions } from 'public-modules/Authentication';
import { actions as categoryActions } from 'public-modules/Categories';
import { initializedSelector } from 'public-modules/Client/selectors';
import { getCurrentUserStateSelector } from 'public-modules/Authentication/selectors';
import { currentRouteSelector } from 'utils/helpers';

import '../../styles/flexboxgrid.css';
import '../../font-files/inter-ui.css';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.body = React.createRef();
    props.history.listen(
      () => this.body && this.body.current && this.body.current.scrollTo(0, 0)
    );

    this.state = {
      showMobileSidebar: false
    };
  }

  renderSideNavItems() {
    return map(navItem => {
      return <Sidebar.TabIcon {...navItem} key={navItem.tabKey} />;
    }, NAV_ITEMS);
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
      history,
      network
    } = this.props;
    const { showMobileSidebar } = this.state;
    const isPageLoading = loadingUser || !clientInitialized;

    return (
      <div className={styles.app}>
        <ToastContainer
          newestOnTop
          autoClose={false}
          hideProgressBar
          draggable
        />
        {isPageLoading ? (
          <div className={`${styles.loadingBody}`}>
            {' '}
            <Loader color="white" size="medium" />
          </div>
        ) : null}
        {!isPageLoading && !userFail
          ? [
              <Header
                onShowNav={() => this.setState({ showMobileSidebar: true })}
              />,
              <Sidebar
                activeTab={currentRouteSelector(this.props.location.pathname)}
                defaultActiveTab="dashboard"
                className={styles.sideNav}
                onTabClick={history.push}
                mobileVisible={showMobileSidebar}
                onMobileHide={() => this.setState({ showMobileSidebar: false })}
              >
                <Sidebar.TabGroup>{this.renderSideNavItems()}</Sidebar.TabGroup>
                <Sidebar.Footer>
                  <div className={styles.network}>
                    <Network network={network} theme="light" />
                  </div>
                </Sidebar.Footer>
              </Sidebar>,
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
                  <Redirect from="/" to="/explorer" />
                </Switch>
              </div>
            ]
          : null}
        <Login />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const currentUserState = getCurrentUserStateSelector(state);

  return {
    clientInitialized: initializedSelector(state),
    loadingUser: currentUserState.loading || !currentUserState.loaded,
    userFail: currentUserState.error,
    network: state.client.network
  };
};

const App = compose(
  hot(module),
  withRouter,
  connect(
    mapStateToProps,
    {
      getCurrentUser: authActions.getCurrentUser,
      loadCategories: categoryActions.loadCategories
    }
  )
)(AppComponent);

export default App;
