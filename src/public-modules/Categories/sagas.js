import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Categories';

const { LOAD_CATEGORIES } = actionTypes;
const { loadCategoriesFail, loadCategoriesSuccess } = actions;

export function* loadCategories(action) {
  try {
    let endpoint = `category`;
    const categories = yield call(request, endpoint, 'GET');
    yield put(loadCategoriesSuccess(categories));
  } catch (e) {
    yield put(loadCategoriesFail(e));
  }
}

export function* watchCategories() {
  yield takeLatest(LOAD_CATEGORIES, loadCategories);
}

export default [watchCategories];
