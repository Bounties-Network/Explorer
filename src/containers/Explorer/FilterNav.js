import React from 'react';
import styles from './FilterNav.module.scss';
import { Search, Text, Button, Checkbox, SearchSelect } from 'components';
import {
  rootBountiesSelector,
  bountiesCategoryFiltersSelector,
  anyStageFiltersSelected,
  anyDifficultyFiltersSelected
} from 'public-modules/Bounties/selectors';
import { throttle } from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions } from 'public-modules/Bounties';
const {
  setSearch,
  toggleStageFilter,
  toggleDifficultyFilter,
  addCategoryFilter,
  removeCategoryFilter,
  setAllStageFilters,
  setAllDifficultyFilters
} = actions;

const FilterNavComponent = props => {
  const {
    search,
    setSearch,
    toggleStageFilter,
    toggleDifficultyFilter,
    stageFilters,
    difficultyFilters,
    anyStageFiltersSelected,
    anyDifficultyFiltersSelected,
    setAllDifficultyFilters,
    setAllStageFilters
  } = props;

  return (
    <div className={styles.filterNav}>
      <div className={styles.searchWrapper}>
        <Search value={search} onChange={throttle(300, setSearch)} />
      </div>
      <div className={styles.refineWrapper}>
        <Text inline typeScale="h4" weight="fontWeight-medium">
          Refine By
        </Text>
        <Button type="link" className={styles.clearButton}>
          Clear Filters
        </Button>
      </div>
      <div className={styles.stageFilter}>
        <Text weight="fontWeight-medium" className={styles.groupText}>
          Stage
        </Text>
        <Checkbox
          label="All"
          onChange={setAllStageFilters}
          checked={anyStageFiltersSelected}
        />
        <Checkbox
          label="Active"
          onChange={() => toggleStageFilter('active')}
          checked={stageFilters.active}
        />
        <Checkbox
          label="Completed"
          onChange={() => toggleStageFilter('completed')}
          checked={stageFilters.completed}
        />
        <Checkbox
          label="Expired"
          onChange={() => toggleStageFilter('expired')}
          checked={stageFilters.expired}
        />
        <Checkbox
          label="Dead"
          onChange={() => toggleStageFilter('dead')}
          checked={stageFilters.dead}
        />
      </div>
      <div className={styles.difficultyFilter}>
        <Text weight="fontWeight-medium" className={styles.groupText}>
          Difficulty
        </Text>
        <Checkbox
          label="All"
          onChange={setAllDifficultyFilters}
          checked={anyDifficultyFiltersSelected}
        />
        <Checkbox
          label="Beginner"
          onChange={() => toggleDifficultyFilter('beginner')}
          checked={difficultyFilters.beginner}
        />
        <Checkbox
          label="Intermediate"
          onChange={() => toggleDifficultyFilter('intermediate')}
          checked={difficultyFilters.intermediate}
        />
        <Checkbox
          label="Advanced"
          onChange={() => toggleDifficultyFilter('advanced')}
          checked={difficultyFilters.advanced}
        />
      </div>
      <div className={styles.categoryFilter}>
        <Text weight="fontWeight-medium" className={styles.groupText}>
          Category
        </Text>
        <SearchSelect />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const bountyState = rootBountiesSelector(state);

  return {
    stageFilters: bountyState.stageFilters,
    anyStageFiltersSelected: anyStageFiltersSelected(state),
    anyDifficultyFiltersSelected: anyDifficultyFiltersSelected(state),
    difficultyFilters: bountyState.difficultyFilters,
    categoryFilters: bountiesCategoryFiltersSelector(state),
    search: bountyState.search
  };
};

const FilterNav = compose(
  connect(
    mapStateToProps,
    {
      setSearch,
      toggleStageFilter,
      toggleDifficultyFilter,
      addCategoryFilter,
      removeCategoryFilter,
      setAllDifficultyFilters,
      setAllStageFilters
    }
  )
)(FilterNavComponent);

export default FilterNav;
