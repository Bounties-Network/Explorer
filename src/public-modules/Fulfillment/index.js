const initialState = {
  loading: true,
  loaded: false,
  error: false,
  currentFulfillment: {},
  createFulfillment: {
    pending: false,
    error: false
  },
  acceptFulfillment: {
    pending: false,
    error: false
  }
};

const LOAD_FULFILLMENT = 'fulfillment/LOAD_FULFILLMENT';
const LOAD_FULFILLMENT_SUCCESS = 'fulfillment/LOAD_FULFILLMENT_SUCCESS';
const LOAD_FULFILLMENT_FAIL = 'fulfillment/LOAD_FULFILLMENT_FAIL';

function loadFulfillment(id) {
  return { type: LOAD_FULFILLMENT, id };
}

function loadFulfillmentSuccess(fulfillment) {
  return { type: LOAD_FULFILLMENT_SUCCESS, currentFulfillment: fulfillment };
}

function loadFulfillmentFail(error) {
  return { type: LOAD_FULFILLMENT_FAIL, error };
}

const CREATE_FULFILLMENT = 'fulfillment/CREATE_FULFILLMENT';
const CREATE_FULFILLMENT_SUCCESS = 'fulfillment/CREATE_FULFILLMENT_SUCCESS';
const CREATE_FULFILLMENT_FAIL = 'fulfillment/CREATE_FULFILLMENT_FAIL';

function createFulfillment(bountyId, data) {
  return { type: CREATE_FULFILLMENT, bountyId, data };
}

function createFulfillmentSuccess() {
  return { type: CREATE_FULFILLMENT_SUCCESS };
}

function createFulfillmentFail() {
  return { type: CREATE_FULFILLMENT_FAIL };
}

const ACCEPT_FULFILLMENT = 'fulfillment/ACCEPT_FULFILLMENT';
const ACCEPT_FULFILLMENT_SUCCESS = 'fulfillment/ACCEPT_FULFILLMENT_SUCCESS';
const ACCEPT_FULFILLMENT_FAIL = 'fulfillment/ACCEPT_FULFILLMENT_FAIL';

function acceptFulfillment(bountyId, fulfillmentId) {
  return { type: ACCEPT_FULFILLMENT, bountyId, fulfillmentId };
}

function acceptFulfillmentSuccess() {
  return { type: ACCEPT_FULFILLMENT_SUCCESS };
}

function acceptFulfillmentFail() {
  return { type: ACCEPT_FULFILLMENT_FAIL };
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
    case CREATE_FULFILLMENT: {
      return {
        ...state,
        createFulfillment: {
          ...state.createFulfillment,
          pending: true,
          error: false
        }
      };
    }
    case CREATE_FULFILLMENT_SUCCESS: {
      return {
        ...state,
        createFulfillment: {
          ...state.createFulfillment,
          pending: false
        }
      };
    }
    case CREATE_FULFILLMENT_FAIL: {
      return {
        ...state,
        createFulfillment: {
          ...state.createFulfillment,
          pending: false,
          error: true
        }
      };
    }
    case ACCEPT_FULFILLMENT: {
      return {
        ...state,
        acceptFulfillment: {
          ...state.acceptFulfillment,
          pending: true,
          error: false
        }
      };
    }
    case ACCEPT_FULFILLMENT_SUCCESS: {
      return {
        ...state,
        acceptFulfillment: {
          ...state.acceptFulfillment,
          pending: false
        }
      };
    }
    case ACCEPT_FULFILLMENT_FAIL: {
      return {
        ...state,
        acceptFulfillment: {
          ...state.acceptFulfillment,
          pending: false,
          error: true
        }
      };
    }
    default:
      return state;
  }
}

export const actions = {
  loadFulfillment,
  loadFulfillmentSuccess,
  loadFulfillmentFail,
  createFulfillment,
  createFulfillmentSuccess,
  createFulfillmentFail,
  acceptFulfillment,
  acceptFulfillmentSuccess,
  acceptFulfillmentFail
};

export const actionTypes = {
  LOAD_FULFILLMENT,
  LOAD_FULFILLMENT_SUCCESS,
  LOAD_FULFILLMENT_FAIL,
  CREATE_FULFILLMENT,
  CREATE_FULFILLMENT_SUCCESS,
  CREATE_FULFILLMENT_FAIL,
  ACCEPT_FULFILLMENT,
  ACCEPT_FULFILLMENT_SUCCESS,
  ACCEPT_FULFILLMENT_FAIL
};

export default FulfillmentReducer;
