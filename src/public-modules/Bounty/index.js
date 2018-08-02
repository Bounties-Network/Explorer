const defaultCreateDraftState = {
  creating: false,
  error: false
};

const defaultCreateBountyState = {
  creating: false,
  error: false
};

const defaultGetDraftState = {
  loading: false,
  error: false
};

const initialState = {
  createDraftState: { ...defaultCreateDraftState },
  getDraftState: { ...defaultGetDraftState },
  createBountyState: { ...defaultCreateBountyState }
};

const UPDATE_DRAFT = 'bounty/UPDATE_DRAFT';
const CREATE_DRAFT = 'bounty/CREATE_DRAFT';
const CREATE_DRAFT_SUCCESS = 'bounty/CREATE_DRAFT_SUCCESS';
const CREATE_DRAFT_FAIL = 'bounty/CREATE_DRAFT_FAIL';

function updateDraft(bountyId, values) {
  return { type: UPDATE_DRAFT, values, bountyId };
}

function createDraft(values) {
  return { type: CREATE_DRAFT, values };
}

function createDraftSuccess() {
  return { type: CREATE_DRAFT_SUCCESS };
}

function createDraftFail(error) {
  return { type: CREATE_DRAFT_FAIL, error };
}

const GET_DRAFT = 'bounty/GET_DRAFT';
const GET_DRAFT_SUCCESS = 'bounty/GET_DRAFT_SUCCESS';
const GET_DRAFT_FAIL = 'bounty/GET_DRAFT_FAIL';

function getDraft(id, issuer) {
  return { type: GET_DRAFT, id, issuer };
}

function getDraftSuccess(bounty) {
  return { type: GET_DRAFT_SUCCESS, bounty };
}

function getDraftFail(error) {
  return { type: GET_DRAFT_FAIL, error };
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
    case GET_DRAFT: {
      return {
        ...state,
        getDraftState: {
          ...state.getDraftState,
          loading: true,
          error: false
        }
      };
    }
    case GET_DRAFT_SUCCESS: {
      const { bounty } = action;

      return {
        ...state,
        draftBounty: bounty,
        getDraftState: {
          ...state.getDraftState,
          loading: false
        }
      };
    }
    case GET_DRAFT_FAIL: {
      return {
        ...state,
        getDraftState: {
          ...state.getDraftState,
          loading: false,
          error: true
        }
      };
    }
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
    case UPDATE_DRAFT: {
      return {
        ...state,
        createDraftState: {
          ...state.createDraftState,
          creating: true,
          error: false
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
  getDraft,
  getDraftSuccess,
  getDraftFail,
  createBounty,
  updateDraft,
  createBountySuccess,
  createBountyFail,
  createDraft,
  createDraftSuccess,
  createDraftFail
};

export const actionTypes = {
  GET_DRAFT,
  GET_DRAFT_SUCCESS,
  GET_DRAFT_FAIL,
  UPDATE_DRAFT,
  CREATE_BOUNTY,
  CREATE_BOUNTY_SUCCESS,
  CREATE_BOUNTY_FAIL,
  CREATE_DRAFT,
  CREATE_DRAFT_SUCCESS,
  CREATE_DRAFT_FAIL
};

export default BountyReducer;
