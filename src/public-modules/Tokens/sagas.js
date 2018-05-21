import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Tokens';

const { LOAD_TOKENSINFO } = actionTypes;
const { loadTokensInfoFail, loadTokensInfoSuccess } = actions;

export function* loadTokensInfo(action) {
  try {
    let endpoint = `token`;
    const tokensInfo = yield call(request, endpoint, 'GET');
    yield put(loadTokensInfoSuccess(tokensInfo));
  } catch (e) {
    yield put(loadTokensInfoFail(e));
  }
}

export function* watchTokensInfo() {
  yield takeLatest(LOAD_TOKENSINFO, loadTokensInfo);
}

export default [watchTokensInfo];
