import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { curry } from 'lodash';
import { actions as bountiesActions } from 'public-modules/Bounties';
import {
  rootBountiesSelector,
  bountiesTagFiltersSelector,
  bountiesPlatformFiltersSelector,
  bountiesSortFilterSelector
} from 'public-modules/Bounties/selectors';
import { tagsSelector } from 'public-modules/Tags/selectors';

function FilterNavComponentHOC(WrappedComponent, config) {
  let mapStateToProps = null;
  let mapDispatchToProps = null;

  switch (config.type) {
    case 'bounty':
    default: {
      mapStateToProps = state => {
        const bountyState = rootBountiesSelector(state);

        return {
          availableTags: tagsSelector(state),
          currentDifficultyFilters: bountyState.difficultyFilters,
          currentPlatformFilters: bountiesPlatformFiltersSelector(state),
          currentSearchValue: bountyState.search,
          currentSelectedTags: bountiesTagFiltersSelector(state),
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
        addTagFilter: bountiesActions.addTagFilter,
        addPlatformFilter: bountiesActions.addPlatformFilter,
        removeTagFilter: bountiesActions.removeTagFilter,
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
