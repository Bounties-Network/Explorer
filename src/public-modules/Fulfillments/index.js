import { omit } from 'lodash';

const defaultFilters = {
  issuer: '',
  fulfiller: ''
};

const initialState = {
  loading: true,
  loaded: false,
  loadingMore: false,
  loadingMoreError: false,
  error: false,
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

function loadFulfillments(key) {
  return { type: LOAD_FULFILLMENTS, key };
}

function loadFulfillmentsSuccess(key, fulfillments, count) {
  return { type: LOAD_FULFILLMENTS_SUCCESS, key, fulfillments, count };
}

function loadFulfillmentsFail(key, error) {
  return { type: LOAD_FULFILLMENTS_FAIL, key, error };
}

function loadMoreFulfillments(key) {
  return { type: LOAD_MORE_FULFILLMENTS, key };
}

function loadMoreFulfillmentsSuccess(key, fulfillments) {
  return { type: LOAD_MORE_FULFILLMENTS_SUCCESS, key, fulfillments };
}

function loadMoreFulfillmentsFail(key, error) {
  return { type: LOAD_MORE_FULFILLMENTS_FAIL, key, error };
}

const ADD_ISSUER_FILTER = 'fulfillments/ADD_ISSUER_FILTER';
const ADD_FULFILLER_FILTER = 'fulfillments/ADD_FULFILLER_FILTER';

function addIssuerFilter(key, address) {
  return { type: ADD_ISSUER_FILTER, key, address };
}

function addFulfillerFilter(key, address) {
  return { type: ADD_FULFILLER_FILTER, key, address };
}

function FulfillmentsReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_FULFILLMENTS: {
      const { key } = action;

      return { ...state, [key]: { ...state[key], ...initialState } };
    }
    case LOAD_FULFILLMENTS_SUCCESS: {
      const { key, fulfillments, count } = action;

      return {
        ...state,
        [key]: {
          ...state[key],
          loading: false,
          loaded: true,
          fulfillments,
          count
        }
      };
    }
    case LOAD_FULFILLMENTS_FAIL: {
      const { key } = action;

      return {
        ...state,
        [key]: {
          ...state[key],
          uploading: false,
          error: true
        }
      };
    }
    case ADD_ISSUER_FILTER: {
      const { key, address } = action;

      return {
        ...state,
        [key]: {
          ...state[key],
          filters: {
            issuer: address,
            fulfiller: ''
          }
        }
      };
    }
    case ADD_FULFILLER_FILTER: {
      const { key, address } = action;

      return {
        ...state,
        [key]: {
          ...state[key],
          filters: {
            issuer: '',
            fulfiller: address
          }
        }
      };
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
  addFulfillerFilter
};

export const actionTypes = {
  LOAD_FULFILLMENTS,
  LOAD_FULFILLMENTS_SUCCESS,
  LOAD_FULFILLMENTS_FAIL,
  LOAD_MORE_FULFILLMENTS,
  LOAD_MORE_FULFILLMENTS_SUCCESS,
  LOAD_MORE_FULFILLMENTS_FAIL,
  ADD_ISSUER_FILTER,
  ADD_FULFILLER_FILTER
};

export default FulfillmentsReducer;
