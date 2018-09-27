import React from 'react';
import { ExplorerBody } from 'containers';
import { BountyFilterNav } from 'containers/FilterNav';
import { FilterNavManager } from 'hocs';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions } from 'public-modules/Bounties';
import config from 'public-modules/config';
import { locationNonceSelector } from 'layout/App/selectors';
import styles from './Explorer.module.scss';

class Explorer extends React.Component {
  constructor(props) {
    super(props);

    const {
      resetState,
      resetFilterNav,
      load,
      addPlatformFilter,
      toggleStageFilter
    } = props;

    resetState();
    resetFilterNav();
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
    this.props.hideFilterNav();
  }

  render() {
    return (
      <div className={`${styles.explorerContainer}`}>
        <div className={styles.desktopFilter}>
          <BountyFilterNav
            defaultPlatforms={[config.postingPlatform]}
            position="fixed"
          />
        </div>
        <ExplorerBody
          className={styles.explorerBody}
          onOpenFilters={this.props.showFilterNav}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locationNonce: locationNonceSelector(state)
});

export default compose(
  FilterNavManager,
  connect(
    mapStateToProps,
    {
      resetState: actions.resetState,
      load: actions.loadBounties,
      toggleStageFilter: actions.toggleStageFilter,
      addPlatformFilter: actions.addPlatformFilter,
      resetFilters: actions.resetFilters,
      batch: actions.batch
    }
  ),
  withRouter
)(Explorer);
