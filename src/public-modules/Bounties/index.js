import { PAGE_SIZE, SORT_CREATED } from './constants';

const defaultSearch = '';

const defaultStageFilters = {
  drafts: false,
  active: false,
  completed: false,
  expired: false,
  dead: false
};

const defaultDifficultyFilters = {
  beginner: false,
  intermediate: false,
  advanced: false
};

const defaultAddressFilters = {
  issuer: '',
  fulfiller: ''
};

const defaultFilters = {
  search: defaultSearch,
  stageFilters: { ...defaultStageFilters },
  difficultyFilters: { ...defaultDifficultyFilters },
  addressFilters: { ...defaultAddressFilters },
  categoryFilters: new Set([])
};

const defaultSort = {
  sort: SORT_CREATED,
  sortOrder: 'asc'
};

const initialState = {
  batch: false,
  loading: true,
  loadingMore: false,
  loadingMoreError: false,
  loaded: false,
  error: false,
  offset: 0,
  count: 0,
  bounties: [],
  ...defaultFilters,
  ...defaultSort
};

const LOAD_BOUNTIES = 'bounties/LOAD_BOUNTIES';
const LOAD_MORE_BOUNTIES = 'bounties/LOAD_MORE_BOUNTIES';
const LOAD_MORE_BOUNTIES_SUCCESS = 'bounties/LOAD_MORE_BOUNTIES_SUCCESS';
const LOAD_BOUNTIES_SUCCESS = 'bounties/LOAD_BOUNTIES_SUCCESS';
const LOAD_MORE_BOUNTIES_FAIL = 'bounties/LOAD_MORE_BOUNTIES_FAIL';
const LOAD_BOUNTIES_FAIL = 'bounties/LOAD_BOUNTIES_FAIL';
const RESET_STATE = 'bounties/RESET_STATE';

function resetState() {
  return { type: RESET_STATE };
}

