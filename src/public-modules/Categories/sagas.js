import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from 'public-modules/Categories';
import { actionTypes as clientActionTypes } from 'public-modules/Client';

const { SET_INITIALIZED } = clientActionTypes;
const { loadCategoriesFail, loadCategoriesSuccess } = actions;

export function* loadCategories(action) {
  try {
    const endpoint = 'category/?limit=2000';
    const categories = yield call(request, endpoint, 'GET');
    yield put(loadCategoriesSuccess(categories));
  } catch (e) {
    yield put(loadCategoriesFail(e));
  }
}

export function* watchCategories() {
  yield takeLatest(SET_INITIALIZED, loadCategories);
}

export default [watchCategories];
