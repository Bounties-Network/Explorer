const initialState = {
  loading: true,
  loaded: false,
  error: false,
  fulfillment: {}
};

const LOAD_FULFILLMENT = 'fulfillment/LOAD_FULFILLMENT';
const LOAD_FULFILLMENT_SUCCESS = 'fulfillment/LOAD_FULFILLMENT_SUCCESS';
const LOAD_FULFILLMENT_FAIL = 'fulfillment/LOAD_FULFILLMENT_FAIL';

function loadFulfillment(bountyId, fulfillmentId) {
  return { type: LOAD_FULFILLMENT, bountyId, fulfillmentId };
}

function loadFulfillmentSuccess(fulfillment) {
  return { type: LOAD_FULFILLMENT_SUCCESS, fulfillment };
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
        error: false
      };
    }
    case LOAD_FULFILLMENT_SUCCESS: {
      const { fulfillment } = action;

      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        fulfillment
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
