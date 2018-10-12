import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Review';
import { Toast } from 'components';

const { POST_REVIEW } = actionTypes;
const { postReviewSuccess, postReviewFail } = actions;

export function* postNewReview(action) {
  const { bountyId, bountyPlatform, fulfillmentId, rating, review } = action;

  // for some reason, this only works when I pass a copy of review
  const _review = review;

  try {
    let endpoint = `bounty/${bountyId}/fulfillment/${fulfillmentId}/review/`;
    const review = yield call(request, endpoint, 'POST', {
      data: {
        rating,
        review: _review,
        platform: bountyPlatform
      }
    });

    yield put(postReviewSuccess(review));
    yield call(Toast, Toast.TYPE.SUCCESS, 'Your rating was submitted', null);
  } catch (e) {
    console.log(e);
    yield put(postReviewFail(e));
  }
}

export function* watchPostReview() {
  yield takeLatest(POST_REVIEW, postNewReview);
}

export default [watchPostReview];
