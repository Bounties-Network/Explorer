import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from './reducer';

const { LOAD_REVIEWEE } = actionTypes;
const { loadRevieweeSuccess, loadRevieweeFail } = actions;

export function* loadReviewee(action) {
  const { identifiers } = action;
  const { bountyId, fulfillmentId, type } = identifiers;

  try {
    let endpoint = `fulfillment/?bounty=${bountyId}&fulfillment_id=${fulfillmentId}`;
    const fulfillments = yield call(request, endpoint, 'GET');
    const fulfillment = fulfillments.results[0];

    let reviewee = {
      name: fulfillment.user.name,
      address: fulfillment.user.public_address,
      img: fulfillment.user.profile_image
    };

    if (type === 'issuer') {
      const { bounty_data } = fulfillment;

      reviewee = {
        name: bounty_data.user.name,
        address: bounty_data.user.public_address,
        img: bounty_data.user.profile_image
      };
    }

    yield put(loadRevieweeSuccess(reviewee));
  } catch (e) {
    console.log(e);
    yield put(loadRevieweeFail(e));
  }
}

export function* watchReviewee() {
  yield takeLatest(LOAD_REVIEWEE, loadReviewee);
}

export default [watchReviewee];
