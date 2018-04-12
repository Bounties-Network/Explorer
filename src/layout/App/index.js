import React from 'react';
import styles from './App.module.scss';
import { Switch, Route } from 'react-router-dom'
import { Navbar, NoMatch } from 'layout';
import { Bounties, Discover } from 'containers';

const App = () => (
  <div className={styles.App}>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Bounties} />
      <Route exact path="/discover" component={Discover} />
      <Route component={NoMatch} />
    </Switch>
  </div>
);

export default App;
