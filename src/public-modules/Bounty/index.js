const defaultCreateDraftState = {
  creating: false,
  error: false
};

const defaultCreateBountyState = {
  creating: false,
  error: false
};

const initialState = {
  createDraftState: { ...defaultCreateDraftState },
  createBountyState: { ...defaultCreateBountyState }
};

const CREATE_DRAFT = 'bounty/CREATE_DRAFT';
const CREATE_DRAFT_SUCCESS = 'bounty/CREATE_DRAFT_SUCCESS';
const CREATE_DRAFT_FAIL = 'bounty/CREATE_DRAFT_FAIL';

function createDraft(values) {
  return { type: CREATE_DRAFT, values };
}

function createDraftSuccess() {
  return { type: CREATE_DRAFT_SUCCESS };
}

function createDraftFail(error) {
  return { type: CREATE_DRAFT_FAIL, error };
}

const CREATE_BOUNTY = 'bounty/CREATE_BOUNTY';
const CREATE_BOUNTY_SUCCESS = 'bounty/CREATE_BOUNTY_SUCCESS';
const CREATE_BOUNTY_FAIL = 'bounty/CREATE_BOUNTY_FAIL';

function createBounty(values, balance) {
  return { type: CREATE_BOUNTY, values, balance };
}

function createBountySuccess() {
  return { type: CREATE_BOUNTY_SUCCESS };
}

function createBountyFail(error) {
  return { type: CREATE_BOUNTY_FAIL, error };
}

function BountyReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_BOUNTY: {
      return {
        ...state,
        createBountyState: {
          ...state.createBountyState,
          creating: true,
          error: false
        }
      };
    }
    case CREATE_BOUNTY_SUCCESS: {
      return {
        ...state,
        createBountyState: {
          ...state.createBountyState,
          creating: false
        }
      };
    }
    case CREATE_BOUNTY_FAIL: {
      return {
        ...state,
        createBountyState: {
          ...state.createBountyState,
          creating: false,
          error: true
        }
      };
    }
    case CREATE_DRAFT: {
      return {
        ...state,
        createDraftState: {
          ...state.createDraftState,
          creating: true,
          error: false
        }
      };
    }
    case CREATE_DRAFT_SUCCESS: {
      return {
        ...state,
        createDraftState: {
          ...state.createDraftState,
          creating: false,
          error: false
        }
      };
    }
    case CREATE_DRAFT_FAIL: {
      return {
        ...state,
        createDraftState: {
          ...state.createDraftState,
          creating: false,
          error: true
        }
      };
    }
    default:
      return state;
  }
}

export const actions = {
  createBounty,
  createBountySuccess,
  createBountyFail,
  createDraft,
  createDraftSuccess,
  createDraftFail
};

export const actionTypes = {
  CREATE_BOUNTY,
  CREATE_BOUNTY_SUCCESS,
  CREATE_BOUNTY_FAIL,
  CREATE_DRAFT,
  CREATE_DRAFT_SUCCESS,
  CREATE_DRAFT_FAIL
};

export default BountyReducer;
