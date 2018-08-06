import request from 'utils/request';
import { push } from 'react-router-redux';
import { put, takeLatest } from 'redux-saga/effects';
import { actionTypes as transactionActionTypes } from 'public-modules/Transaction';
import { actions as bountyPageActions } from './reducer';

const { INITIATE_WALKTHROUGH } = transactionActionTypes;
const { closeModal } = bountyPageActions;

export function* closeModals(action) {
  yield put(closeModal());
}

export function* watchCloseModals() {
  yield takeLatest([INITIATE_WALKTHROUGH], closeModals);
}

export default [watchCloseModals];
