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
  tagFilters: new Set([]),
  platformFilters: new Set([])
};

const defaultSort = {
  sort: SORT_CREATED,
  sortOrder: 'desc'
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
const TOGGLE_TAG_FILTER = 'bounties/TOGGLE_TAG_FILTER';
const TOGGLE_PLATFORM_FILTER = 'bounties/TOGGLE_PLATFORM_FILTER';
const SET_STAGE_FILTER = 'bounties/SET_STAGE_FILTER';
const ADD_TAG_FILTER = 'bounties/SET_TAG_FILTER';
const ADD_PLATFORM_FILTER = 'bounties/ADD_PLATFORM_FILTER';
const ADD_ISSUER_FILTER = 'bounties/ADD_ISSUER_FILTER';
const ADD_FULFILLER_FILTER = 'bounties/ADD_FULFILLER_FILTER';
const REMOVE_TAG_FILTER = 'bounties/REMOVE_TAG_FILTER';
const REMOVE_PLATFORM_FILTER = 'bounties/REMOVE_PLATFORM_FILTER';

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

function toggleTagFilter(tag) {
  return { type: TOGGLE_TAG_FILTER, tag };
}

function togglePlatformFilter(platform) {
  return { type: TOGGLE_PLATFORM_FILTER, platform };
}

function addTagFilter(tag) {
  return { type: ADD_TAG_FILTER, tag };
}

function addPlatformFilter(platform) {
  return { type: ADD_PLATFORM_FILTER, platform };
}

function addIssuerFilter(address) {
  return { type: ADD_ISSUER_FILTER, address };
}

function addFulfillerFilter(address) {
  return { type: ADD_FULFILLER_FILTER, address };
}

function removeTagFilter(tag) {
  return { type: REMOVE_TAG_FILTER, tag };
}

function removePlatformFilter(platform) {
  return { type: REMOVE_PLATFORM_FILTER, platform };
}

function BountiesReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_STATE: {
      return {
        ...initialState
      };
    }
    case TOGGLE_TAG_FILTER: {
      const { tag } = action;

      const updated_filters = new Set(state.tagFilters);
      if (updated_filters.has(tag)) {
        updated_filters.delete(tag);
      } else {
        updated_filters.add(tag);
      }

      return {
        ...state,
        tagFilters: updated_filters
      };
    }
    case TOGGLE_PLATFORM_FILTER: {
      const { platform } = action;

      const updated_filters = new Set(state.platformFilters);
      if (updated_filters.has(platform)) {
        updated_filters.delete(platform);
      } else {
        updated_filters.add(platform);
      }

      return {
        ...state,
        platformFilters: updated_filters
      };
    }
    case ADD_TAG_FILTER: {
      const { tag } = action;
      const updated_filters = new Set(state.tagFilters);
      updated_filters.add(tag);

      return {
        ...state,
        tagFilters: updated_filters
      };
    }
    case ADD_PLATFORM_FILTER: {
      const { platform } = action;
      const updated_filters = new Set(state.platformFilters);
      updated_filters.add(platform);

      return {
        ...state,
        platformFilters: updated_filters
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
    case REMOVE_TAG_FILTER: {
      const { tag } = action;
      const updated_filters = new Set(state.tagFilters);
      updated_filters.delete(tag);

      return {
        ...state,
        tagFilters: updated_filters
      };
    }
    case REMOVE_PLATFORM_FILTER: {
      const { platform } = action;
      const updated_filters = new Set(state.platformFilters);
      updated_filters.delete(platform);

      return {
        ...state,
        platformFilters: updated_filters
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
        ...defaultFilters,
        ...defaultSort
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

      if (filter === 'tag') {
        return { ...state, tagFilters: new Set([]) };
      }

      if (filter === 'platform') {
        return { ...state, platformFilters: new Set([]) };
      }

      if (filter === 'sort') {
        return { ...state, ...defaultSort };
      }

      break;
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
        count: 0,
        loading: true,
        error: false
      };
    }
    case LOAD_BOUNTIES_SUCCESS: {
      const { bounties, count } = action;

      return {
        ...state,
        batch: false,
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
  addTagFilter,
  addPlatformFilter,
  addIssuerFilter,
  addFulfillerFilter,
  removeTagFilter,
  removePlatformFilter,
  toggleTagFilter,
  togglePlatformFilter,
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
  ADD_TAG_FILTER,
  ADD_PLATFORM_FILTER,
  ADD_ISSUER_FILTER,
  ADD_FULFILLER_FILTER,
  REMOVE_TAG_FILTER,
  REMOVE_PLATFORM_FILTER,
  TOGGLE_TAG_FILTER,
  TOGGLE_PLATFORM_FILTER,
  LOAD_BOUNTIES,
  LOAD_BOUNTIES_SUCCESS,
  LOAD_BOUNTIES_FAIL,
  LOAD_MORE_BOUNTIES,
  LOAD_MORE_BOUNTIES_SUCCESS,
  LOAD_MORE_BOUNTIES_FAIL
};

export default BountiesReducer;
