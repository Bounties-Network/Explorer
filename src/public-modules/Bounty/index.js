const defaultGetBountyState = {
  loading: false,
  error: false
};

const defaultCreateDraftState = {
  creating: false,
  error: false
};

const defaultStdBountyState = {
  pending: false,
  error: false
};

const defaultGetDraftState = {
  loading: false,
  error: false
};

const initialState = {
  getBountyState: { ...defaultGetBountyState },
  createDraftState: { ...defaultCreateDraftState },
  getDraftState: { ...defaultGetDraftState },
  stdBountyState: { ...defaultStdBountyState }
};

const GET_BOUNTY = 'bounty/GET_BOUNTY';
const GET_BOUNTY_SUCCESS = 'bounty/GET_BOUNTY_SUCCESS';
const GET_BOUNTY_FAIL = 'bounty/GET_BOUNTY_FAIL';

function getBounty(id) {
  return { type: GET_BOUNTY, id };
}

function getBountySuccess(bounty) {
  return { type: GET_BOUNTY_SUCCESS, bounty };
}

function getBountyFail(error) {
  return { type: GET_BOUNTY_FAIL, error };
}

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

function createDraftSuccess(bounty) {
  return { type: CREATE_DRAFT_SUCCESS, bounty };
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
const KILL_BOUNTY = 'bounty/KILL_BOUNTY';
const EXTEND_DEADLINE = 'bounty/EXTEND_DEADLINE';
const TRANSFER_OWNERSHIP = 'bounty/TRANSFER_OWNERSHIP';
const INCREASE_PAYOUT = 'bounty/INCREASE_PAYOUT';
const ACTIVATE_BOUNTY = 'bounty/ACTIVATE_BOUNTY';
const CONTRIBUTE = 'bounty/CONTRIBUTE';
const STD_BOUNTY_SUCCESS = 'bounty/STD_BOUNTY_SUCCESS';
const STD_BOUNTY_FAIL = 'bounty/STD_BOUNTY_FAIL';

function createBounty(values, balance) {
  return { type: CREATE_BOUNTY, values, balance };
}

function transferOwnership(id, contract_version, address) {
  return { type: TRANSFER_OWNERSHIP, id, contract_version, address };
}

function killBounty(id, contract_version, currentBalance) {
  return { type: KILL_BOUNTY, id, contract_version, currentBalance };
}

function extendDeadline(id, contract_version, deadline) {
  return { type: EXTEND_DEADLINE, id, contract_version, deadline };
}

function contribute(
  id,
  value,
  paysTokens,
  decimals,
  tokenContract,
  user_address,
  contract_version
) {
  return {
    type: CONTRIBUTE,
    id,
    value,
    paysTokens,
    decimals,
    tokenContract,
    user_address,
    contract_version
  };
}

function increasePayout(
  id,
  contract_version,
  fulfillment_amount,
  balance,
  paysTokens,
  decimals,
  tokenContract
) {
  return {
    type: INCREASE_PAYOUT,
    id,
    contract_version,
    fulfillment_amount,
    balance,
    paysTokens,
    decimals,
    tokenContract
  };
}

function activateBounty(id, balance, paysTokens, decimals, tokenContract) {
  return {
    type: ACTIVATE_BOUNTY,
    id,
    balance,
    paysTokens,
    decimals,
    tokenContract
  };
}

function stdBountySuccess() {
  return { type: STD_BOUNTY_SUCCESS };
}

function stdBountyFail() {
  return { type: STD_BOUNTY_FAIL };
}

function BountyReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOUNTY: {
      return {
        ...state,
        getBountyState: {
          ...defaultGetBountyState,
          loading: true,
          error: false
        }
      };
    }
    case GET_BOUNTY_SUCCESS: {
      const { bounty } = action;

      return {
        ...state,
        bounty,
        getBountyState: {
          ...defaultGetBountyState,
          loading: false,
          error: false
        }
      };
    }
    case GET_BOUNTY_FAIL: {
      return {
        ...state,
        getBountyState: {
          ...defaultGetBountyState,
          loading: false,
          error: true
        }
      };
    }
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
    case KILL_BOUNTY:
    case TRANSFER_OWNERSHIP:
    case INCREASE_PAYOUT:
    case EXTEND_DEADLINE:
    case ACTIVATE_BOUNTY:
    case CONTRIBUTE:
    case CREATE_BOUNTY: {
      return {
        ...state,
        stdBountyState: {
          ...state.stdBountyState,
          pending: true,
          error: false
        }
      };
    }
    case STD_BOUNTY_SUCCESS: {
      return {
        ...state,
        stdBountyState: {
          ...state.stdBountyState,
          pending: false
        }
      };
    }
    case STD_BOUNTY_FAIL: {
      return {
        ...state,
        stdBountyState: {
          ...state.stdBountyState,
          pending: false,
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
  getBounty,
  getBountySuccess,
  getBountyFail,
  getDraft,
  getDraftSuccess,
  getDraftFail,
  createBounty,
  increasePayout,
  activateBounty,
  killBounty,
  transferOwnership,
  extendDeadline,
  contribute,
  stdBountySuccess,
  stdBountyFail,
  updateDraft,
  createDraft,
  createDraftSuccess,
  createDraftFail
};

export const actionTypes = {
  GET_BOUNTY,
  GET_BOUNTY_SUCCESS,
  GET_BOUNTY_FAIL,
  GET_DRAFT,
  GET_DRAFT_SUCCESS,
  GET_DRAFT_FAIL,
  UPDATE_DRAFT,
  CREATE_BOUNTY,
  INCREASE_PAYOUT,
  EXTEND_DEADLINE,
  ACTIVATE_BOUNTY,
  KILL_BOUNTY,
  CONTRIBUTE,
  TRANSFER_OWNERSHIP,
  CREATE_DRAFT,
  CREATE_DRAFT_SUCCESS,
  CREATE_DRAFT_FAIL,
  STD_BOUNTY_SUCCESS,
  STD_BOUNTY_FAIL
};

export default BountyReducer;
