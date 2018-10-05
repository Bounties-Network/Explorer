import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from 'public-modules/Tags';
import { actionTypes as clientActionTypes } from 'public-modules/Client';
import config from 'public-modules/config';

const { SET_INITIALIZED } = clientActionTypes;
const { loadTagsFail, loadTagsSuccess } = actions;

export function* loadTags(action) {
  try {
    const params = { limit: 2000, platform: config.tagPlatform };
    const endpoint = 'tag/';
    const tags = yield call(request, endpoint, 'GET', { params });
    yield put(loadTagsSuccess(tags));
  } catch (e) {
    yield put(loadTagsFail(e));
  }
}

export function* watchTags() {
  yield takeLatest(SET_INITIALIZED, loadTags);
}

export default [watchTags];
