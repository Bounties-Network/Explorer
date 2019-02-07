const initialState = {
  loading: false,
  error: false
};

const CREATE_FULFILLER_APPLICATION = 'bounty/CREATE_FULFILLER_APPLICATION';
const CREATE_FULFILLER_APPLICATION_SUCCESS =
  'bounty/CREATE_FULFILLER_APPLICATION_SUCCESS';
const CREATE_FULFILLER_APPLICATION_FAIL =
  'bounty/CREATE_FULFILLER_APPLICATION_FAIL';

function createFulfillerApplication(bountyId, message, callback) {
  return { type: CREATE_FULFILLER_APPLICATION, bountyId, message, callback };
}

function createFulfillerApplicationSuccess(response) {
  return { type: CREATE_FULFILLER_APPLICATION_SUCCESS, response };
}

function createFulfillerApplicationFail(error) {
  return { type: CREATE_FULFILLER_APPLICATION_FAIL, error };
}

function FulfillerApplicationReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_FULFILLER_APPLICATION: {
      return {
        ...state,
        createFulfillerApplicationState: {
          ...state.createFulfillerApplicationState,
          loading: true,
          error: false
        }
      };
    }
    case CREATE_FULFILLER_APPLICATION_SUCCESS: {
      return {
        ...state,
        createFulfillerApplicationState: {
          ...state.createFulfillerApplicationState,
          loading: false
        }
      };
    }
    case CREATE_FULFILLER_APPLICATION_FAIL: {
      return {
        ...state,
        createFulfillerApplicationState: {
          ...state.createFulfillerApplicationState,
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
  createFulfillerApplication,
  createFulfillerApplicationSuccess,
  createFulfillerApplicationFail
};

export const actionTypes = {
  CREATE_FULFILLER_APPLICATION,
  CREATE_FULFILLER_APPLICATION_SUCCESS,
  CREATE_FULFILLER_APPLICATION_FAIL
};

export default FulfillerApplicationReducer;
