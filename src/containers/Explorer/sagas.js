import request from 'utils/request';
import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { currentRouteSelector } from 'utils/helpers';
import { actions } from 'public-modules/Bounties';
const { resetFilters, allStageFilters } = actions;

export function* locationChanged(action) {
  const { pathname } = action.payload;

  yield put(resetFilters());

  if (currentRouteSelector(pathname) != 'explorer') {
    yield put(allStageFilters());
  }
}

export function* watchRouter() {
  yield takeLatest(LOCATION_CHANGE, locationChanged);
}

export default [watchRouter];
