import React from 'react';
import styles from './App.module.scss';
import { hot } from 'react-hot-loader';
import { Switch, Route } from 'react-router-dom';
import { NoMatch } from 'layout';
import { Bounties, LeaderboardPage } from 'containers';
import { Header, Sidebar } from 'components';

const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <Sidebar />
      <div className={`${styles.body}`}>
        <Switch>
          <Route exact path="/" component={Bounties} />
          <Route exact path="/leaderboard" component={LeaderboardPage} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </div>
  );
};

export default hot(module)(App);
