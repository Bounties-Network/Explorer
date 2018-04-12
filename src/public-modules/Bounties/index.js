import { PAGE_SIZE } from './constants';

const initialState = {
  loading: true,
  loaded: false,
  error: false,
  offset: 0,
  count: 0,
  bounties: []
};

const LOAD_BOUNTIES = 'bounties/LOAD_BOUNTIES';
const LOAD_BOUNTIES_SUCCESS = 'bounties/LOAD_BOUNTIES_SUCCESS';
const LOAD_BOUNTIES_FAIL = 'bounties/LOAD_BOUNTIES_FAIL';

const LOAD_MORE = 'bounties/LOAD_MORE';

function loadMore() {
  return { type: LOAD_MORE };
}

function load() {
  return { type: LOAD_BOUNTIES };
}

function loadSuccess(bounties) {
  return { type: LOAD_BOUNTIES_SUCCESS, bounties };
}

function loadFail(error) {
  return { type: LOAD_BOUNTIES_FAIL, error };
}

function BountiesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_BOUNTIES: {
      return {
        ...state,
        loading: true,
        loaded: false,
        count: 0,
        error: false
      };
    }
    case LOAD_BOUNTIES_SUCCESS: {
      const { bounties, count } = action;

      return {
        ...state,
        loading: true,
        loaded: true,
        error: false,
        count,
        bounties
      };
    }
    case LOAD_BOUNTIES_FAIL: {
      const { error } = action;

      return {
        ...state,
        loading: false,
        loaded: true,
        error
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
  load,
  loadSuccess,
  loadFail,
  loadMore
};

export const actionTypes = {
  LOAD_BOUNTIES,
  LOAD_BOUNTIES_SUCCESS,
  LOAD_BOUNTIES_FAIL
};

export default BountiesReducer;
