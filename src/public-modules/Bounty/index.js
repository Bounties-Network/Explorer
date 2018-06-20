const initialState = {
  loading: true,
  loaded: false,
  error: false,
  currentBounty: {}
};

const EXTEND_DEADLINE = 'bounty/EXTEND_DEADLINE';
const EXTEND_DEADLINE_SUCCESS = 'bounty/EXTEND_DEADLINE_SUCCESS';
const EXTEND_DEADLINE_FAIL = 'bounty/EXTEND_DEADLINE_FAIL';

function extendDeadline(id, deadline) {
  return { type: EXTEND_DEADLINE, id, deadline };
}

function extendDeadlineSuccess() {
  return { type: EXTEND_DEADLINE_SUCCESS };
}

function extendDeadlineFail() {
  return { type: EXTEND_DEADLINE_FAIL };
}

const LOAD_BOUNTY = 'bounty/LOAD_BOUNTY';
const LOAD_BOUNTY_SUCCESS = 'bounty/LOAD_BOUNTY_SUCCESS';
const LOAD_BOUNTY_FAIL = 'bounty/LOAD_BOUNTY_FAIL';

function loadBounty(id) {
  return { type: LOAD_BOUNTY, id };
}

function loadBountySuccess(bounty) {
  return {
    type: LOAD_BOUNTY_SUCCESS,
    currentBounty: bounty
  };
}

function loadBountyFail(error) {
  return { type: LOAD_BOUNTY_FAIL, error };
}

function BountyReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_BOUNTY: {
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false
      };
    }
    case LOAD_BOUNTY_SUCCESS: {
      const { currentBounty } = action;

      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        currentBounty
      };
    }
    case LOAD_BOUNTY_FAIL: {
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
  loadBounty,
  loadBountySuccess,
  loadBountyFail
};

export const actionTypes = {
  LOAD_BOUNTY,
  LOAD_BOUNTY_SUCCESS,
  LOAD_BOUNTY_FAIL
};

export default BountyReducer;
