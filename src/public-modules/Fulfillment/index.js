const initialState = {
  loading: true,
  loaded: false,
  error: false,
  currentFulfillment: {}
};

const LOAD_FULFILLMENT = 'fulfillment/LOAD_FULFILLMENT';
const LOAD_FULFILLMENT_SUCCESS = 'fulfillment/LOAD_FULFILLMENT_SUCCESS';
const LOAD_FULFILLMENT_FAIL = 'fulfillment/LOAD_FULFILLMENT_FAIL';

function loadFulfillment(id) {
  return { type: LOAD_FULFILLMENT, id };
}

function loadFulfillmentSuccess(fulfillment) {
  return {
    type: LOAD_FULFILLMENT_SUCCESS,
    currentFulfillment: fulfillment
  };
}

function loadFulfillmentFail(error) {
  return { type: LOAD_FULFILLMENT_FAIL, error };
}

function FulfillmentReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_FULFILLMENT: {
      return {
        ...state,
        loading: true,
        loaded: false,
        count: 0,
        error: false
      };
    }
    case LOAD_FULFILLMENT_SUCCESS: {
      const { currentFulfillment } = action;

      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        currentFulfillment
      };
    }
    case LOAD_FULFILLMENT_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: true
      };
    }
    default:
      return state;
  }
}

export const actions = {
  loadFulfillment,
  loadFulfillmentSuccess,
  loadFulfillmentFail
};

export const actionTypes = {
  LOAD_FULFILLMENT,
  LOAD_FULFILLMENT_SUCCESS,
  LOAD_FULFILLMENT_FAIL
};

export default FulfillmentReducer;
