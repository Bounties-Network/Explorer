const initialState = {
  loading: false,
  loaded: false,
  loadingMore: false,
  loadingMoreError: false,
  error: false,
  reviews: [],
  count: 0,
  address: '',
  role: ''
};

const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const LOAD_REVIEWS_SUCCESS = 'reviews/LOAD_REVIEWS_SUCCESS';
const LOAD_REVIEWS_FAIL = 'reviews/LOAD_REVIEWS_FAIL';

function loadReviewsGiven(data) {
  return { type: LOAD_REVIEWS, data: { ...data, role: 'reviewer' } };
}

function loadReviewsReceived(data) {
  return { type: LOAD_REVIEWS, data: { ...data, role: 'reviewee' } };
}

function loadReviewsSuccess(reviews, count) {
  return { type: LOAD_REVIEWS_SUCCESS, reviews, count };
}

function loadReviewsFail(error) {
  return { type: LOAD_REVIEWS_FAIL, error };
}

const LOAD_MORE_REVIEWS = 'reviews/LOAD_MORE_REVIEWS';
const LOAD_MORE_REVIEWS_SUCCESS = 'reviews/LOAD_MORE_REVIEWS_SUCCESS';
const LOAD_MORE_REVIEWS_FAIL = 'review/LOAD_MORE_REVIEWS_FAIL';

function loadMoreReviews(reviewType) {
  return { type: LOAD_MORE_REVIEWS, reviewType };
}

function loadMoreReviewsSuccess(reviews) {
  return { type: LOAD_MORE_REVIEWS_SUCCESS, reviews };
}

function loadMoreReviewsFail(error) {
  return { type: LOAD_MORE_REVIEWS_FAIL, error };
}

function LoadReviewsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REVIEWS: {
      const { data } = action;
      const { address, role } = data;

      return {
        ...state,
        loading: true,
        loaded: false,
        error: false,
        address,
        role
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
    case LOAD_MORE_REVIEWS: {
      return {
        ...state,
        loadingMore: true,
        loadingMoreError: false
      };
    }
    case LOAD_MORE_REVIEWS_SUCCESS: {
      const { reviews } = action;

      return {
        ...state,
        loadingMore: false,
        reviews: [...state.reviews, ...reviews]
      };
    }
    case LOAD_MORE_REVIEWS_FAIL: {
      return {
        ...state,
        loadingMore: false,
        loadingMoreError: true
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
  loadReviewsFail,
  loadMoreReviews,
  loadMoreReviewsSuccess,
  loadMoreReviewsFail
};

export const actionTypes = {
  LOAD_REVIEWS,
  LOAD_REVIEWS_SUCCESS,
  LOAD_REVIEWS_FAIL,
  LOAD_MORE_REVIEWS,
  LOAD_MORE_REVIEWS_SUCCESS,
  LOAD_MORE_REVIEWS_FAIL
};

export default LoadReviewsReducer;
