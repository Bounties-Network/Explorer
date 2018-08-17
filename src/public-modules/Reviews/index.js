const initialState = {
  loading: false,
  loaded: false,
  error: false,
  reviews: [],
  count: 0
};

const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const LOAD_REVIEWS_SUCCESS = 'reviews/LOAD_REVIEWS_SUCCESS';
const LOAD_REVIEWS_FAIL = 'reviews/LOAD_REVIEWS_FAIL';

function loadReviewsGiven(address) {
  return { type: LOAD_REVIEWS, address, role: 'reviewer' };
}

function loadReviewsReceived(address) {
  return { type: LOAD_REVIEWS, address, role: 'reviewee' };
}

function loadReviewsSuccess(reviews, count) {
  return { type: LOAD_REVIEWS_SUCCESS, reviews, count };
}

function loadReviewsFail(error) {
  return { type: LOAD_REVIEWS_FAIL, error };
}

function LoadReviewsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REVIEWS: {
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false
      };
    }
    case LOAD_REVIEWS_SUCCESS: {
      const { reviews, count } = action;

      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        reviews,
        count
      };
    }
    case LOAD_REVIEWS_FAIL: {
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
  loadReviewsGiven,
  loadReviewsReceived,
  loadReviewsSuccess,
  loadReviewsFail
};

export const actionTypes = {
  LOAD_REVIEWS,
  LOAD_REVIEWS_SUCCESS,
  LOAD_REVIEWS_FAIL
};

export default LoadReviewsReducer;
