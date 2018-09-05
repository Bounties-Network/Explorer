import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Tokens';

const { LOAD_TOKENS } = actionTypes;
const { loadTokensFail, loadTokensSuccess } = actions;

export function* loadTokens(action) {
  try {
    let endpoint = 'token';
    const tokens = yield call(request, endpoint, 'GET');
    yield put(loadTokensSuccess(tokens));
  } catch (e) {
    yield put(loadTokensFail(e));
  }
}

export function* watchTokens() {
  yield takeLatest(LOAD_TOKENS, loadTokens);
}

export default [watchTokens];
