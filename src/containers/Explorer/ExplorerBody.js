import React from 'react';
import styles from './ExplorerBody.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { Text, Sort, Loader, ZeroState, Button } from 'components';
import { LoadComponent } from 'hocs';
import { BountyCard } from 'explorer-components';
import { map } from 'lodash';
import {
  SORT_VALUE,
  SORT_CREATED,
  SORT_EXPIRY,
  PAGE_SIZE
} from 'public-modules/Bounties/constants';
import {
  rootBountiesSelector,
  bountiesCategoryFiltersSelector
} from 'public-modules/Bounties/selectors';
import { actions } from 'public-modules/Bounties';

const ExplorerBodyComponent = props => {
  const {
    bounties,
    count,
    sort,
    setSort,
    loading,
    loadMoreBounties,
    offset,
    loadingMore,
    toggleCategoryFilter,
    categoryFilters,
    error
  } = props;

  const renderBounties = () => {
    return map(bounty => {
      const {
        id,
        title,
        categories,
        user,
        experienceLevel,
        fulfillment_count,
        deadline,
        calculated_fulfillmentAmount,
        usd_price,
        tokenSymbol,
        bountyStage
      } = bounty;
      return (
        <BountyCard
          key={id}
          id={id}
          title={title}
          categories={categories}
          img={user.profile_image}
          address={user.public_address}
          experienceLevel={experienceLevel}
          submissions={fulfillment_count}
          deadline={moment.utc(deadline, 'YYYY-MM-DDThh:mm:ssZ').fromNow(true)}
          value={Number(calculated_fulfillmentAmount)}
          usd={Number(usd_price).toFixed(2)}
          currency={tokenSymbol}
          onPillClick={toggleCategoryFilter}
          selectedCategories={categoryFilters}
          stage={bountyStage}
        />
      );
    }, bounties);
  };

  let className = styles.explorerBody;
  if (loading || bounties.length === 0) {
    className += ` ${styles.centeredBody}`;
  }

  return (
    <div className={className}>
      <div className={styles.bodyHeading}>
        <div>
          <Text
            inline
            color="purple"
            typeScale="h2"
            className={styles.bountyNumber}
          >
            {count}
          </Text>
          <Text color="defaultGrey" inline>
            {count === 1 ? 'bounty' : 'bounties'}
          </Text>
        </div>
        <div className={styles.sortGroup}>
          <Text
            inline
            weight="fontWeight-bold"
            color="black"
            typeScale="Body"
            className={styles.sortByText}
          >
            Sort By
          </Text>
          <Sort
            className={styles.sortBy}
            active={sort === SORT_VALUE}
            onSort={sortOrder => setSort(SORT_VALUE, sortOrder)}
          >
            Value
          </Sort>
          <Sort
            className={styles.sortBy}
            active={sort === SORT_CREATED}
            onSort={sortOrder => {
              setSort(SORT_CREATED, sortOrder);
            }}
          >
            Creation Date
          </Sort>
          <Sort
            className={styles.sortBy}
            active={sort === SORT_EXPIRY}
            onSort={sortOrder => setSort(SORT_EXPIRY, sortOrder)}
          >
            Expiry
          </Sort>
        </div>
      </div>
      {loading ? (
        <div className={styles.bountyListCentered}>
          <Loader size="medium" color="blue" className={styles.centeredItem} />
        </div>
      ) : null}
      {!loading && bounties.length !== 0 ? (
        <div className={styles.bountyList}>
          {renderBounties()}
          {offset + PAGE_SIZE < count ? (
            <div className={styles.loadMoreButton}>
              <Button loading={loadingMore} onClick={loadMoreBounties}>
                Load More
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}
      {!loading && !error && bounties.length === 0 ? (
        <div className={styles.bountyListCentered}>
          <ZeroState
            className={styles.centeredItem}
            iconColor="blue"
            title="No Bounties Found"
            text="Update your search filters to see more bounties"
            icon={['fal', 'bolt']}
          />
        </div>
      ) : null}
      {error ? (
        <div className={styles.bountyListCentered}>
          <ZeroState
            className={styles.centeredItem}
            type="error"
            iconColor="white"
            title="Uh oh, something happened"
            text="Try a new filter or refresh the page and try again"
            icon={['fal', 'exclamation-triangle']}
          />
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = state => {
  const bountyState = rootBountiesSelector(state);

  return {
    bounties: bountyState.bounties,
    count: bountyState.count,
    sort: bountyState.sort,
    offset: bountyState.offset,
    loading: bountyState.loading,
    loadingMore: bountyState.loadingMore,
    error: bountyState.error,
    categoryFilters: bountiesCategoryFiltersSelector(state)
  };
};

const ExplorerBody = compose(
  connect(
    mapStateToProps,
    {
      setSort: actions.setSort,
      loadMoreBounties: actions.loadMoreBounties,
      toggleCategoryFilter: actions.toggleCategoryFilter
    }
  )
)(ExplorerBodyComponent);

export default ExplorerBody;
