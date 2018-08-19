import request from 'utils/request';
import { push } from 'react-router-redux';
import { all, put, takeLatest, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actionTypes as transactionActionTypes } from 'public-modules/Transaction';
import { actionTypes as reviewActionTypes } from 'public-modules/Review';
import { actions as fulfillmentsActions } from 'public-modules/Fulfillments';
import { actions as commentsActions } from 'public-modules/Comments';
import { actions as transactionActions } from 'public-modules/Transaction';
import {
  actions as bountyPageActions,
  actionTypes as bountyPageActionTypes
} from './reducer';
import { bountyIdSelector } from './selectors';

const { INITIATE_WALKTHROUGH } = transactionActionTypes;
const { SET_ACTIVE_TAB } = bountyPageActionTypes;
const { POST_REVIEW_SUCCESS } = reviewActionTypes;
const { closeModal } = bountyPageActions;
const { loadFulfillments } = fulfillmentsActions;
const { loadComments } = commentsActions;
const { closeWalkthrough } = transactionActions;

export function* closeBountyModal(action) {
  yield put(closeModal());

  if (action.type === LOCATION_CHANGE) {
    yield put(closeWalkthrough());
  }
}

export function* loadTab(action) {
  const { tabKey = 'submissions' } = action;

  if (tabKey == 'submissions') {
    yield put(loadFulfillments());
  } else {
    const bountyId = yield select(bountyIdSelector);
    yield put(loadComments(bountyId));
  }
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

export default [watchCloseModals, watchTabLoads];
