import React from 'react';
import FilterNav from './FilterNav';
import ExplorerBody from './ExplorerBody';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions } from 'public-modules/Bounties';
import { toggleFromParam } from 'utils/locationHelpers';
import { SideOverlay } from 'components';
import { locationNonceSelector } from 'layout/App/selectors';
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

  componentDidUpdate(prevProps) {
    const {
      batch,
      locationNonce,
      history,
      resetFilters,
      load,
      toggleStageFilter
    } = this.props;

    if (prevProps.locationNonce !== locationNonce && history.action === 'POP') {
      batch(true);
      resetFilters();
      toggleStageFilter('active');
      load(true);
    }
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

const mapStateToProps = state => ({
  locationNonce: locationNonceSelector(state)
});

export default compose(
  connect(
    mapStateToProps,
    {
      resetState: actions.resetState,
      load: actions.loadBounties,
      toggleStageFilter: actions.toggleStageFilter,
      resetFilters: actions.resetFilters,
      batch: actions.batch
    }
  ),
  withRouter
)(Explorer);
