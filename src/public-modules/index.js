/* eslint import/first: 0 */

// ultimately each of these imports should be in separate files
import bountiesReducer from 'public-modules/Bounties';
import leaderboardReducer from 'public-modules/Leaderboard';
import userInfoReducer from 'public-modules/UserInfo';

export const reducers = {
  bounties: bountiesReducer,
  leaderboard: leaderboardReducer,
  userInfo: userInfoReducer
};

import bountiesSagas from 'public-modules/Bounties/sagas';
import leaderboardSagas from 'public-modules/Leaderboard/sagas';
import userInfoSagas from 'public-modules/UserInfo/sagas';

export const sagaWatchers = [
  ...leaderboardSagas,
  ...bountiesSagas,
  ...userInfoSagas
];

import * as namedBountiesSagas from 'public-modules/Bounties/sagas';
import * as namedLeaderboardSagas from 'public-modules/Leaderboard/sagas';
import * as namedUserInfoSagas from 'public-modules/UserInfo/sagas';

export const sagas = {
  ...namedLeaderboardSagas,
  ...namedBountiesSagas,
  ...namedUserInfoSagas
};

import { actions as bountyActions } from 'public-modules/Bounties';
import { actions as leaderboardActions } from 'public-modules/Leaderboard';
import { actions as userInfoActions } from 'public-modules/UserInfo';

export const actions = {
  ...leaderboardActions,
  ...bountyActions,
  ...userInfoActions
};

import { actionTypes as bountyActionTypes } from 'public-modules/Bounties';
import { actionTypes as leaderboardActionTypes } from 'public-modules/Leaderboard';
import { actionTypes as userInfoActionTypes } from 'public-modules/UserInfo';

export const actionTypes = {
  ...leaderboardActionTypes,
  ...bountyActionTypes,
  ...userInfoActionTypes
};

import * as bountiesSelectors from 'public-modules/Bounties/selectors';
import * as leaderboardSelectors from 'public-modules/Leaderboard/selectors';
import * as userInfoSelectors from 'public-modules/UserInfo/selectors';

export const selectors = {
  ...leaderboardSelectors,
  ...bountiesSelectors,
  ...userInfoSelectors
};
