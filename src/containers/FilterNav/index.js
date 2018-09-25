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
  bountiesSortFilterSelector
} from 'public-modules/Bounties/selectors';
import { categoriesSelector } from 'public-modules/Categories/selectors';
import {
  each,
  map as fpMap,
  indexOf,
  reduce as fpReduce,
  throttle
} from 'lodash';
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
  togglePlatformFilter,
  addCategoryFilter,
  addPlatformFilter,
  removeCategoryFilter,
  removePlatformFilter,
  batch
} = actions;

const FilterNavComponent = props => {
  const {
    // user props
    resetableFilters,
    config,
    position,

    // current state
    currentDifficultyFilters,
    currentPlatformFilters,
    currentSearchValue,
    currentSortFilter,
    currentStageFilter,
    currentSelectedCategories,

    availableCategories,

    // defaults
    defaultStageFilters,
    defaultPlatforms,

    // actions
    addCategoryFilter,
    filterReseter, // dispatches action to reset a specific filter
    setSearch,
    setSort,
    toggleStageFilter,
    toggleDifficultyFilter,
    togglePlatformFilter,
    removeCategoryFilter,

    history,
    location,
    batch
  } = props;

  const sortOptions = [
    { value: 'bounty_created', label: 'Most Recent' },
    { value: 'usd_price', label: 'Value: High to Low' },
    { value: 'deadline', label: 'Expiry' }
  ];

  const platforms = appConfig.platform.split(',');

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

  const togglePlatformFilterAction = platform => {
    const queryParams =
      toggleFromParam(rootLocationParams, 'platform', platform) || '?platform=';
    history.push(location.pathname + queryParams);
    togglePlatformFilter(platform);
  };

  const setSearchAction = throttle(300, searchValue => {
    history.push(
      location.pathname + setParam(rootLocationParams, 'search', searchValue)
    );
    setSearch(searchValue);
  });

  const setSortAction = sort => {
    const sortOrder = sort === 'deadline' ? 'asc' : 'desc';

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
    }, resetableFilters);
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
          <Search value={currentSearchValue} onChange={setSearchAction} />
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
          Reset
        </Button>
      </div>
      {config.sort && (
        <div className={styles.stageFilter}>
          <Text weight="fontWeight-medium" className={styles.groupText}>
            Sort
          </Text>
          <RadioGroup
            onChange={setSortAction}
            options={sortOptions}
            value={currentSortFilter}
          />
        </div>
      )}
      {config.platform &&
        platforms &&
        platforms.length > 1 && (
          <div className={styles.categoryFilter}>
            <Text weight="fontWeight-medium" className={styles.groupText}>
              Platform
            </Text>
            {map(platform => {
              return (
                <Checkbox
                  key={platform}
                  label={platform}
                  onChange={() => togglePlatformFilterAction(platform)}
                  checked={indexOf(platform, currentPlatformFilters) !== -1}
                />
              );
            }, platforms)}
          </div>
        )}
      {config.category && (
        <div className={styles.categoryFilter}>
          <Text weight="fontWeight-medium" className={styles.groupText}>
            Category
          </Text>
          <SearchSelect
            options={availableCategories}
            value={currentSelectedCategories}
            labelKey="name"
            valueKey="normalized_name"
            onChange={values => {
              if (values.length > currentSelectedCategories.length) {
                addCategoryFilterAction(values[values.length - 1]);
              }
            }}
            onClose={removeCategoryFilterAction}
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
            checked={currentStageFilter.active}
          />
          <Checkbox
            label="Completed"
            onChange={() => toggleStageFilterAction('completed')}
            checked={currentStageFilter.completed}
          />
          <Checkbox
            label="Expired"
            onChange={() => toggleStageFilterAction('expired')}
            checked={currentStageFilter.expired}
          />
          <Checkbox
            label="Dead"
            onChange={() => toggleStageFilterAction('dead')}
            checked={currentStageFilter.dead}
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
            checked={currentDifficultyFilters.beginner}
          />
          <Checkbox
            label="Intermediate"
            onChange={() => toggleDifficultyFilterAction('intermediate')}
            checked={currentDifficultyFilters.intermediate}
          />
          <Checkbox
            label="Advanced"
            onChange={() => toggleDifficultyFilterAction('advanced')}
            checked={currentDifficultyFilters.advanced}
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
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

const FilterNav = compose(
  withRouter,
  connect(
    mapStateToProps,
    {
      setSearch,
      setSort,
      toggleStageFilter,
      toggleDifficultyFilter,
      togglePlatformFilter,
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
  position: PropTypes.oneOf(['relative', 'fixed']),
  config: PropTypes.object,
  stageFilters: PropTypes.object,
  resetableFilters: PropTypes.object
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
  resetableFilters: {
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
