import { put, takeLatest, select } from 'redux-saga/effects';
import { reset } from 'redux-form';
import { LOCATION_CHANGE } from 'react-router-redux';
import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import { bountyIdSelector } from './selectors';
import { fulfillmentSelector } from 'public-modules/Fulfillment/selectors';
import { actionTypes as transactionActionTypes } from 'public-modules/Transaction';
import { actionTypes as reviewActionTypes } from 'public-modules/Review';
import { actionTypes as fulfillmentActionTypes } from 'public-modules/Fulfillment';
import { actions as fulfillmentsActions } from 'public-modules/Fulfillments';
import {
  actions as commentsActions,
  actionTypes as commentsActionTypes
} from 'public-modules/Comments';
import { actions as transactionActions } from 'public-modules/Transaction';
import {
  actions as bountyPageActions,
  actionTypes as bountyPageActionTypes
} from './reducer';

const { INITIATE_WALKTHROUGH } = transactionActionTypes;
const { SET_ACTIVE_TAB } = bountyPageActionTypes;
const { POST_REVIEW_SUCCESS } = reviewActionTypes;
const { LOAD_FULFILLMENT_SUCCESS } = fulfillmentActionTypes;
const { closeModal, showModal, setRatingModal } = bountyPageActions;
const { loadFulfillments } = fulfillmentsActions;
const { loadComments } = commentsActions;
const { closeWalkthrough } = transactionActions;
const { POST_COMMENT_SUCCESS } = commentsActionTypes;

export function* closeBountyModal(action) {
  yield put(closeModal());

  if (action.type === LOCATION_CHANGE) {
    yield put(closeWalkthrough());
  }
}

export function* loadTab(action) {
  const { tabKey = 'submissions' } = action;

  if (tabKey === 'submissions') {
    yield put(loadFulfillments());
  } else {
    const bountyId = yield select(bountyIdSelector);
    yield put(loadComments(bountyId));
  }
}

export function* showIssueRatingModal() {
  const { fulfillment } = yield select(fulfillmentSelector);
  const { public_address: current_address } = yield select(
    getCurrentUserSelector
  );

  const {
    fulfillment_id,
    bounty_data,
    fulfiller,
    fulfiller_review,
    issuer_review
  } = fulfillment;

  const issuer = bounty_data.user.public_address;

  if (fulfiller === current_address && !issuer_review) {
    // fulfiller to rate issuer
    const { name, profile_image } = bounty_data.user;

    yield put(
      setRatingModal(fulfillment_id, {
        name,
        address: issuer,
        img: profile_image
      })
    );
    yield put(showModal('issueRatingForIssuer'));
  } else if (issuer === current_address && !fulfiller_review) {
    // issuer to rate fulfiller
    const { name, profile_image } = fulfillment.user;

    yield put(
      setRatingModal(fulfillment_id, {
        name,
        address: fulfiller,
        img: profile_image
      })
    );
    yield put(showModal('issueRatingForFulfiller'));
  }
}

export function* resetCommentsForm() {
  yield put(reset('newComment'));
}

export function* watchFulfillmentLoadSuccess() {
  yield takeLatest(LOAD_FULFILLMENT_SUCCESS, showIssueRatingModal);
}

export function* watchCloseModals() {
  yield takeLatest(
    [INITIATE_WALKTHROUGH, POST_REVIEW_SUCCESS, LOCATION_CHANGE],
    closeBountyModal
  );
}

export function* watchTabLoads() {
  yield takeLatest(
    [SET_ACTIVE_TAB, POST_REVIEW_SUCCESS, LOCATION_CHANGE],
    loadTab
  );
}

export function* watchCommentPosted() {
  yield takeLatest(POST_COMMENT_SUCCESS, resetCommentsForm);
}

export default [
  watchCloseModals,
  watchTabLoads,
  watchFulfillmentLoadSuccess,
  watchCommentPosted
];
