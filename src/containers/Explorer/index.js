import React from 'react';
import { ExplorerBody, FilterNav } from 'containers';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions as appActions } from 'layout/App/reducer';
import { actions } from 'public-modules/Bounties';
import { toggleFromParam } from 'utils/locationHelpers';
import { SideOverlay } from 'components';
import { locationNonceSelector } from 'layout/App/selectors';
import styles from './Explorer.module.scss';

class Explorer extends React.Component {
  constructor(props) {
    super(props);

    const {
      resetState,
      history,
      location,
      load,
      addPlatformFilter,
      toggleStageFilter
    } = props;

    resetState();
    toggleStageFilter('active');
    addPlatformFilter('bounties-network');
    load(true);
  }

  componentDidUpdate(prevProps) {
    const {
      batch,
      locationNonce,
      history,
      location,
      resetFilters,
      load,
      addPlatformFilter,
      toggleStageFilter
    } = this.props;

    if (
      prevProps.locationNonce !== locationNonce &&
      (history.action === 'POP' || location.search === '')
    ) {
      batch(true);
      resetFilters();
      toggleStageFilter('active');
      addPlatformFilter('bounties-network');
      load(true);
    }
  }

  componentWillUnmount() {
    this.props.hideFilters();
  }

  render() {
    return (
      <div className={`${styles.explorerContainer}`}>
        <div className={styles.desktopFilter}>
          <FilterNav defaultPlatforms={['bounties-network']} position="fixed" />
        </div>
        <ExplorerBody
          className={styles.explorerBody}
          onOpenFilters={this.props.openFilters}
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
      addPlatformFilter: actions.addPlatformFilter,
      resetFilters: actions.resetFilters,
      batch: actions.batch,
      openFilters: appActions.showFilterNav,
      hideFilters: appActions.hideFilterNav
    }
  ),
  withRouter
)(Explorer);
