import React from 'react';
import FontAwesome from 'fontAwesome';
import styles from './App.module.scss';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { map } from 'lodash';
import { NoMatch } from 'layout';
import { NAV_ITEMS } from './constants';
import { Explorer } from 'containers';
import { Sidebar } from 'components';
import { Header } from 'layout';

import '../../styles/flexboxgrid.css';
import '../../font-files/inter-ui.css';

class AppComponent extends React.Component {
  renderSideNavItems() {
    return map(navItem => {
      return <Sidebar.TabIcon {...navItem} key={navItem.tabKey} />;
    }, NAV_ITEMS);
  }

  render() {
    const { network } = this.props;

    return (
      <div className={styles.app}>
        <Header />
        <Sidebar defaultActiveTab="dashboard" className={styles.sideNav}>
          {this.renderSideNavItems()}
        </Sidebar>
        <div className={`${styles.body}`}>
          <Switch>
            <Route exact path="/" component={Explorer} />
          </Switch>
        </div>
      </div>
    );
  }
}

const App = compose(
  hot(module),
  withRouter
)(AppComponent);

export default App;
