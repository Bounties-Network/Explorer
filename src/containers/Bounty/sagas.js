import request from 'utils/request';
import { push } from 'react-router-redux';
import { put, takeLatest, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actionTypes as transactionActionTypes } from 'public-modules/Transaction';
import { actionTypes as reviewActionTypes } from 'public-modules/Review';
import { actions as fulfillmentsActions } from 'public-modules/Fulfillments';
import { actions as commentsActions } from 'public-modules/Comments';
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

export function* closeModals(action) {
  yield put(closeModal());
  yield put(loadFulfillments());
}

export function* loadTab(action) {
  const { tabKey } = action;

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
    closeModals
  );
}

export function* watchSetActiveTab() {
  yield takeLatest(SET_ACTIVE_TAB, loadTab);
}

export default [watchCloseModals, watchSetActiveTab];
