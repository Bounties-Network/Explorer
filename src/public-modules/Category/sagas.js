import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Category';

const { LOAD_CATEGORY } = actionTypes;
const { loadCategoryFail, loadCategorySuccess } = actions;

export function* loadCategory(action) {
  const id = action.id;
  try {
    let endpoint = `category/${id}`;
    const category = yield call(request, endpoint, 'GET');
    yield put(loadCategorySuccess(category));
  } catch (e) {
    yield put(loadCategoryFail(e));
  }
}

export function* watchCategory() {
  yield takeLatest(LOAD_CATEGORY, loadCategory);
}

export default [watchCategory];
