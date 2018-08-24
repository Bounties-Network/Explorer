import React from 'react';
import styles from './FilterNav.module.scss';
import { Search, Text, Button, Checkbox, SearchSelect } from 'components';
import { withRouter } from 'react-router-dom';
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
import { actions } from 'public-modules/Bounties';
import {
  toggleFromParam,
  pushToParam,
  removeFromParam,
  setParam
} from 'utils/locationHelpers';
const {
  resetFilters,
  setSearch,
  toggleStageFilter,
  toggleDifficultyFilter,
  addCategoryFilter,
  removeCategoryFilter
} = actions;

const FilterNavComponent = props => {
  const {
    search,
    resetFilters,
    setSearch,
    toggleStageFilter,
    toggleDifficultyFilter,
    stageFilters,
    difficultyFilters,
    categories,
    categoryFilters,
    addCategoryFilter,
    removeCategoryFilter,
    history,
    location
  } = props;

  const toggleStageFilterAction = stage => {
    const queryParams =
      toggleFromParam(location.search, 'bountyStage', stage) || '?bountyStage=';
    history.push(location.pathname + queryParams);
    toggleStageFilter(stage);
  };

  const toggleDifficultyFilterAction = difficulty => {
    history.push(
      location.pathname +
        toggleFromParam(location.search, 'difficulty', difficulty)
    );
    toggleDifficultyFilter(difficulty);
  };

  const addCategoryFilterAction = category => {
    history.push(
      location.pathname + pushToParam(location.search, 'category', category)
    );
    addCategoryFilter(category);
  };

  const removeCategoryFilterAction = category => {
    history.push(
      location.pathname + removeFromParam(location.search, 'category', category)
    );
    removeCategoryFilter(category);
  };

  const setSearchAction = throttle(300, searchValue => {
    history.push(
      location.pathname + setParam(location.search, 'search', searchValue)
    );
    setSearch(searchValue);
  });

  const resetFilterAction = () => {
    history.push(location.pathname);
    resetFilters();
  };

  return (
    <div className={styles.filterNav}>
      <div className={styles.searchWrapper}>
        <Search value={search} onChange={setSearchAction} />
      </div>
      <div className={styles.refineWrapper}>
        <Text inline typeScale="h3" weight="fontWeight-medium">
          Refine By
        </Text>
        <Button
          type="link"
          className={styles.clearButton}
          onClick={resetFilterAction}
        >
          Reset Filters
        </Button>
      </div>
      <div className={styles.stageFilter}>
        <Text weight="fontWeight-medium" className={styles.groupText}>
          Stage
        </Text>
        <Checkbox
          label="Active"
          onChange={() => {
            toggleStageFilterAction('active');
          }}
          checked={stageFilters.active}
        />
        <Checkbox
          label="Completed"
          onChange={() => toggleStageFilterAction('completed')}
          checked={stageFilters.completed}
        />
        <Checkbox
          label="Expired"
          onChange={() => toggleStageFilterAction('expired')}
          checked={stageFilters.expired}
        />
        <Checkbox
          label="Dead"
          onChange={() => toggleStageFilterAction('dead')}
          checked={stageFilters.dead}
        />
      </div>
      <div className={styles.difficultyFilter}>
        <Text weight="fontWeight-medium" className={styles.groupText}>
          Difficulty
        </Text>
        <Checkbox
          label="Beginner"
          onChange={() => toggleDifficultyFilterAction('beginner')}
          checked={difficultyFilters.beginner}
        />
        <Checkbox
          label="Intermediate"
          onChange={() => toggleDifficultyFilterAction('intermediate')}
          checked={difficultyFilters.intermediate}
        />
        <Checkbox
          label="Advanced"
          onChange={() => toggleDifficultyFilterAction('advanced')}
          checked={difficultyFilters.advanced}
        />
      </div>
      <div className={styles.categoryFilter}>
        <Text weight="fontWeight-medium" className={styles.groupText}>
          Category
        </Text>
        <SearchSelect
          options={categories}
          value={categoryFilters}
          labelKey="name"
          valueKey="normalized_name"
          onChange={values => {
            if (values.length > categoryFilters.length) {
              addCategoryFilterAction(values[values.length - 1]);
            }
          }}
          onClose={removeCategoryFilterAction}
        />
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
    categories: categoriesSelector(state),
    search: bountyState.search
  };
};

const FilterNav = compose(
  withRouter,
  connect(
    mapStateToProps,
    {
      setSearch,
      toggleStageFilter,
      toggleDifficultyFilter,
      addCategoryFilter,
      removeCategoryFilter,
      resetFilters
    }
  )
)(FilterNavComponent);

export default FilterNav;
