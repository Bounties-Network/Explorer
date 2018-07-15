import { PAGE_SIZE, SORT_CREATED } from './constants';

// It may seem counter intuitive that all maps
// to all values being false. However, the query generator only includes
// the __in filter if at least one value is true
const all_stage_filters = {
  draft: false,
  active: false,
  completed: false,
  expired: false,
  dead: false
};

// It may seem counter intuitive that all maps
// to all values being false. However, the query generator only includes
// the __in filter if at least one value is true
const all_difficulty_filters = {
  beginner: false,
  intermediate: false,
  advanced: false
};

const default_filters = {
  search: '',
  stageFilters: {
    drafts: false,
    active: true,
    completed: false,
    expired: false,
    dead: false
  },
  difficultyFilters: {
    beginner: false,
    intermediate: false,
    advanced: false
  },
  categoryFilters: new Set([])
};

const initialState = {
  loading: true,
  loadingMore: false,
  loadingMoreError: false,
  loaded: false,
  error: false,
  offset: 0,
  count: 0,
  sort: SORT_CREATED,
  sortOrder: 'asc',
  bounties: [],
  ...default_filters
};

const LOAD_BOUNTIES = 'bounties/LOAD_BOUNTIES';
const LOAD_MORE_BOUNTIES = 'bounties/LOAD_MORE_BOUNTIES';
const LOAD_MORE_BOUNTIES_SUCCESS = 'bounties/LOAD_MORE_BOUNTIES_SUCCESS';
const LOAD_BOUNTIES_SUCCESS = 'bounties/LOAD_BOUNTIES_SUCCESS';
const LOAD_MORE_BOUNTIES_FAIL = 'bounties/LOAD_MORE_BOUNTIES_FAIL';
const LOAD_BOUNTIES_FAIL = 'bounties/LOAD_BOUNTIES_FAIL';

function loadBounties() {
  return { type: LOAD_BOUNTIES };
}

function loadMoreBounties() {
  return { type: LOAD_MORE_BOUNTIES };
}

function loadBountiesSuccess(bounties) {
  return {
    type: LOAD_BOUNTIES_SUCCESS,
    bounties: bounties.results,
    count: bounties.count
  };
}

function loadMoreBountiesSuccess(bounties) {
  return {
    type: LOAD_MORE_BOUNTIES_SUCCESS,
    bounties: bounties.results
  };
}

function loadBountiesFail(error) {
  return { type: LOAD_BOUNTIES_FAIL, error };
}

function loadMoreBountiesFail(error) {
  return { type: LOAD_MORE_BOUNTIES_FAIL, error };
}

const SET_SORT = 'bounties/SET_SORT';
const RESET_FILTERS = 'bounties/RESET_FILTERS';
const SET_SEARCH = 'bounties/SET_SEARCH';
const TOGGLE_STAGE_FILTER = 'bounties/TOGGLE_STAGE_FILTER';
const TOGGLE_DIFFICULTY_FILTER = 'bounties/TOGGLE_DIFFICULTY_FILTER';
const SET_ALL_STAGE_FILTERS = 'bounties/SET_ALL_STAGE_FILTERS';
const SET_ALL_DIFFICULTY_FILTERS = 'bounties/SET_ALL_DIFFICULTY_FILTERS';
const ADD_CATEGORY_FILTER = 'bounties/SET_CATEGORY_FILTER';
const REMOVE_CATEGORY_FILTER = 'bounties/REMOVE_CATEGORY_FILTER';

function setSort(sort, sortOrder) {
  return { type: SET_SORT, sort, sortOrder };
}

function resetFilters() {
  return { type: RESET_FILTERS };
}

function setSearch(search) {
  return { type: SET_SEARCH, search };
}

function toggleStageFilter(stage) {
  return { type: TOGGLE_STAGE_FILTER, stage };
}

function setAllStageFilters() {
  return { type: SET_ALL_STAGE_FILTERS };
}

function toggleDifficultyFilter(difficulty) {
  return { type: TOGGLE_DIFFICULTY_FILTER, difficulty };
}

