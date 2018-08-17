import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Reviews';

const { LOAD_REVIEWS } = actionTypes;
const { loadReviewsFail, loadReviewsSuccess } = actions;

export function* loadReviews(action) {
  const { address, role } = action;

  try {
    let endpoint = `reviews/?${role}__public_address=${address}`;
    const reviews = yield call(request, endpoint, 'GET');
    yield put(loadReviewsSuccess(reviews.results, reviews.count));
  } catch (e) {
    console.log(e);
    yield put(loadReviewsFail(e));
  }
}

export function* watchReviews() {
  yield takeLatest(LOAD_REVIEWS, loadReviews);
}

export default [watchReviews];
