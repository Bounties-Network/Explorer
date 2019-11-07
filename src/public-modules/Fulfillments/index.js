const defaultFilters = {
  issuer: '',
  fulfiller: '',
  bounty_id: ''
};

const initialState = {
  loading: true,
  loaded: false,
  loadingMore: false,
  loadingMoreError: false,
  error: false,
  filters: defaultFilters,
  count: 0,
  fulfillments: []
};

const LOAD_FULFILLMENTS = 'fulfillments/LOAD_FULFILLMENTS';
const LOAD_FULFILLMENTS_SUCCESS = 'fulfillments/LOAD_FULFILLMENTS_SUCCESS';
const LOAD_FULFILLMENTS_FAIL = 'fulfillments/LOAD_FULFILLMENTS_FAIL';

const LOAD_MORE_FULFILLMENTS = 'fulfillments/LOAD_MORE_FULFILLMENTS';
const LOAD_MORE_FULFILLMENTS_SUCCESS =
  'fulfillments/LOAD_MORE_FULFILLMENTS_SUCCESS';
const LOAD_MORE_FULFILLMENTS_FAIL = 'fulfillments/LOAD_MORE_FULFILLMENTS_FAIL';

const POST_FUL_COMMENT_SUCCESS = 'comments/POST_FUL_COMMENT_SUCCESS';

function loadFulfillments() {
  return { type: LOAD_FULFILLMENTS };
}

function loadFulfillmentsSuccess(fulfillments, count) {
  return { type: LOAD_FULFILLMENTS_SUCCESS, fulfillments, count };
}

function loadFulfillmentsFail(error) {
  return { type: LOAD_FULFILLMENTS_FAIL, error };
}

function loadMoreFulfillments() {
  return { type: LOAD_MORE_FULFILLMENTS };
}

function loadMoreFulfillmentsSuccess(fulfillments) {
  return { type: LOAD_MORE_FULFILLMENTS_SUCCESS, fulfillments };
}

function loadMoreFulfillmentsFail(error) {
  return { type: LOAD_MORE_FULFILLMENTS_FAIL, error };
}

const ADD_ISSUER_FILTER = 'fulfillments/ADD_ISSUER_FILTER';
const ADD_FULFILLER_FILTER = 'fulfillments/ADD_FULFILLER_FILTER';
const ADD_BOUNTY_FILTER = 'fulfillments/ADD_BOUNTY_FILTER';
const RESET_FILTERS = 'fulfillments/RESET_FILTERS';
const RESET_STATE = 'fulfillments/RESET_STATE';
const ACCEPTANCE_PENDING = 'fulfillments/ACCEPTANCE_PENDING';

function addIssuerFilter(address) {
  return { type: ADD_ISSUER_FILTER, address };
}

function addFulfillerFilter(address) {
  return { type: ADD_FULFILLER_FILTER, address };
}

function addBountyFilter(id) {
  return { type: ADD_BOUNTY_FILTER, id };
}

function resetFilters() {
  return { type: RESET_FILTERS };
}

function resetState() {
  return { type: RESET_STATE };
}

function fulfillmentAcceptancePending(id) {
  return { type: ACCEPTANCE_PENDING, id };
}

function FulfillmentsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_FULFILLMENTS: {
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false
      };
    }
    case LOAD_FULFILLMENTS_SUCCESS: {
      const { fulfillments, count } = action;

      return {
        ...state,
        loading: false,
        loaded: true,
        fulfillments,
        count
      };
    }
    case LOAD_FULFILLMENTS_FAIL: {
      return {
        ...state,
        loading: false,
        error: true
      };
    }
    case LOAD_MORE_FULFILLMENTS: {
      return {
        ...state,
        loadingMore: true,
        loadingMoreError: false
      };
    }
    case LOAD_MORE_FULFILLMENTS_SUCCESS: {
      const { fulfillments } = action;

      return {
        ...state,
        loadingMore: false,
        fulfillments: [...state.fulfillments, ...fulfillments]
      };
    }
    case LOAD_MORE_FULFILLMENTS_FAIL: {
      return {
        ...state,
        loadingMore: false,
        loadingMoreError: true
      };
    }
    case POST_FUL_COMMENT_SUCCESS: {
      const { id } = action;
      let currentFul = state.fulfillments;
      for (var i = 0; i < currentFul.length; i++) {
        if (currentFul[i].id === id) {
          currentFul[i].comment_count = currentFul[i].comment_count + 1;
        }
      }
      return {
        ...state,
        fulfillments: currentFul
      };
    }
    case ADD_ISSUER_FILTER: {
      const { address } = action;

      return {
        ...state,
        filters: {
          ...state.filters,
          issuer: address,
          fulfiller: ''
        }
      };
    }
    case ADD_FULFILLER_FILTER: {
      const { address } = action;

      return {
        ...state,
        filters: {
          ...state.filters,
          issuer: '',
          fulfiller: address
        }
      };
    }
    case ADD_BOUNTY_FILTER: {
      const { id } = action;

      return {
        ...state,
        filters: {
          ...state.filters,
          bounty_id: id
        }
      };
    }
    case RESET_FILTERS: {
      return {
        ...state,
        filters: {}
      };
    }
    case ACCEPTANCE_PENDING: {
      const { id } = action;
      let new_fulfillments = state.fulfillments;
      for (var i = 0; i < new_fulfillments.length; i++) {
        if (new_fulfillments[i].fulfillment_id === id) {
          new_fulfillments[i].pending = true;
        }
      }
      return {
        ...state,
        filters: {},
        fulfillments: new_fulfillments
      };
    }
    case RESET_STATE: {
      return initialState;
    }
    default:
      return state;
  }
}

export const actions = {
  loadFulfillments,
  loadFulfillmentsSuccess,
  loadFulfillmentsFail,
  loadMoreFulfillments,
  loadMoreFulfillmentsSuccess,
  loadMoreFulfillmentsFail,
  addIssuerFilter,
  addFulfillerFilter,
  addBountyFilter,
  resetFilters,
  resetState,
  fulfillmentAcceptancePending
};

export const actionTypes = {
  LOAD_FULFILLMENTS,
  LOAD_FULFILLMENTS_SUCCESS,
  LOAD_FULFILLMENTS_FAIL,
  LOAD_MORE_FULFILLMENTS,
  LOAD_MORE_FULFILLMENTS_SUCCESS,
  LOAD_MORE_FULFILLMENTS_FAIL,
  POST_FUL_COMMENT_SUCCESS,
  ADD_ISSUER_FILTER,
  ADD_FULFILLER_FILTER,
  ADD_BOUNTY_FILTER,
  RESET_FILTERS,
  RESET_STATE,
  ACCEPTANCE_PENDING
};

export default FulfillmentsReducer;
