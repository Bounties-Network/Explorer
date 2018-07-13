import { PAGE_SIZE, SORT_VALUE } from './constants';

const initialState = {
  loading: true,
  loaded: false,
  error: false,
  offset: 0,
  count: 0,
  sort: SORT_VALUE,
  sort_order: 'asc',
  search: '',
  stage_filters: {
    drafts: false,
    active: false,
    completed: false,
    expired: false,
    dead: false
  },
  difficulty_filter: {
    beginner: false,
    intermediate: false,
    advanced: false
  },
  category_filters: new Set([]),
  bounties: []
};

const LOAD_BOUNTIES = 'bounties/LOAD_BOUNTIES';
const LOAD_BOUNTIES_SUCCESS = 'bounties/LOAD_BOUNTIES_SUCCESS';
const LOAD_BOUNTIES_FAIL = 'bounties/LOAD_BOUNTIES_FAIL';

function loadBounties() {
  return { type: LOAD_BOUNTIES };
}

function loadBountiesSuccess(bounties) {
  return {
    type: LOAD_BOUNTIES_SUCCESS,
    bounties: bounties.results,
    count: bounties.count
  };
}

function loadBountiesFail(error) {
  return { type: LOAD_BOUNTIES_FAIL, error };
}

const LOAD_MORE = 'bounties/LOAD_MORE';

function loadMoreBounties() {
  return { type: LOAD_MORE };
}

const SET_SORT = 'bounties/SET_SORT';
const SET_SEARCH = 'bounties/SET_SEARCH';
const TOGGLE_STAGE_FILTER = 'bounties/TOGGLE_STAGE_FILTER';
const TOGGLE_DIFFICULTY_FILTER = 'bounties/TOGGLE_DIFFICULTY_FILTER';
const ADD_CATEGORY_FILTER = 'bounties/SET_CATEGORY_FILTER';
const REMOVE_CATEGORY_FILTER = 'bounties/REMOVE_CATEGORY_FILTER';

function setSort(sort, sortOrder) {
  return { type: SET_SORT, sort, sortOrder };
}

function setSearch(search) {
  return { type: SET_SEARCH, search };
}

function toggleStageFilter(stage) {
  return { type: TOGGLE_STAGE_FILTER, stage };
}

function toggleDifficultyFilter(difficulty) {
  return { type: TOGGLE_DIFFICULTY_FILTER, difficulty };
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
      const updated_filters = new Set(state.category_filters);
      updated_filters.add(category);

      return {
        ...state,
        category_filters: updated_filters
      };
    }
    case REMOVE_CATEGORY_FILTER: {
      const { category } = action;
      const updated_filters = new Set(state.category_filters);
      updated_filters.delete(category);

      return {
        ...state,
        category_filters: updated_filters
      };
    }
    case TOGGLE_DIFFICULTY_FILTER: {
      const { difficulty } = action;
      return {
        ...state,
        difficulty_filters: {
          ...state.difficulty_filters,
          [difficulty]: !state.difficulty_filtersl[difficulty]
        }
      };
    }
    case TOGGLE_STAGE_FILTER: {
      const { stage } = action;
      return {
        ...state,
        stage_filters: {
          ...state.stage_filters,
          [stage]: !state.stage_filters[stage]
        }
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
    case LOAD_BOUNTIES: {
      const { searchOptions } = action;
      return {
        ...state,
        loading: true,
        loaded: false,
        count: 0,
        error: false,
        searchOptions
      };
    }
    case LOAD_BOUNTIES_SUCCESS: {
      const { bounties, count, searchOptions } = action;

      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        bounties,
        count,
        searchOptions
      };
    }
    case LOAD_BOUNTIES_FAIL: {
      const { searchOptions } = action;
      return {
        ...state,
        loading: false,
        loaded: true,
        error: true,
        searchOptions
      };
    }
    case LOAD_MORE: {
      return {
        ...state,
        offset: state.offset + PAGE_SIZE
      };
    }
    default:
      return state;
  }
}

export const actions = {
  loadBounties,
  loadBountiesSuccess,
  loadBountiesFail,
  loadMoreBounties
};

export const actionTypes = {
  SET_SORT,
  SET_SEARCH,
  TOGGLE_STAGE_FILTER,
  TOGGLE_DIFFICULTY_FILTER,
  ADD_CATEGORY_FILTER,
  REMOVE_CATEGORY_FILTER,
  LOAD_BOUNTIES,
  LOAD_BOUNTIES_SUCCESS,
  LOAD_BOUNTIES_FAIL
};

export default BountiesReducer;
