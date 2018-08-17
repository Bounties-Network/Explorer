import request from "utils/request";
import { all, call, put, takeLatest, select } from "redux-saga/effects";
import { actionTypes, actions } from "public-modules/Leaderboard";
import { leaderboardQuerySelector, leaderboardSelector } from "./selectors";
import { rootLeaderboardUISelector } from "containers/Leaderboard/selectors";

const { LOAD_LEADERBOARD, LOAD_MORE_LEADERBOARD } = actionTypes;
const {
  loadLeaderboardFail,
  loadLeaderboardSuccess,
  loadMoreLeaderboardSuccess
} = actions;

export function* loadLeaderboard() {
  const params = yield select(leaderboardQuerySelector);

  try {
    const { issuer, fulfiller } = yield all({
      issuer: call(request, "leaderboard/issuer/", "GET", { params }),
      fulfiller: call(request, "leaderboard/fulfiller/", "GET", { params })
    });

    yield put(loadLeaderboardSuccess({ issuer, fulfiller }));
  } catch (e) {
    yield put(loadLeaderboardFail(e));
  }
}

export function* loadMoreLeaderboard() {
  const params = yield select(leaderboardQuerySelector);
  const { leaderboard } = yield select(leaderboardSelector);
  const { toggleValue } = yield select(rootLeaderboardUISelector);
  const offset = {
    issuer: leaderboard.issuer.length,
    fulfiller: leaderboard.fulfiller.length
  };

  const getData = (toggleValue, offset, type) => {
    return toggleValue == type
      ? call(request, `leaderboard/${type}/`, "GET", {
          params: { ...params, offset: offset[type] }
        })
      : [];
  };

  const { issuer, fulfiller } = yield all({
    issuer: getData(toggleValue, offset, "issuer"),
    fulfiller: getData(toggleValue, offset, "fulfiller")
  });

  try {
    yield put(
      loadMoreLeaderboardSuccess({
        issuer: issuer.results || [],
        fulfiller: fulfiller.results || []
      })
    );
  } catch (e) {
    yield put(loadLeaderboardFail(e));
  }
}

export function* watchLeaderboard() {
  yield takeLatest(LOAD_LEADERBOARD, loadLeaderboard);
}

export function* watchLoadMoreLeaderboard() {
  yield takeLatest(LOAD_MORE_LEADERBOARD, loadMoreLeaderboard);
}

export default [watchLeaderboard, watchLoadMoreLeaderboard];
