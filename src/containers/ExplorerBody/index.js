import React from 'react';
import styles from './ExplorerBody.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { Text, Loader, ZeroState, Button } from 'components';
import { BountyCard } from 'explorer-components';
import { map } from 'lodash';
import { PAGE_SIZE } from 'public-modules/Bounties/constants';
import {
  rootBountiesSelector,
  bountiesCategoryFiltersSelector
} from 'public-modules/Bounties/selectors';
import { actions } from 'public-modules/Bounties';
import intl from 'react-intl-universal';
import { faSlidersH } from '@fortawesome/pro-regular-svg-icons';

const ExplorerBodyComponent = props => {
  const {
    className,
    bounties,
    count,
    loading,
    loadMoreBounties,
    offset,
    loadingMore,
    toggleCategoryFilter,
    categoryFilters,
    error,
    onOpenFilters
  } = props;

  const renderBounties = () => {
    return map(bounty => {
      const {
        id,
        title,
        categories,
        user,
        experience_level,
        fulfillment_count,
        deadline,
        calculated_fulfillment_amount,
        usd_price,
        token_symbol,
        bounty_stage
      } = bounty;
      return (
        <BountyCard
          key={id}
          id={id}
          title={title}
          categories={categories}
          img={user.small_profile_image_url}
          address={user.public_address}
          experience_level={experience_level}
          submissions={fulfillment_count}
          deadline={moment.utc(deadline, 'YYYY-MM-DDThh:mm:ssZ').fromNow(true)}
          value={Number(calculated_fulfillment_amount)}
          usd={Number(usd_price)}
          currency={token_symbol}
          onPillClick={toggleCategoryFilter}
          selectedCategories={categoryFilters}
          stage={bounty_stage}
        />
      );
    }, bounties);
  };

  let bodyClass = styles.explorerBody;
  if (loading || bounties.length === 0) {
    bodyClass += ` ${styles.centeredBody}`;
  }

  if (className) {
    bodyClass += ` ${className}`;
  }
  return (
    <div className={`${bodyClass} explorer-body`}>
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
            {intl.get('sections.explorer_body.bounty_count', { count })}
          </Text>
        </div>
        <div className={styles.filterNav}>
          <Button icon={faSlidersH} onClick={onOpenFilters}>
            {intl.get('actions.filter')}
          </Button>
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
                {intl.get('actions.load_more')}
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}
      {!loading && !error && bounties.length === 0 ? (
        <div className={styles.bountyListCentered}>
          <ZeroState
            className={styles.centeredItem}
            title={intl.get('sections.explorer_body.zero_state.title')}
            text={intl.get('sections.explorer_body.zero_state.description')}
            icon="hive"
          />
        </div>
      ) : null}
      {error ? (
        <div className={styles.bountyListCentered}>
          <ZeroState
            className={styles.centeredItem}
            type="error"
            title={intl.get('sections.explorer_body.zero_state_error.title')}
            text={intl.get(
              'sections.explorer_body.zero_state_error.description'
            )}
            icon="error"
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
