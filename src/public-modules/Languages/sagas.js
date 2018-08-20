import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from 'public-modules/Languages';
import { actionTypes as clientActionTypes } from 'public-modules/Client';

const { SET_INITIALIZED } = clientActionTypes;
const { loadLanguagesFail, loadLanguagesSuccess } = actions;

export function* loadLanguages(action) {
  try {
    const endpoint = 'user/languages/?limit=2000';
    const languages = yield call(request, endpoint, 'GET');
    yield put(loadLanguagesSuccess(languages));
  } catch (e) {
    yield put(loadLanguagesFail(e));
  }
}

export function* watchLanguages() {
  yield takeLatest(SET_INITIALIZED, loadLanguages);
}

export default [watchLanguages];
