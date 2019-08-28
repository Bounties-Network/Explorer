const initialState = {
  loading: true,
  loaded: false,
  error: false,
  fulfillment: {},
  acceptFulfillment: {
    loading: false,
    error: false
  },
  createFulfillment: {
    loading: false,
    error: false
  },
  updateFulfillment: {
    loading: false,
    error: false
  }
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

const CREATE_FULFILLMENT = 'fulfillment/CREATE_FULFILLMENT';
const CREATE_FULFILLMENT_SUCCESS = 'fulfillment/CREATE_FULFILLMENT_SUCCESS';
const CREATE_FULFILLMENT_FAIL = 'fulfillment/CREATE_FULFILLMENT_FAIL';

function createFulfillment(bountyId, contract_version, bountyPlatform, data) {
  return {
    type: CREATE_FULFILLMENT,
    bountyId,
    contract_version,
    bountyPlatform,
    data
  };
}

function createFulfillmentSuccess() {
  return { type: CREATE_FULFILLMENT_SUCCESS };
}

function createFulfillmentFail() {
  return { type: CREATE_FULFILLMENT_FAIL };
}

const UPDATE_FULFILLMENT = 'fulfillment/UPDATE_FULFILLMENT';
const UPDATE_FULFILLMENT_SUCCESS = 'fulfillment/UPDATE_FULFILLMENT_SUCCESS';
const UPDATE_FULFILLMENT_FAIL = 'fulfillment/UPDATE_FULFILLMENT_FAIL';

function updateFulfillment(bountyId, contract_version, bountyPlatform, data) {
  return {
    type: UPDATE_FULFILLMENT,
    bountyId,
    contract_version,
    bountyPlatform,
    data
  };
}

function updateFulfillmentSuccess() {
  return { type: UPDATE_FULFILLMENT_SUCCESS };
}

function updateFulfillmentFail() {
  return { type: UPDATE_FULFILLMENT_FAIL };
}

const ACCEPT_FULFILLMENT = 'fulfillment/ACCEPT_FULFILLMENT';
const ACCEPT_FULFILLMENT_SUCCESS = 'fulfillment/ACCEPT_FULFILLMENT_SUCCESS';
const ACCEPT_FULFILLMENT_FAIL = 'fulfillment/ACCEPT_FULFILLMENT_FAIL';

function acceptFulfillment(
  bountyId,
  contract_version,
  fulfillmentId,
  approverId,
  tokenAmounts
) {
  return {
    type: ACCEPT_FULFILLMENT,
    bountyId,
    contract_version,
    fulfillmentId,
    approverId,
    tokenAmounts
  };
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
    case CREATE_FULFILLMENT: {
      return {
        ...state,
        createFulfillment: {
          loading: true,
          error: false
        }
      };
    }
    case CREATE_FULFILLMENT_SUCCESS: {
      return {
        ...state,
        createFulfillment: {
          loading: false,
          error: false
        }
      };
    }
    case CREATE_FULFILLMENT_FAIL: {
      return {
        ...state,
        createFulfillment: {
          loading: false,
          error: true
        }
      };
    }
    case UPDATE_FULFILLMENT: {
      return {
        ...state,
        updateFulfillment: {
          loading: true,
          error: false
        }
      };
    }
    case UPDATE_FULFILLMENT_SUCCESS: {
      return {
        ...state,
        updateFulfillment: {
          loading: false,
          error: false
        }
      };
    }
    case UPDATE_FULFILLMENT_FAIL: {
      return {
        ...state,
        updateFulfillment: {
          loading: false,
          error: true
        }
      };
    }
    case ACCEPT_FULFILLMENT: {
      return {
        ...state,
        acceptFulfillment: {
          loading: true,
          error: false
        }
      };
    }
    case ACCEPT_FULFILLMENT_SUCCESS: {
      return {
        ...state,
        acceptFulfillment: {
          loading: false,
          error: false
        }
      };
    }
    case ACCEPT_FULFILLMENT_FAIL: {
      return {
        ...state,
        acceptFulfillment: {
          loading: false,
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
  acceptFulfillment,
  acceptFulfillmentSuccess,
  acceptFulfillmentFail,
  createFulfillment,
  createFulfillmentSuccess,
  createFulfillmentFail,
  updateFulfillment,
  updateFulfillmentSuccess,
  updateFulfillmentFail
};

export const actionTypes = {
  LOAD_FULFILLMENT,
  LOAD_FULFILLMENT_SUCCESS,
  LOAD_FULFILLMENT_FAIL,
  ACCEPT_FULFILLMENT,
  ACCEPT_FULFILLMENT_SUCCESS,
  ACCEPT_FULFILLMENT_FAIL,
  CREATE_FULFILLMENT,
  CREATE_FULFILLMENT_SUCCESS,
  CREATE_FULFILLMENT_FAIL,
  UPDATE_FULFILLMENT,
  UPDATE_FULFILLMENT_SUCCESS,
  UPDATE_FULFILLMENT_FAIL
};

export default FulfillmentReducer;
