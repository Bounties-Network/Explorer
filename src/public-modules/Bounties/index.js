import { PAGE_SIZE, SORT_CREATED } from './constants';

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
  issuerAddress: '',
  fulfillerAddress: '',
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
const ALL_STAGE_FILTERS = 'bounties/ALL_STAGE_FILTERS';
const TOGGLE_DIFFICULTY_FILTER = 'bounties/TOGGLE_DIFFICULTY_FILTER';
const TOGGLE_CATEGORY_FILTER = 'bounties/TOGGLE_CATEGORY_FILTER';
const ADD_CATEGORY_FILTER = 'bounties/SET_CATEGORY_FILTER';
const ADD_ISSUER_FILTER = 'bounties/ADD_ISSUER_FILTER';
const ADD_FULFILLER_FILTER = 'bounties/ADD_FULFILLER_FILTER';
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

function allStageFilters() {
  return { type: ALL_STAGE_FILTERS };
}

function toggleDifficultyFilter(difficulty) {
  return { type: TOGGLE_DIFFICULTY_FILTER, difficulty };
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
        issuerAddress: address,
        fulfillerAddress: ''
      };
    }
    case ADD_FULFILLER_FILTER: {
      const { address } = action;

      return {
        ...state,
        issuerAddress: '',
        fulfillerAddress: address
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
        ...default_filters
      };
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
        loadingMore: true,
        loadingMoreError: false
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
  resetFilters,
  setSearch,
  toggleStageFilter,
  allStageFilters,
  toggleDifficultyFilter,
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
  loadMoreBountiesFail
};

export const actionTypes = {
  SET_SORT,
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
