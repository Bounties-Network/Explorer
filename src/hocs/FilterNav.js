import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { curry } from 'lodash';
import { actions as bountiesActions } from 'public-modules/Bounties';
import {
  rootBountiesSelector,
  bountiesCategoryFiltersSelector,
  bountiesPlatformFiltersSelector,
  bountiesSortFilterSelector
} from 'public-modules/Bounties/selectors';
import { categoriesSelector } from 'public-modules/Categories/selectors';

function FilterNavComponentHOC(WrappedComponent, config) {
  let mapStateToProps = null;
  let mapDispatchToProps = null;

  switch (config.type) {
    case 'bounty':
    default: {
      mapStateToProps = state => {
        const bountyState = rootBountiesSelector(state);

        return {
          availableCategories: categoriesSelector(state),
          currentDifficultyFilters: bountyState.difficultyFilters,
          currentPlatformFilters: bountiesPlatformFiltersSelector(state),
          currentSearchValue: bountyState.search,
          currentSelectedCategories: bountiesCategoryFiltersSelector(state),
          currentSortFilter: bountiesSortFilterSelector(state),
          currentStageFilter: bountyState.stageFilters
        };
      };

      mapDispatchToProps = {
        setSearch: bountiesActions.setSearch,
        setSort: bountiesActions.setSort,
        toggleStageFilter: bountiesActions.toggleStageFilter,
        toggleDifficultyFilter: bountiesActions.toggleDifficultyFilter,
        togglePlatformFilter: bountiesActions.togglePlatformFilter,
        addCategoryFilter: bountiesActions.addCategoryFilter,
        addPlatformFilter: bountiesActions.addPlatformFilter,
        removeCategoryFilter: bountiesActions.removeCategoryFilter,
        filterReseter: bountiesActions.resetFilter,
        batch: bountiesActions.batch
      };

      break;
    }
  }

  return compose(
    withRouter,
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(WrappedComponent);
}

export default curry(FilterNavComponentHOC);
