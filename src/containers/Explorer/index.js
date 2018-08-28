import React from 'react';
import FilterNav from './FilterNav';
import ExplorerBody from './ExplorerBody';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions } from 'public-modules/Bounties';
import { toggleFromParam } from 'utils/locationHelpers';
import { SideOverlay } from 'components';
import styles from './Explorer.module.scss';

class Explorer extends React.Component {
  constructor(props) {
    super(props);
    const { resetState, history, location, load, toggleStageFilter } = props;
    resetState();
    toggleStageFilter('active');
    load(true);
    this.state = {
      mobileFilterVisible: false
    };
  }

  render() {
    return (
      <div className={`${styles.explorerContainer}`}>
        <div className={styles.desktopFilter}>
          <FilterNav />
        </div>
        <div className={styles.mobileFilter}>
          <SideOverlay
            hasMask
            visible={this.state.mobileFilterVisible}
            theme="light"
            position="right"
            onClose={() => this.setState({ mobileFilterVisible: false })}
          >
            <FilterNav />
          </SideOverlay>
        </div>
        <ExplorerBody
          onOpenFilters={() => this.setState({ mobileFilterVisible: true })}
        />
      </div>
    );
  }
}

export default compose(
  connect(
    () => ({}),
    {
      resetState: actions.resetState,
      load: actions.loadBounties,
      toggleStageFilter: actions.toggleStageFilter
    }
  ),
  withRouter
)(Explorer);