function setAllDifficultyFilters() {
  return { type: SET_ALL_DIFFICULTY_FILTERS };
}

function addCategoryFilter(category) {
  return { type: ADD_CATEGORY_FILTER, category };
}

function removeCategoryFilter(category) {
  return { type: REMOVE_CATEGORY_FILTER, category };
}

function BountiesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CATEGORY_FILTER: {
      const { category } = action;
      const updated_filters = new Set(state.categoryFilters);
      updated_filters.add(category);

      return {
        ...state,
        categoryFilters: updated_filters
      };
    }
    case REMOVE_CATEGORY_FILTER: {
      const { category } = action;
      const updated_filters = new Set(state.categoryFilters);
      updated_filters.delete(category);

      return {
        ...state,
        categoryFilters: updated_filters
      };
    }
    case SET_ALL_DIFFICULTY_FILTERS: {
      return {
        ...state,
        difficultyFilters: { ...all_difficulty_filters }
      };
    }
    case TOGGLE_DIFFICULTY_FILTER: {
      const { difficulty } = action;
      return {
        ...state,
        difficultyFilters: {
          ...state.difficultyFilters,
          [difficulty]: !state.difficultyFilters[difficulty]
        }
      };
    }
    case SET_ALL_STAGE_FILTERS: {
      return {
        ...state,
        stageFilters: { ...all_stage_filters }
      };
    }
    case TOGGLE_STAGE_FILTER: {
      const { stage } = action;
      return {
        ...state,
        stageFilters: {
          ...state.stageFilters,
          [stage]: !state.stageFilters[stage]
        }
      };
    }
    case RESET_FILTERS: {
      const newState = {
        ...state,
        ...default_filters
      };
      console.log(newState);
      return newState;
    }
    case SET_SEARCH: {
      const { search } = action;
      return {
        ...state,
        search
      };
    }
    case SET_SORT: {
      const { sort, sortOrder } = action;
      return {
        ...state,
        sort,
        sortOrder
      };
    }
    case LOAD_MORE_BOUNTIES: {
      return {
        ...state,
        loadingMore: true
      };
    }
    case LOAD_BOUNTIES: {
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false
      };
    }
    case LOAD_BOUNTIES_SUCCESS: {
      const { bounties, count } = action;

      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        bounties,
        count
      };
    }
    case LOAD_MORE_BOUNTIES_SUCCESS: {
      const { bounties } = action;

      return {
        ...state,
        loadingMore: false,
        bounties: [...state.bounties, ...bounties]
      };
    }
    case LOAD_BOUNTIES_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: true,
        offset: state.offset + PAGE_SIZE
      };
    }
    case LOAD_MORE_BOUNTIES_FAIL: {
      return {
        ...state,
        loadingMore: false,
        loadingMoreError: true
      };
    }
    default:
      return state;
  }
}

export const actions = {
  setSort,
  resetFilters,
  setSearch,
  toggleStageFilter,
  toggleDifficultyFilter,
  setAllDifficultyFilters,
  setAllStageFilters,
  addCategoryFilter,
  removeCategoryFilter,
  loadBounties,
  loadBountiesSuccess,
  loadBountiesFail,
  loadMoreBounties,
  loadMoreBountiesSuccess,
  loadMoreBountiesFail
};

export const actionTypes = {
  SET_SORT,
  RESET_FILTERS,
  SET_SEARCH,
  SET_ALL_STAGE_FILTERS,
  SET_ALL_DIFFICULTY_FILTERS,
  TOGGLE_STAGE_FILTER,
  TOGGLE_DIFFICULTY_FILTER,
  ADD_CATEGORY_FILTER,
  REMOVE_CATEGORY_FILTER,
  LOAD_BOUNTIES,
  LOAD_BOUNTIES_SUCCESS,
  LOAD_BOUNTIES_FAIL,
  LOAD_MORE_BOUNTIES,
  LOAD_MORE_BOUNTIES_SUCCESS,
  LOAD_MORE_BOUNTIES_FAIL
};

export default BountiesReducer;
