import request from 'utils/request';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Applicants';
import { applicantsSelector } from 'public-modules/Applicants/selectors';
import { LIMIT } from './constants';

const {
  LOAD_APPLICANTS,
  LOAD_MORE_APPLICANTS,
  CHANGE_APPLICATION_STATE,
  CHANGE_APPLICATION_STATE_SUCCESS
} = actionTypes;
const {
  loadApplicants,
  loadApplicantsFail,
  loadApplicantsSuccess,
  loadMoreApplicantsFail,
  loadMoreApplicantsSuccess,
  changeApplicationStateSuccess,
  changeApplicationStateFail
} = actions;

export function* loadApplicantsSaga(action) {
  const { bountyId } = action;

  try {
    let endpoint = `bounty/${bountyId}/application/?limit=${LIMIT}`;
    const applicants = yield call(request, endpoint, 'GET');
    const { results, count } = applicants;
    yield put(loadApplicantsSuccess(results, count));
  } catch (e) {
    yield put(loadApplicantsFail(e));
  }
}

export function* loadMoreApplicants() {
  const { applicants: currentApplicants, bountyId } = yield select(
    applicantsSelector
  );

  const params = {
    limit: LIMIT,
    offset: currentApplicants.length
  };

  try {
    let endpoint = `bounty/${bountyId}/application/`;
    const applicants = yield call(request, endpoint, 'GET', { params });
    const { results, count } = applicants;
    yield put(loadMoreApplicantsSuccess(results, count));
  } catch (e) {
    yield put(loadMoreApplicantsFail(e));
  }
}

export function* changeApplicationState(action) {
  const { applicationId, state, reply } = action;

  const data = {
    state: state,
    issuer_reply: reply
  };

  try {
    let endpoint = `application/${applicationId}/`;
    yield call(request, endpoint, 'PUT', { data });
    yield put(changeApplicationStateSuccess());
  } catch (e) {
    yield put(changeApplicationStateFail(e));
  }
}

export function* changeApplicationStateSuccessSaga() {
  const { bountyId } = yield select(applicantsSelector);
  yield put(loadApplicants(bountyId));
}

export function* watchApplicants() {
  yield takeLatest(LOAD_APPLICANTS, loadApplicantsSaga);
}

export function* watchLoadMoreApplicants() {
  yield takeLatest(LOAD_MORE_APPLICANTS, loadMoreApplicants);
}

export function* watchChangeApplicationStateSaga() {
  yield takeLatest(CHANGE_APPLICATION_STATE, changeApplicationState);
}

export function* watchChangeApplicationStateSuccessSaga() {
  yield takeLatest(
    CHANGE_APPLICATION_STATE_SUCCESS,
    changeApplicationStateSuccessSaga
  );
}

export default [
  watchApplicants,
  watchLoadMoreApplicants,
  watchChangeApplicationStateSaga,
  watchChangeApplicationStateSuccessSaga
];
