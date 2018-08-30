import { createSelector } from 'reselect';
import {
  DIFFICULTY_MAPPING,
  STAGE_MAPPING,
  PAGE_SIZE
} from 'public-modules/Bounties/constants';
import config from 'public-modules/config';
import { reduce as reduceFunction, every, negate } from 'lodash';
const reduce = reduceFunction.convert({ cap: false });

export const rootBountiesSelector = state => state.bounties;

export const bountiesSelector = createSelector(
  rootBountiesSelector,
  rootBounty => rootBounty.bounties
);

export const bountiesStateSelector = createSelector(
  rootBountiesSelector,
  rootBounty => ({
    loading: rootBounty.loading,
    loaded: rootBounty.loaded,
    error: rootBounty.error,
    batch: rootBounty.batch
  })
);

export const bountiesCountSelector = createSelector(
  rootBountiesSelector,
  rootBounties => rootBounties.count
);

export const bountiesSortFilterSelector = createSelector(
  rootBountiesSelector,
  rootBounty => rootBounty.sort
);

// We make this a selector to manage the set -> array conversion
export const bountiesCategoryFiltersSelector = createSelector(
  rootBountiesSelector,
  rootBounty => [...rootBounty.categoryFilters]
);

export const bountiesPlatformFiltersSelector = createSelector(
  rootBountiesSelector,
  rootBounty => [...rootBounty.platformFilters]
);

export const anyStageFiltersSelected = createSelector(
  rootBountiesSelector,
  rootBounty => every(negate(Boolean), rootBounty.stageFilters)
);

export const anyDifficultyFiltersSelected = createSelector(
  rootBountiesSelector,
  rootBounty => every(negate(Boolean), rootBounty.difficultyFilters)
);

export const bountiesQuerySelector = createSelector(
  rootBountiesSelector,
  bountiesCategoryFiltersSelector,
  bountiesPlatformFiltersSelector,
  (rootBounty, categories, platforms) => {
    const query = {};
    let orderPrefix = '';
    if (rootBounty.sortOrder === 'desc') {
      orderPrefix += '-';
    }
    query['platform__in'] = platforms.length
      ? platforms.join(',')
      : config.platform;
    query['bountyStage__in'] = reduce(
      (result, value, key) => {
        if (value) {
          result.push(STAGE_MAPPING[key]);
        }
        return result;
      },
      [],
      rootBounty.stageFilters
    ).join(',');
    query['experienceLevel__in'] = reduce(
      (result, value, key) => {
        if (value) {
          result.push(DIFFICULTY_MAPPING[key]);
        }
        return result;
      },
      [],
      rootBounty.difficultyFilters
    ).join(',');
    if (categories.length) {
      query['categories__normalized_name__in'] = categories.join(',');
    }
    if (rootBounty.addressFilters.issuer) {
      query['issuer'] = rootBounty.addressFilters.issuer;
    }
    if (rootBounty.addressFilters.fulfiller) {
      query['fulfillments__fulfiller'] = rootBounty.addressFilters.fulfiller;
    }
    query['search'] = rootBounty.search;
    query['ordering'] = orderPrefix + rootBounty.sort;
    query['limit'] = PAGE_SIZE;

    return query;
  }
);
