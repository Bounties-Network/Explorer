import request from 'utils/request';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Applicants';
import { applicantsSelector } from 'public-modules/Applicants/selectors';
import { LIMIT } from './constants';

const { LOAD_APPLICANTS, LOAD_MORE_APPLICANTS } = actionTypes;
const {
  loadApplicantsFail,
  loadApplicantsSuccess,
  loadMoreApplicantsFail,
  loadMoreApplicantsSuccess
} = actions;

export function* loadApplicants(action) {
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

export function* loadMoreApplicants(action) {
  const { comments: currentApplicants, bountyId } = yield select(
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

export function* watchApplicants() {
  yield takeLatest(LOAD_APPLICANTS, loadApplicants);
}

export function* watchLoadMoreApplicants() {
  yield takeLatest(LOAD_MORE_APPLICANTS, loadMoreApplicants);
}

export default [watchApplicants, watchLoadMoreApplicants];
