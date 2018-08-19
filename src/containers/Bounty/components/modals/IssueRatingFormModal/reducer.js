const initialState = {
  loading: false,
  error: false,

  reviewee: {
    name: null,
    address: null,
    img: null
  }
};

const LOAD_REVIEWEE = 'ratingFormModal/LOAD_REVIEWEE';
const LOAD_REVIEWEE_SUCCESS = 'ratingFormModal/LOAD_REVIEWEE_SUCCESS';
const LOAD_REVIEWEE_FAIL = 'ratingFormModal/LOAD_REVIEWEE_FAIL';

function loadReviewee(identifiers) {
  return { type: LOAD_REVIEWEE, identifiers };
}

function loadRevieweeSuccess(reviewee) {
  return { type: LOAD_REVIEWEE_SUCCESS, reviewee };
}

function loadRevieweeFail() {
  return { type: LOAD_REVIEWEE_FAIL };
}

function RatingFormModalReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REVIEWEE: {
      return {
        ...state,
        loading: true
      };
    }
    case LOAD_REVIEWEE_SUCCESS: {
      const { reviewee } = action;
      const { name, address, img } = reviewee;

      return {
        ...state,
        loading: false,
        reviewee: {
          name,
          address,
          img
        }
      };
    }
    case LOAD_REVIEWEE_FAIL: {
      return {
        ...state,
        loading: false,
        error: true
      };
    }
    default: {
      return state;
    }
  }
}

export const actions = {
  loadReviewee,
  loadRevieweeSuccess,
  loadRevieweeFail
};

export const actionTypes = {
  LOAD_REVIEWEE,
  LOAD_REVIEWEE_SUCCESS,
  LOAD_REVIEWEE_FAIL
};

export default RatingFormModalReducer;
