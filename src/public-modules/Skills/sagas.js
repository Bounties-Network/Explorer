import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from 'public-modules/Skills';
import { actionTypes as clientActionTypes } from 'public-modules/Client';

const { SET_INITIALIZED } = clientActionTypes;
const { loadSkillsFail, loadSkillsSuccess } = actions;

export function* loadSkills(action) {
  try {
    const endpoint = 'user/skills/?limit=2000';
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
