import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import config from 'public-modules/config';
import { actionTypes, actions } from 'public-modules/UserInfo';

const { LOAD_USERINFO } = actionTypes;
const { loadUserInfoFail, loadUserInfoSuccess } = actions;

export function* loadUserInfo(action) {
  const { address } = action;

  try {
    let endpoint = `user/${address}/profile/?platform__in=${config.platform}`;
    const userInfo = yield call(request, endpoint, 'GET');
    yield put(loadUserInfoSuccess(userInfo));
  } catch (e) {
    yield put(loadUserInfoFail(e));
  }
}

export function* watchUserInfo() {
  yield takeLatest(LOAD_USERINFO, loadUserInfo);
}

export default [watchUserInfo];
