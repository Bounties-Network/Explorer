import React from 'react';
import styles from './FilterNav.module.scss';
import PropTypes from 'prop-types';
import {
  Search,
  Text,
  Button,
  Checkbox,
  RadioGroup,
  SearchSelect
} from 'components';
import { withRouter } from 'react-router-dom';
import {
  rootBountiesSelector,
  bountiesCategoryFiltersSelector,
  bountiesPlatformFiltersSelector,
  bountiesSortFilterSelector,
  anyStageFiltersSelected,
  anyDifficultyFiltersSelected
} from 'public-modules/Bounties/selectors';
import { categoriesSelector } from 'public-modules/Categories/selectors';
import { each, map as fpMap, reduce as fpReduce, throttle } from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions } from 'public-modules/Bounties';
import {
  toggleFromParam,
  pushToParam,
  removeFromParam,
  setParam
} from 'utils/locationHelpers';
import appConfig from 'public-modules/config';

const map = fpMap.convert({ cap: false });
const reduce = fpReduce.convert({ cap: false });
const {
  resetFilter,
  setSearch,
  setSort,
  toggleStageFilter,
  toggleDifficultyFilter,
  addCategoryFilter,
  addPlatformFilter,
  removeCategoryFilter,
  removePlatformFilter,
  batch
} = actions;

const FilterNavComponent = props => {
  const {
    search,
    resetFilters,
    resetFilter,
    setSearch,
    setSort,
    sortFilter,
    toggleStageFilter,
    toggleDifficultyFilter,
    stageFilters,
    defaultStageFilters,
    defaultPlatforms,
    difficultyFilters,
    categories,
    categoryFilters,
    platformFilters,
    addCategoryFilter,
    addPlatformFilter,
    removeCategoryFilter,
    removePlatformFilter,
    history,
    location,
    batch,

    config,
    position
  } = props;

  const sortOptions = [
    { value: 'usd_price', label: 'Value: High to Low' },
    { value: 'bounty_created', label: 'Most Recent' },
    { value: 'deadline', label: 'Expiry' }
  ];

  const platforms = reduce(
    (acc, key) => {
      acc[key] = { name: key };
      return acc;
    },
    {},
    appConfig.platform.split(',')
  );

  const stages = reduce(
    (acc, value, key) => {
      if (value) acc.push(key);
      return acc;
    },
    [],
    defaultStageFilters
  ).join('%2C');

  const rootLocationParams =
    location.search ||
    `?bountyStage=${stages}&platform=${defaultPlatforms.join(',')}`;

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

  const addPlatformFilterAction = platform => {
    history.push(
      location.pathname + pushToParam(rootLocationParams, 'platform', platform)
    );
    addPlatformFilter(platform);
  };

  const removePlatformFilterAction = platform => {
    history.push(
      location.pathname +
        removeFromParam(rootLocationParams, 'platform', platform)
    );
    removePlatformFilter(platform);
  };

  const setSearchAction = throttle(300, searchValue => {
    history.push(
      location.pathname + setParam(rootLocationParams, 'search', searchValue)
    );
    setSearch(searchValue);
  });

  const setSortAction = sort => {
    const sortOrder = sort === 'usd_price' ? 'desc' : 'ascd';

    history.push(
      location.pathname +
        setParam(rootLocationParams, 'sort', [sort, sortOrder].join(','))
    );

    setSort(sort, sortOrder);
  };

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
    each(platform => addPlatformFilter(platform), defaultPlatforms);
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
      {config.sort && (
        <div className={styles.stageFilter}>
          <Text weight="fontWeight-medium" className={styles.groupText}>
            Sort by
          </Text>
          <RadioGroup
            onChange={setSortAction}
            options={sortOptions}
            value={sortFilter}
          />
        </div>
      )}
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
      {config.platform && (
        <div className={styles.categoryFilter}>
          <Text weight="fontWeight-medium" className={styles.groupText}>
            Platform
          </Text>
          <SearchSelect
            options={platforms}
            value={platformFilters}
            labelKey="name"
            valueKey="name"
            onChange={values => {
              if (values.length > platformFilters.length) {
                addPlatformFilterAction(values[values.length - 1]);
              }
            }}
            onClose={removePlatformFilterAction}
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
    platformFilters: bountiesPlatformFiltersSelector(state),
    sortFilter: bountiesSortFilterSelector(state),
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
      setSort,
      toggleStageFilter,
      toggleDifficultyFilter,
      addCategoryFilter,
      addPlatformFilter,
      removeCategoryFilter,
      removePlatformFilter,
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
  config: {
    search: true,
    stage: true,
    difficulty: true,
    category: true,
    platform: true,
    sort: true
  },
  defaultStageFilters: {
    active: true,
    completed: false,
    expired: false,
    dead: false
  },
  defaultPlatforms: appConfig.platform.split(','),
  resetFilters: {
    address: true,
    search: true,
    stage: true,
    difficulty: true,
    category: true,
    platform: true,
    sort: true
  }
};

export default FilterNav;
