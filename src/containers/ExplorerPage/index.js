import React from 'react';
import PropTypes from 'prop-types';
import { FetchComponent, LoadComponent } from 'hocs';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions, sagas, selectors } from 'public-modules';
import styles from './ExplorerPage.module.scss';

import { RefineByFilter, Search, Text, SortBy, BountyCard } from 'components';

const { bountiesStateSelector, rootBountiesSelector } = selectors;

const renderBounties = data => {
  return data.map((elem, idx) => {
    return (
      <div className={`${styles.bounty}`} key={'bounty' + idx}>
        <BountyCard bountyData={elem} />
      </div>
    );
  });
};

const ExplorerPage = props => {
  const { loading, error, bounties, count } = props;
  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error...</div>;
  }

  return (
    <div className={`${styles.explorerPage}`}>
      <div className={`${styles.filterColumn}`}>
        <div className={`${styles.searchBar}`}>
          <Search />
        </div>
        <div className={`${styles.refineBy}`}>
          <RefineByFilter dropdown stages difficulty />
        </div>
      </div>
      <div className={`${styles.bountiesColumn}`}>
        <div className={`${styles.sortByBar}`}>
          <div className={`${styles.count}`}>
            <Text style="H2" color="purple">
              {count}
            </Text>
            <Text style="H3" color="grey">
              Bounties
            </Text>
          </div>
          <div className={`${styles.sortBy}`}>
            <SortBy />
          </div>
        </div>
        <div className={`${styles.bountiesList}`}>
          {renderBounties(bounties)}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, router) => {
  let bountiesState = rootBountiesSelector(state);

  return {
    bounties: bountiesState.bounties,
    count: bountiesState.count,
    ...bountiesStateSelector(state)
  };
};

ExplorerPage.propTypes = {
  bounties: PropTypes.array,
  load: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.bool
};

const check = compose(
  FetchComponent(sagas.fetch),
  connect(mapStateToProps, { load: actions.loadBounties }),
  LoadComponent('')
)(ExplorerPage);

export default check;
