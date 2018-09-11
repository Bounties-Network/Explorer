import React from 'react';
import { ExplorerBody, FilterNav } from 'containers';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions as appActions } from 'layout/App/reducer';
import { actions } from 'public-modules/Bounties';
import config from 'public-modules/config';
import { locationNonceSelector } from 'layout/App/selectors';
import styles from './Explorer.module.scss';

class Explorer extends React.Component {
  constructor(props) {
    super(props);

    const { resetState, load, addPlatformFilter, toggleStageFilter } = props;

    resetState();
    toggleStageFilter('active');
    addPlatformFilter(config.postingPlatform);
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
      addPlatformFilter(config.postingPlatform);
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
          <FilterNav
            defaultPlatforms={[config.postingPlatform]}
            position="fixed"
          />
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
