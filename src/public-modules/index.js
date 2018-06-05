/* eslint import/first: 0 */

// ultimately each of these imports should be in separate files
import bountiesReducer from 'public-modules/Bounties';
import leaderboardReducer from 'public-modules/Leaderboard';
import userInfoReducer from 'public-modules/UserInfo';
import statsReducer from 'public-modules/Stats';
import categoriesReducer from 'public-modules/Categories';

export const reducers = {
  bounties: bountiesReducer,
  leaderboard: leaderboardReducer,
  userInfo: userInfoReducer,
  stats: statsReducer,
  categories: categoriesReducer
};

import bountiesSagas from 'public-modules/Bounties/sagas';
import leaderboardSagas from 'public-modules/Leaderboard/sagas';
import userInfoSagas from 'public-modules/UserInfo/sagas';
import statsSagas from 'public-modules/Stats/sagas';
import categoriesSagas from 'public-modules/Categories/sagas';

export const sagaWatchers = [
  ...leaderboardSagas,
  ...bountiesSagas,
  ...userInfoSagas,
  ...statsSagas,
  ...categoriesSagas
];

import * as namedBountiesSagas from 'public-modules/Bounties/sagas';
import * as namedLeaderboardSagas from 'public-modules/Leaderboard/sagas';
import * as namedUserInfoSagas from 'public-modules/UserInfo/sagas';
import * as namedStatsSagas from 'public-modules/Stats/sagas';
import * as namedCategoriesSagas from 'public-modules/Categories/sagas';

export const sagas = {
  ...namedLeaderboardSagas,
  ...namedBountiesSagas,
  ...namedUserInfoSagas,
  ...namedStatsSagas,
  ...namedCategoriesSagas
};

import { actions as bountyActions } from 'public-modules/Bounties';
import { actions as leaderboardActions } from 'public-modules/Leaderboard';
import { actions as userInfoActions } from 'public-modules/UserInfo';
import { actions as statsActions } from 'public-modules/Stats';
import { actions as categoriesActions } from 'public-modules/Categories';

export const actions = {
  ...leaderboardActions,
  ...bountyActions,
  ...userInfoActions,
  ...statsActions,
  ...categoriesActions
};

import { actionTypes as bountyActionTypes } from 'public-modules/Bounties';
import { actionTypes as leaderboardActionTypes } from 'public-modules/Leaderboard';
import { actionTypes as userInfoActionTypes } from 'public-modules/UserInfo';
import { actionTypes as statsActionTypes } from 'public-modules/Stats';
import { actionTypes as categoriesActionTypes } from 'public-modules/Categories';

export const actionTypes = {
  ...leaderboardActionTypes,
  ...bountyActionTypes,
  ...userInfoActionTypes,
  ...statsActionTypes,
  ...categoriesActionTypes
};

import * as bountiesSelectors from 'public-modules/Bounties/selectors';
import * as leaderboardSelectors from 'public-modules/Leaderboard/selectors';
import * as userInfoSelectors from 'public-modules/UserInfo/selectors';
import * as statsSelectors from 'public-modules/Stats/selectors';
import * as categoriesSelectors from 'public-modules/Categories/selectors';

export const selectors = {
  ...leaderboardSelectors,
  ...bountiesSelectors,
  ...userInfoSelectors,
  ...statsSelectors,
  ...categoriesSelectors
};
