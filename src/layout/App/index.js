import React from 'react';
import FontAwesome from 'fontAwesome';
import styles from './App.module.scss';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { NoMatch } from 'layout';
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
import { Sidebar, Loader, ToastContainer } from 'components';
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
    const { loadingUser, clientInitialized, userFail, history } = this.props;
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
              <Header />,
              <Sidebar
                activeTab={currentRouteSelector(this.props.location.pathname)}
                defaultActiveTab="dashboard"
                className={styles.sideNav}
                onTabClick={history.push}
              >
                {this.renderSideNavItems()}
              </Sidebar>,
              <div className={`${styles.body}`} ref={this.body}>
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
    userFail: currentUserState.error
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