function loadBounties(initializeFromQuery = false) {
  return { type: LOAD_BOUNTIES, initializeFromQuery };
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

const SET_BATCH = 'bounties/SET_BATCH';
const SET_SORT = 'bounties/SET_SORT';
const RESET_FILTERS = 'bounties/RESET_FILTERS';
const RESET_FILTER = 'bounties/RESET_FILTER';
const SET_SEARCH = 'bounties/SET_SEARCH';
const TOGGLE_STAGE_FILTER = 'bounties/TOGGLE_STAGE_FILTER';
const ALL_STAGE_FILTERS = 'bounties/ALL_STAGE_FILTERS';
const SET_DIFFICULTY_FILTER = 'bounties/SET_DIFFICULTY_FILTER';
const TOGGLE_DIFFICULTY_FILTER = 'bounties/TOGGLE_DIFFICULTY_FILTER';
const TOGGLE_CATEGORY_FILTER = 'bounties/TOGGLE_CATEGORY_FILTER';
const SET_STAGE_FILTER = 'bounties/SET_STAGE_FILTER';
const ADD_CATEGORY_FILTER = 'bounties/SET_CATEGORY_FILTER';
const ADD_ISSUER_FILTER = 'bounties/ADD_ISSUER_FILTER';
const ADD_FULFILLER_FILTER = 'bounties/ADD_FULFILLER_FILTER';
const REMOVE_CATEGORY_FILTER = 'bounties/REMOVE_CATEGORY_FILTER';

function batch(isBatch) {
  return { type: SET_BATCH, isBatch };
}

function setSort(sort, sortOrder) {
  return { type: SET_SORT, sort, sortOrder };
}

function resetFilters() {
  return { type: RESET_FILTERS };
}

function resetFilter(filter) {
  return { type: RESET_FILTER, filter };
}

function setSearch(search) {
  return { type: SET_SEARCH, search };
}

function setStageFilter(stage, isSet) {
  return { type: SET_STAGE_FILTER, stage, isSet };
}

function toggleStageFilter(stage) {
  return { type: TOGGLE_STAGE_FILTER, stage };
}

function allStageFilters() {
  return { type: ALL_STAGE_FILTERS };
}

function toggleDifficultyFilter(difficulty) {
  return { type: TOGGLE_DIFFICULTY_FILTER, difficulty };
}

function setDifficultyFilter(difficulty, isSet) {
  return { type: SET_DIFFICULTY_FILTER, difficulty };
}

function toggleCategoryFilter(category) {
  return { type: TOGGLE_CATEGORY_FILTER, category };
}

function addCategoryFilter(category) {
  return { type: ADD_CATEGORY_FILTER, category };
}

function addIssuerFilter(address) {
  return { type: ADD_ISSUER_FILTER, address };
}

function addFulfillerFilter(address) {
  return { type: ADD_FULFILLER_FILTER, address };
}

function removeCategoryFilter(category) {
  return { type: REMOVE_CATEGORY_FILTER, category };
}

function BountiesReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_STATE: {
      return {
        ...initialState
      };
    }
    case TOGGLE_CATEGORY_FILTER: {
      const { category } = action;

      const updated_filters = new Set(state.categoryFilters);
      if (updated_filters.has(category)) {
        updated_filters.delete(category);
      } else {
        updated_filters.add(category);
      }

      return {
        ...state,
        categoryFilters: updated_filters
      };
    }
    case ADD_CATEGORY_FILTER: {
      const { category } = action;
      const updated_filters = new Set(state.categoryFilters);
      updated_filters.add(category);

      return {
        ...state,
        categoryFilters: updated_filters
      };
    }
    case ADD_ISSUER_FILTER: {
      const { address } = action;

      return {
        ...state,
        addressFilters: {
          issuer: address,
          fulfiller: ''
        }
      };
    }
    case ADD_FULFILLER_FILTER: {
      const { address } = action;

      return {
        ...state,
        addressFilters: {
          issuer: '',
          fulfiller: address
        }
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
    case SET_DIFFICULTY_FILTER: {
      const { difficulty, isSet } = action;
      return {
        ...state,
        difficultyFilters: {
          ...state.difficultyFilters,
          [difficulty]: isSet
        }
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
    case SET_STAGE_FILTER: {
      const { stage, isSet } = action;
      return {
        ...state,
        stageFilters: {
          ...state.stageFilters,
          [stage]: isSet
        }
      };
    }
    case ALL_STAGE_FILTERS: {
      return {
        ...state,
        stageFilters: {
          drafts: true,
          active: true,
          completed: true,
          expired: true,
          dead: true
        }
      };
    }
    case RESET_FILTERS: {
      return {
        ...state,
        ...defaultFilters
      };
    }
    case RESET_FILTER: {
      const { filter } = action;

      if (filter === 'search') {
        return { ...state, search: defaultSearch };
      }

      if (filter === 'stage') {
        return { ...state, stageFilters: { ...defaultStageFilters } };
      }

      if (filter === 'difficulty') {
        return { ...state, difficultyFilters: { ...defaultDifficultyFilters } };
      }

      if (filter === 'address') {
        return { ...state, addressFilters: { ...defaultAddressFilters } };
      }

      if (filter === 'category') {
        return { ...state, categoryFilters: new Set([]) };
      }
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
    case SET_BATCH: {
      const { isBatch } = action;

      return {
        ...state,
        batch: isBatch
      };
    }
    case LOAD_MORE_BOUNTIES: {
      return {
        ...state,
        loadingMore: true,
        loadingMoreError: false
      };
    }
    case LOAD_BOUNTIES: {
      return {
        ...state,
        batch: false,
        count: 0,
        loading: true,
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
        bounties: [...state.bounties, ...bounties],
        offset: state.offset + PAGE_SIZE
      };
    }
    case LOAD_BOUNTIES_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: true
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
  resetFilter,
  resetFilters,
  setSearch,
  toggleStageFilter,
  setStageFilter,
  allStageFilters,
  toggleDifficultyFilter,
  setDifficultyFilter,
  addCategoryFilter,
  addIssuerFilter,
  addFulfillerFilter,
  removeCategoryFilter,
  toggleCategoryFilter,
  loadBounties,
  loadBountiesSuccess,
  loadBountiesFail,
  loadMoreBounties,
  loadMoreBountiesSuccess,
  loadMoreBountiesFail,
  batch,
  resetState
};

export const actionTypes = {
  SET_BATCH,
  SET_SORT,
  RESET_FILTER,
  RESET_FILTERS,
  SET_SEARCH,
  TOGGLE_STAGE_FILTER,
  ALL_STAGE_FILTERS,
  TOGGLE_DIFFICULTY_FILTER,
  ADD_CATEGORY_FILTER,
  ADD_ISSUER_FILTER,
  ADD_FULFILLER_FILTER,
  REMOVE_CATEGORY_FILTER,
  TOGGLE_CATEGORY_FILTER,
  LOAD_BOUNTIES,
  LOAD_BOUNTIES_SUCCESS,
  LOAD_BOUNTIES_FAIL,
  LOAD_MORE_BOUNTIES,
  LOAD_MORE_BOUNTIES_SUCCESS,
  LOAD_MORE_BOUNTIES_FAIL
};

export default BountiesReducer;
