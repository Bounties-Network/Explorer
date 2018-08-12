const initialState = {
  posting: false,
  postingError: false,
  review: {}
};

const POST_REVIEW = 'comments/POST_REVIEW';
const POST_REVIEW_SUCCESS = 'comments/POST_COMMENT_SUCCESS';
const POST_REVIEW_FAIL = 'comments/POST_COMMENT_FAIL';

function postReview(bountyId, fulfillmentId, rating, review) {
  return {
    type: POST_REVIEW,
    bountyId,
    fulfillmentId,
    rating,
    review
  };
}

function postReviewSuccess(review) {
  return { type: POST_REVIEW_SUCCESS, review };
}

function postReviewFail(error) {
  return { type: POST_REVIEW_FAIL, error };
}

function ReviewReducer(state = initialState, action) {
  switch (action.type) {
    case POST_REVIEW: {
      return {
        ...state,
        posting: true,
        postingError: false
      };
    }
    case POST_REVIEW_SUCCESS: {
      const { review } = action;
      return {
        ...state,
        posting: false,
        review
      };
    }
    case POST_REVIEW_FAIL: {
      return {
        ...state,
        posting: false,
        postingError: true
      };
    }
    default:
      return state;
  }
}

export const actions = {
  postReview,
  postReviewSuccess,
  postReviewFail
};

export const actionTypes = {
  POST_REVIEW,
  POST_REVIEW_SUCCESS,
  POST_REVIEW_FAIL
};

export default ReviewReducer;
