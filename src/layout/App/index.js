import React from 'react';
import styles from './App.module.scss';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { FetchComponent, LoadComponent } from 'hocs';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions, sagas, selectors } from 'public-modules';
import { NoMatch } from 'layout';

import {
  LeaderboardPage,
  ProfilePage,
  DashboardPage,
  ExplorerPage,
  CreateBountyPage,
  AccountSettings,
  Header,
  Sidebar,
  ViewBounty,
  SignInPage
} from 'containers';
// import { Header, Sidebar } from 'components';

import '../../styles/flexboxgrid.css';
import '../../font-files/inter-ui.css';

const {
  rootAuthSelector,
  authStateSelector,
  publicAddressSelector
} = selectors;

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { loading, loaded, error } = this.props;

    return (
      <div className={styles.app}>
        <Header />
        <Sidebar />
        <div className={`${styles.body}`}>
          <Switch>
            <Route exact path="/" component={DashboardPage} />
            <Route exact path="/signin" component={SignInPage} />
            <Route exact path="/bounty/:bounty" component={ViewBounty} />
            <Route exact path="/settings" component={AccountSettings} />
            <Route exact path="/create" component={CreateBountyPage} />
            <Route exact path="/explorer" component={ExplorerPage} />
            <Route exact path="/dashboard/" component={DashboardPage} />
            <Route
              exact
              path="/leaderboard/fulfiller"
              component={LeaderboardPage}
            />
            <Route
              exact
              path="/leaderboard/issuer"
              component={LeaderboardPage}
            />
            <Route
              exact
              path="/leaderboard"
              render={() => <Redirect to="/leaderboard/fulfiller" />}
            />
            <Route exact path="/profile/:address" component={ProfilePage} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, router) => {
  let auth = rootAuthSelector(state);
  let userAddress = publicAddressSelector(auth);

  return {
    userAddress,
    ...authStateSelector(state)
  };
};

const check = compose(
  hot(module),
  FetchComponent(sagas.fetch),
  withRouter,
  connect(mapStateToProps, { load: actions.checkLoginStatus, ...actions }),
  LoadComponent('')
)(App);

export default check;
