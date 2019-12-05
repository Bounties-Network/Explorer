/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import styles from "./FilterNav.module.scss";
import PropTypes from "prop-types";
import { Search, RadioGroup } from "components";
import { curry, each, map as fpMap, indexOf, reduce as fpReduce, throttle } from "lodash";
import { toggleFromParam, pushToParam, removeFromParam, setParam } from "utils/locationHelpers";
import appConfig from "public-modules/config";
import intl from "react-intl-universal";
import ExplorerDropdown from "fora-components/ExplorerDropdown";
import SearchSelect from "fora-components/SearchSelect";
import Pill from "fora-components/Pill";
import Checkbox from "fora-components/Checkbox";
import Button from "fora-components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/pro-regular-svg-icons";
import { Text } from "@theme-ui/components";

const map = fpMap.convert({ cap: false });
const reduce = fpReduce.convert({ cap: false });
const categoryFilterStyle = { my: 3, '> div:first-of-type': { mb: 3 } }

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
    removePlatformFilter,
    removeCategoryFilter,

    history,
    location,
    batch
  } = props;

  // console.log(removePlatformFilter)

  const sortOptions = [
    {
      value: "bounty_created",
      label: intl.get("components.filter_nav.sort_options.bounty_created")
    },
    {
      value: "usd_price",
      label: intl.get("components.filter_nav.sort_options.usd_price")
    },
    {
      value: "deadline",
      label: intl.get("components.filter_nav.sort_options.deadline")
    }
  ];

  const platforms = appConfig.displayPlatforms;

  const stages = reduce(
    (acc, value, key) => {
      if (value) acc.push(key);
      return acc;
    },
    [],
    defaultStageFilters
  ).join("%2C");

  const rootLocationParams = location.search || `?bounty_stage=${stages}&platform=${defaultPlatforms.join(",")}`;

  const baseAction = curry((queryModifier, key, value, action) => {
    value = Array.isArray(value) ? value : [value];
    const queryParams = queryModifier(rootLocationParams, key, value.join(","));
    history.push(location.pathname + queryParams);
    action(...value);
  });

  const toggleAction = baseAction(toggleFromParam);
  const pushAction = baseAction(pushToParam);
  const removeAction = baseAction(removeFromParam);
  const setAction = baseAction(setParam);

  const toggleStageFilterAction = stage => toggleAction('bounty_stage', stage, toggleStageFilter); // prettier-ignore
  const toggleDifficultyFilterAction = difficulty => toggleAction('difficulty', difficulty, toggleDifficultyFilter); // prettier-ignore
  const togglePlatformFilterAction = platform => toggleAction('platform', platform, togglePlatformFilter); // prettier-ignore
  const removePlatformFilterAction = platform => removeAction('platform', platform, removePlatformFilter); // prettier-ignore

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

  const communities = platforms.map(platform => ({
    value: platform,
    label: platform,
    community: {
      id: platform,
      src:
        "https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo",
      name: platform,
      memberCount: 1234
    }
  }));

  const communityOptions = [...communities];

  const collectionOptions = [
    {
      value: "yourCommunities",
      label: "Your Communities"
    },
    {
      value: "allBounties",
      label: "All Bounties"
    }
  ];

  const options = [
    { label: "Bounty collections", options: collectionOptions },
    { label: "From your communities", options: communityOptions }
  ];

  return (
    <div className={`${styles.filterNav} ${position === "fixed" && styles["fixed"]}`}>
      {config.search && (
        <div className={styles.searchWrapper}>
          <Search value={currentSearchValue} onChange={setSearchAction} />
        </div>
      )}
      <div className={styles.refineWrapper} sx={{ "> button": { ml: "auto" } }}>
        <Text sx={{ fontSize: "h3" }} variant="headingSans">
          {intl.get("components.filter_nav.refine")}
        </Text>
        <Button variant="link.affirmative" onClick={resetFilterAction}>
          {intl.get("actions.reset")}
        </Button>
      </div>
      <div sx={categoryFilterStyle}>
        <Text variant='bodyStrong'>
          {'Source'}
        </Text>
        <ExplorerDropdown
          options={options}
          placeholder={"Source"}
          value={communities.find(community => community.value === currentPlatformFilters[0])}
          handleChange={({ value: platform }) => {
            currentPlatformFilters.map(removePlatformFilterAction);
            togglePlatformFilterAction(platform);
          }}
        />
      </div>
      {config.category && (
        <div sx={categoryFilterStyle}>
          <Text variant='bodyStrong'>
            {intl.get("components.filter_nav.category")}
          </Text>
          <SearchSelect
            value={null}
            handleChange={option => {
              console.log(option);
              addCategoryFilterAction(option.normalized_name);
            }}
            options={availableCategories
              .filter(x => !currentSelectedCategories.includes(x))
              .map(option => ({
                ...option,
                value: option.id,
                label: option.name
              }))}
            placeholder="Tags"
          />
          <div sx={{ cursor: "pointer", display: "flex", mt: 2, "> :not(:last-of-type)": { mr: 1 } }}>
            {currentSelectedCategories.map(category => {
              return (
                <Pill variant="tag.explorer" onClick={() => removeCategoryFilterAction(category)}>
                  <div
                    sx={{
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      "> :first-of-type": { mr: 2 }
                    }}
                  >
                    <Text color={"brandGray.400"} variant="body">
                      {category}
                    </Text>
                    <FontAwesomeIcon sx={{ color: "brandPrimary.300" }} icon={faTimes}></FontAwesomeIcon>
                  </div>
                </Pill>
              );
            })}
          </div>
        </div>
      )}
      {config.stage && (
        <div sx={{ ...categoryFilterStyle, "> label:not(:last-of-type)": { mb: 2 }}}>
          <Text variant='bodyStrong'>
            {intl.get("components.filter_nav.stage")}
          </Text>
          <Checkbox
            label={intl.get("components.filter_nav.checkbox.active")}
            onChange={() => {
              toggleStageFilterAction("active");
            }}
            checked={currentStageFilter.active}
          />
          <Checkbox
            label={intl.get("components.filter_nav.checkbox.completed")}
            onChange={() => toggleStageFilterAction("completed")}
            checked={currentStageFilter.completed}
          />
          <Checkbox
            label={intl.get("components.filter_nav.checkbox.expired")}
            onChange={() => toggleStageFilterAction("expired")}
            checked={currentStageFilter.expired}
          />
          <Checkbox
            label={intl.get("components.filter_nav.checkbox.dead")}
            onChange={() => toggleStageFilterAction("dead")}
            checked={currentStageFilter.dead}
          />
        </div>
      )}
      {config.difficulty && (
        <div sx={{ ...categoryFilterStyle, "> label:not(:last-of-type)": { mb: 2 }}}>
          <Text variant='bodyStrong'>
            {intl.get("components.filter_nav.difficulty")}
          </Text>
          <Checkbox
            label={intl.get("components.bounty_card.difficulty_options.beginner")}
            onChange={() => toggleDifficultyFilterAction("beginner")}
            checked={currentDifficultyFilters.beginner}
          />
          <Checkbox
            label={intl.get("components.bounty_card.difficulty_options.intermediate")}
            onChange={() => toggleDifficultyFilterAction("intermediate")}
            checked={currentDifficultyFilters.intermediate}
          />
          <Checkbox
            label={intl.get("components.bounty_card.difficulty_options.advanced")}
            onChange={() => toggleDifficultyFilterAction("advanced")}
            checked={currentDifficultyFilters.advanced}
          />
        </div>
      )}
      {/* TODO REMOVE? */}
      {config.sort && (
        <div sx={categoryFilterStyle}>
          <Text variant='bodyStrong'>
            {intl.get('actions.sort')}
          </Text>
          <RadioGroup
            onChange={setSortAction}
            options={sortOptions}
            value={currentSortFilter}
          />
        </div>
      )}
    </div>
  );
};

FilterNav.propTypes = {
  position: PropTypes.oneOf(["relative", "fixed"]),
  config: PropTypes.object,
  stageFilters: PropTypes.object,
  resetableFilters: PropTypes.object
};

FilterNav.defaultProps = {
  position: "relative",
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
  defaultPlatforms: appConfig.platform.split(","),
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
