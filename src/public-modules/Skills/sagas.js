import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes, actions } from 'public-modules/Skills';
import { searchQueryBuilder } from '../Utilities/helpers';
import { actionTypes as clientActionTypes } from 'public-modules/Client';

const { SET_INITIALIZED } = clientActionTypes;
const { LOAD_CATEGORIES } = actionTypes;
const { loadSkillsFail, loadSkillsSuccess } = actions;

export function* loadSkills(action) {
  try {
    const endpoint = 'category/?limit=2000';
    const skills = yield call(request, endpoint, 'GET');
    yield put(loadSkillsSuccess(skills));
  } catch (e) {
    yield put(loadSkillsFail(e));
  }
}

export function* watchSkills() {
  yield takeLatest(SET_INITIALIZED, loadSkills);
}

export default [watchSkills];
