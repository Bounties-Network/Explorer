import React from 'react';
import FontAwesome from 'fontAwesome';
import styles from './App.module.scss';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { NoMatch } from 'layout';

import { Explorer } from 'containers';
import { Sidebar } from 'components';
import { Header } from 'layout';

import '../../styles/flexboxgrid.css';
import '../../font-files/inter-ui.css';

class AppComponent extends React.Component {
  render() {
    return (
      <div className={styles.app}>
        <Header />
        <Sidebar />
        <div className={`${styles.body}`}>
          <Switch>
            <Route exact path="/" component={Explorer} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, router) => {};

const App = compose(
  hot(module),
  withRouter
)(AppComponent);

export default App;
