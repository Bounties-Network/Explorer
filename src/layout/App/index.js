import React from 'react';
import styles from './App.module.scss';
import { hot } from 'react-hot-loader';
import { Switch, Route } from 'react-router-dom';
import { NoMatch } from 'layout';
import {
  Bounties,
  LeaderboardPage,
  ProfilePage,
  DashboardPage,
  ExplorerPage
} from 'containers';
import { Header, Sidebar } from 'components';

import '../../flexboxgrid.css';

const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <Sidebar onClick={console.log} />
      <div className={`${styles.body}`}>
        <Switch>
          <Route exact path="/" component={Bounties} />
          <Route exact path="/explorer" component={ExplorerPage} />
          <Route exact path="/dashboard/:address" component={DashboardPage} />
          <Route exact path="/leaderboard" component={LeaderboardPage} />
          <Route exact path="/profile/:address" component={ProfilePage} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </div>
  );
};

export default hot(module)(App);
