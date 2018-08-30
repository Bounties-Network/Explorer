import request from 'utils/request';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import config from 'public-modules/config';
import { actionTypes, actions } from 'public-modules/Reviews';
import { reviewsStateSelector } from 'public-modules/Reviews/selectors';
import { LIMIT } from 'public-modules/Reviews/constants';

const { LOAD_REVIEWS, LOAD_MORE_REVIEWS } = actionTypes;
const {
  loadReviewsFail,
  loadReviewsSuccess,
  loadMoreReviewsFail,
  loadMoreReviewsSuccess
} = actions;

export function* loadReviews(action) {
  const { data } = action;
  const { address, reviewType, role } = data;
  const params = {
    review_type: reviewType,
    limit: LIMIT,
    platform__in: config.platform
  };

  try {
    let endpoint = `reviews/?${role}__public_address=${address}`;
    const reviews = yield call(request, endpoint, 'GET', { params });
    yield put(loadReviewsSuccess(reviews.results, reviews.count));
  } catch (e) {
    console.log(e);
    yield put(loadReviewsFail(e));
  }
}

export function* loadMoreReviews(action) {
  const { reviewType } = action;
  const { address, role, reviews } = yield select(reviewsStateSelector);
  const params = {
    review_type: reviewType,
    limit: LIMIT,
    offset: reviews.length,
    platform__in: config.platform
  };

  try {
    let endpoint = `reviews/?${role}__public_address=${address}`;
    const reviews = yield call(request, endpoint, 'GET', { params });
    yield put(loadMoreReviewsSuccess(reviews.results));
  } catch (e) {
    console.log(e);
    yield put(loadMoreReviewsFail(e));
  }
}

export function* watchReviews() {
  yield takeLatest(LOAD_REVIEWS, loadReviews);
}

export function* watchLoadMoreReviews() {
  yield takeLatest(LOAD_MORE_REVIEWS, loadMoreReviews);
}

export default [watchReviews, watchLoadMoreReviews];
