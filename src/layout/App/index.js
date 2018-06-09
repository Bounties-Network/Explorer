import React from 'react';
import styles from './App.module.scss';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect } from 'react-router-dom';
import { NoMatch } from 'layout';
import {
  Bounties,
  LeaderboardPage,
  ProfilePage,
  DashboardPage,
  ExplorerPage,
  CreateBountyPage,
  AccountSettings,
  SignInPage
} from 'containers';
import { Header, Sidebar } from 'components';

import '../../styles/flexboxgrid.css';
import '../../font-files/inter-ui.css';

const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <Sidebar onClick={console.log} />
      <div className={`${styles.body}`}>
        <Switch>
          <Route exact path="/" component={Bounties} />
          <Route exact path="/signin" component={SignInPage} />
          <Route exact path="/settings" component={AccountSettings} />
          <Route exact path="/create" component={CreateBountyPage} />
          <Route exact path="/explorer" component={ExplorerPage} />
          <Route exact path="/dashboard/:address" component={DashboardPage} />
          <Route
            exact
            path="/leaderboard/fulfiller"
            component={LeaderboardPage}
          />
          <Route exact path="/leaderboard/issuer" component={LeaderboardPage} />
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
};

export default hot(module)(App);
