import React from 'react';
import FilterNav from './FilterNav';
import ExplorerBody from './ExplorerBody';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions } from 'public-modules/Bounties';
import { toggleFromParam } from 'utils/locationHelpers';
import styles from './Explorer.module.scss';

class Explorer extends React.Component {
  constructor(props) {
    super(props);
    const { resetState, history, location, load } = props;
    resetState();
    if (!location.search) {
      history.push(toggleFromParam(location.search, 'bountyStage', 'active'));
    }
    load(true);
  }

  render() {
    return (
      <div className={`${styles.explorerContainer}`}>
        <FilterNav />
        <ExplorerBody />
      </div>
    );
  }
}

export default compose(
  connect(
    () => ({}),
    { resetState: actions.resetState, load: actions.loadBounties }
  ),
  withRouter
)(Explorer);
