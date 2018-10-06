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
import {
  curry,
  each,
  map as fpMap,
  indexOf,
  reduce as fpReduce,
  throttle
} from 'lodash';
import {
  toggleFromParam,
  pushToParam,
  removeFromParam,
  setParam
} from 'utils/locationHelpers';
import appConfig from 'public-modules/config';

const map = fpMap.convert({ cap: false });
const reduce = fpReduce.convert({ cap: false });

const FilterNav = props => {
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
    addPlatformFilter,
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

  const platforms = appConfig.displayPlatforms;

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

  const baseAction = curry((queryModifier, key, value, action) => {
    value = Array.isArray(value) ? value : [value];
    const queryParams = queryModifier(rootLocationParams, key, value.join(','));
    history.push(location.pathname + queryParams);
    action(...value);
  });

  const toggleAction = baseAction(toggleFromParam);
  const pushAction = baseAction(pushToParam);
  const removeAction = baseAction(removeFromParam);
  const setAction = baseAction(setParam);

  const toggleStageFilterAction = stage => toggleAction('bountyStage', stage, toggleStageFilter); // prettier-ignore
  const toggleDifficultyFilterAction = difficulty => toggleAction('difficulty', difficulty, toggleDifficultyFilter); // prettier-ignore
  const togglePlatformFilterAction = platform => toggleAction('platform', platform, togglePlatformFilter); // prettier-ignore

  const addCategoryFilterAction = category => pushAction('category', category, addCategoryFilter); // prettier-ignore
  const removeCategoryFilterAction = category => removeAction('category', category, removeCategoryFilter); // prettier-ignore

  const setSearchAction = throttle(300, search => setAction('search', search, setSearch)); // prettier-ignore
  const setSortAction = sort => setAction('sort', [sort, sort === 'deadline' ? 'asc' : 'desc'], setSort); // prettier-ignore

  const resetFilterAction = () => {
    batch(true);
    map((value, key) => {
      if (value) {
        filterReseter(key);
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
