import React from 'react';
import styles from './FilterNav.module.scss';
import PropTypes from 'prop-types';
import { Search, Text, Button, Checkbox, SearchSelect } from 'components';
import { withRouter } from 'react-router-dom';
import {
  rootBountiesSelector,
  bountiesCategoryFiltersSelector,
  anyStageFiltersSelected,
  anyDifficultyFiltersSelected
} from 'public-modules/Bounties/selectors';
import { categoriesSelector } from 'public-modules/Categories/selectors';
import { map as fpMap, reduce as fpReduce, throttle } from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions } from 'public-modules/Bounties';
import {
  toggleFromParam,
  pushToParam,
  removeFromParam,
  setParam
} from 'utils/locationHelpers';
const map = fpMap.convert({ cap: false });
const reduce = fpReduce.convert({ cap: false });
const {
  resetFilter,
  setSearch,
  toggleStageFilter,
  toggleDifficultyFilter,
  addCategoryFilter,
  removeCategoryFilter,
  batch
} = actions;

const FilterNavComponent = props => {
  const {
    search,
    resetFilters,
    resetFilter,
    setSearch,
    toggleStageFilter,
    toggleDifficultyFilter,
    stageFilters,
    defaultStageFilters,
    difficultyFilters,
    categories,
    categoryFilters,
    addCategoryFilter,
    removeCategoryFilter,
    history,
    location,
    batch,

    config,
    position
  } = props;

  const stages = reduce(
    (acc, value, key) => {
      if (value) acc.push(key);
      return acc;
    },
    [],
    defaultStageFilters
  ).join('%2C');

  const rootLocationParams = location.search || `?bountyStage=${stages}`;

  const toggleStageFilterAction = stage => {
    const queryParams =
      toggleFromParam(rootLocationParams, 'bountyStage', stage) ||
      '?bountyStage=';
    history.push(location.pathname + queryParams);
    toggleStageFilter(stage);
  };

  const toggleDifficultyFilterAction = difficulty => {
    history.push(
      location.pathname +
        toggleFromParam(rootLocationParams, 'difficulty', difficulty)
    );
    toggleDifficultyFilter(difficulty);
  };

  const addCategoryFilterAction = category => {
    history.push(
      location.pathname + pushToParam(rootLocationParams, 'category', category)
    );
    addCategoryFilter(category);
  };

  const removeCategoryFilterAction = category => {
    history.push(
      location.pathname +
        removeFromParam(rootLocationParams, 'category', category)
    );
    removeCategoryFilter(category);
  };

  const setSearchAction = throttle(300, searchValue => {
    history.push(
      location.pathname + setParam(rootLocationParams, 'search', searchValue)
    );
    setSearch(searchValue);
  });

  const resetFilterAction = () => {
    batch(true);
    map((value, key) => {
      if (value) {
        resetFilter(key);
      }
    }, resetFilters);
    map((value, key) => {
      if (value) {
        toggleStageFilterAction(key);
      }
    }, defaultStageFilters);
    batch(false);
    history.push(location.pathname);
  };

  return (
    <div
      className={`${styles.filterNav} ${position === 'fixed' &&
        styles['fixed']}`}
    >
      {config.search && (
        <div className={styles.searchWrapper}>
          <Search value={search} onChange={setSearchAction} />
        </div>
      )}
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
      {config.stage && (
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
      )}
      {config.difficulty && (
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
      )}
      {config.category && (
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
      )}
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
      resetFilter,
      batch
    }
  )
)(FilterNavComponent);

FilterNav.propTypes = {
  position: PropTypes.bool,
  config: PropTypes.array,
  stageFilters: PropTypes.object,
  resetFilters: PropTypes.object
};

FilterNav.defaultProps = {
  position: 'relative',
  config: { search: true, stage: true, difficulty: true, category: true },
  defaultStageFilters: {
    active: true,
    completed: false,
    expired: false,
    dead: false
  },
  resetFilters: {
    address: true,
    search: true,
    stage: true,
    difficulty: true,
    category: true
  }
};

export default FilterNav;
