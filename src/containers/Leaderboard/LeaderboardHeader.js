import React from 'react';
import styles from './LeaderboardHeader.module.scss';
import {
  Search,
  Switch,
  Text,
  Button,
  Checkbox,
  SearchSelect
} from 'components';
import {
  rootBountiesSelector,
  bountiesCategoryFiltersSelector,
  anyStageFiltersSelected,
  anyDifficultyFiltersSelected
} from 'public-modules/Bounties/selectors';
import { categoriesSelector } from 'public-modules/Categories/selectors';
import { throttle } from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { LoadComponent } from 'hocs';

const LeaderboardHeaderComponent = props => {
  const {
    search,
    resetFilters,
    setSearch,
    toggleStageFilter,
    toggleDifficultyFilter,
    stageFilters,
    difficultyFilters,
    anyStageFiltersSelected,
    anyDifficultyFiltersSelected,
    categories,
    categoryFilters,
    addCategoryFilter,
    removeCategoryFilter
  } = props;

  return (
    <div className={`${styles.headerWrapper}`}>
      <div className={`${styles.titleText}`}>
        <Text
          className={'sb-component-group-heading'}
          typeScale="h1"
          color="white"
        >
          Leaderboard
        </Text>
      </div>
      <Switch
        onValue={'Earners'}
        offValue={'Issuers'}
        selectedColor="white"
        unselectedColor="lightGrey"
        backgroundColor="purple"
        switchColor="purpleWhite"
        curved="true"
      />
    </div>
  );
};

// const mapStateToProps = state => {
//   const bountyState = rootBountiesSelector(state);
//
//   return {
//     stageFilters: bountyState.stageFilters,
//     anyStageFiltersSelected: anyStageFiltersSelected(state),
//     anyDifficultyFiltersSelected: anyDifficultyFiltersSelected(state),
//     difficultyFilters: bountyState.difficultyFilters,
//     categoryFilters: bountiesCategoryFiltersSelector(state),
//     categories: categoriesSelector(state),
//     search: bountyState.search
//   };
// };
//
// const FilterNav = compose(
//   connect(
//     mapStateToProps,
//     {
//       setSearch,
//       toggleStageFilter,
//       toggleDifficultyFilter,
//       addCategoryFilter,
//       removeCategoryFilter,
//       resetFilters,
//       load: loadCategories
//     }
//   ),
//   LoadComponent('')
// )(FilterNavComponent);

export default LeaderboardHeaderComponent;
