const initialState = {
  loading: true,
  loaded: false,
  loadingMore: false,
  loadingMoreError: false,
  error: false,
  count: 0,
  applicants: []
};

const LOAD_APPLICANTS = 'applicants/LOAD_APPLICANTS';
const LOAD_APPLICANTS_SUCCESS = 'applicants/LOAD_APPLICANTS_SUCCESS';
const LOAD_APPLICANTS_FAIL = 'applicants/LOAD_APPLICANTS_FAIL';

const LOAD_MORE_APPLICANTS = 'applicants/LOAD_MORE_APPLICANTS';
const LOAD_MORE_APPLICANTS_SUCCESS = 'applicants/LOAD_MORE_APPLICANTS_SUCCESS';
const LOAD_MORE_APPLICANTS_FAIL = 'applicants/LOAD_MORE_APPLICANTS_FAIL';

function loadApplicants(bountyId) {
  return { type: LOAD_APPLICANTS, bountyId };
}

function loadApplicantsSuccess(applicants, count) {
  return { type: LOAD_APPLICANTS_SUCCESS, applicants, count };
}

function loadApplicantsFail(error) {
  return { type: LOAD_APPLICANTS_FAIL, error };
}

function loadMoreApplicants() {
  return { type: LOAD_MORE_APPLICANTS };
}

function loadMoreApplicantsSuccess(applicants) {
  return { type: LOAD_MORE_APPLICANTS_SUCCESS, applicants };
}

function loadMoreApplicantsFail(error) {
  return { type: LOAD_MORE_APPLICANTS_FAIL, error };
}

const RESET_STATE = 'applicants/RESET_STATE';

function resetState() {
  return { type: RESET_STATE };
}

function ApplicantsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_APPLICANTS: {
      const { bountyId } = action;

      return {
        ...state,
        loading: true,
        loaded: false,
        bountyId,
        error: false
      };
    }
    case LOAD_APPLICANTS_SUCCESS: {
      const { applicants, count } = action;

      return {
        ...state,
        loading: false,
        loaded: true,
        applicants,
        count
      };
    }
    case LOAD_APPLICANTS_FAIL: {
      return {
        ...state,
        loading: false,
        error: true
      };
    }
    case LOAD_MORE_APPLICANTS: {
      return {
        ...state,
        loadingMore: true,
        loadingMoreError: false
      };
    }
    case LOAD_MORE_APPLICANTS_SUCCESS: {
      const { applicants } = action;

      return {
        ...state,
        loadingMore: false,
        applicants: [...state.applicants, ...applicants]
      };
    }
    case LOAD_MORE_APPLICANTS_FAIL: {
      return {
        ...state,
        loadingMore: false,
        loadingMoreError: true
      };
    }
    case RESET_STATE: {
      return initialState;
    }
    default:
      return state;
  }
}

export const actions = {
  loadApplicants,
  loadApplicantsSuccess,
  loadApplicantsFail,
  loadMoreApplicants,
  loadMoreApplicantsSuccess,
  loadMoreApplicantsFail,
  resetState
};

export const actionTypes = {
  LOAD_APPLICANTS,
  LOAD_APPLICANTS_SUCCESS,
  LOAD_APPLICANTS_FAIL,
  LOAD_MORE_APPLICANTS,
  LOAD_MORE_APPLICANTS_SUCCESS,
  LOAD_MORE_APPLICANTS_FAIL,
  RESET_STATE
};

export default ApplicantsReducer;
