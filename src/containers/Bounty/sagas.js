import request from 'utils/request';
import { push } from 'react-router-redux';
import { put, takeLatest } from 'redux-saga/effects';
import { actionTypes as transactionActionTypes } from 'public-modules/Transaction';
import { actions as fulfillmentsActions } from 'public-modules/Fulfillments';
import { actions as commentsActions } from 'public-modules/Comments';
import {
  actions as bountyPageActions,
  actionTypes as bountyPageActionTypes
} from './reducer';

const { INITIATE_WALKTHROUGH } = transactionActionTypes;
const { SET_ACTIVE_TAB } = bountyPageActionTypes;
const { closeModal } = bountyPageActions;
const { loadFulfillments } = fulfillmentsActions;
const { loadComments } = commentsActions;

export function* closeModals(action) {
  yield put(closeModal());
}

export function* loadTab(action) {
  const { tabKey } = action;

  if (tabKey == 'submissions') {
    yield put(loadFulfillments());
  } else {
    yield put(loadComments());
  }
}

export function* watchCloseModals() {
  yield takeLatest([INITIATE_WALKTHROUGH], closeModals);
}

export function* watchSetActiveTab() {
  yield takeLatest(SET_ACTIVE_TAB, loadTab);
}

export default [watchCloseModals, watchSetActiveTab];
