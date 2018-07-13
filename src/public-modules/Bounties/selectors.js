import { createSelector } from 'reselect';
import {
  DIFFICULTY_MAPPING,
  STAGE_MAPPING,
  PAGE_SIZE
} from 'public-modules/Bounties/constants';
import { reduce as reduceFunction } from 'lodash';
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
    error: rootBounty.error
  })
);

// We make this a selector to manage the set -> array conversion
export const bountiesCategoryFiltesSelector = createSelector(
  rootBountiesSelector,
  rootBounty => [...rootBounty.categoryFilters]
);

export const bountiesQuerySelector = createSelector(
  rootBountiesSelector,
  bountiesCategoryFiltesSelector,
  (rootBounty, categories) => {
    const query = {};
    let orderPrefix = '';
    if (rootBounty.sortOrder === 'desc') {
      orderPrefix += '-';
    }
    query['platform__in'] = 'gitcoin,bounties-network';
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
    query['search'] = rootBounty.search;
    query['ordering'] = orderPrefix + rootBounty.sort;
    query['limit'] = PAGE_SIZE;
    query['offset'] = rootBounty.offset;
    return query;
  }
);
