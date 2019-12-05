/** @jsx jsx */
import { jsx } from "theme-ui";
import React from 'react';
import styles from './ExplorerBody.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import {  Loader, ZeroState } from 'components';
import { Text } from '@theme-ui/components'
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
import ExplorerCard from 'fora-components/Card/ExplorerCard';
import { DIFFICULTY_MAPPINGS, STAGE_VALUES } from "public-modules/Bounty/constants";
import Button from 'fora-components/Button'

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
        <ExplorerCard
          key={id}
          token={token_symbol}
          tokenInUSD={Number(Number(usd_price).toFixed(2))}
          tokenValue={Number(calculated_fulfillment_amount)}
          submissionCount={Number(fulfillment_count)}
          community={{
            name: "frontendDev",
            href: "https://www.google.co.uk"
          }}
          avatar={{
            img: user.small_profile_image_url,
            variant: 'user',
            name: user.name,
            screenName: user.name,
            address: user.public_address,
            size: "small",
            onDark: false
          }}
          deadline={moment(deadline)}
          difficulty={intl.get(`sections.bounty.difficulties.${DIFFICULTY_MAPPINGS[experience_level]}`)}
          tags={categories.map(category => category && category.name)}
          currentTags={categoryFilters}
          href={`/bounty/${id}`}
          title={title}
          status={String(STAGE_VALUES[bounty_stage]).replace('stages.', '')}
          handleTagClick={toggleCategoryFilter}
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
        <div sx={{  display: 'inline-block' }}>
          <Text
            sx={{ display: 'inline-block', mr: 1, fontSize: 'h2' }}
            color="brandPrimary.300"
            typeScale="numeric"
            className={styles.bountyNumber}
          >
            {count}
          </Text>
          <Text variant='body' color="brandGray.400" sx={{ display: 'inline-block' }}>
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
        <div sx={{ '> :not( :last-child )': { mb: 5 }, py: 4 }}>
          {renderBounties()}
          {offset + PAGE_SIZE < count ? (
            <div className={styles.loadMoreButton}>
              <Button fullWidth={true} variant='secondary' isLoading={loadingMore} onClick={loadMoreBounties}>
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
