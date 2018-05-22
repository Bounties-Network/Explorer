/* eslint import/first: 0 */

// ultimately each of these imports should be in separate files
import bountiesReducer from 'public-modules/Bounties';
import leaderboardReducer from 'public-modules/Leaderboard';

export const reducers = {
  bounties: bountiesReducer,
  leaderboard: leaderboardReducer
};

import bountiesSagas from 'public-modules/Bounties/sagas';
import leaderboardSagas from 'public-modules/Leaderboard/sagas';

export const sagaWatchers = [...leaderboardSagas, ...bountiesSagas];

import * as namedBountiesSagas from 'public-modules/Bounties/sagas';
import * as namedLeaderboardSagas from 'public-modules/Leaderboard/sagas';

export const sagas = {
  ...namedLeaderboardSagas,
  ...namedBountiesSagas
};

import { actions as bountyActions } from 'public-modules/Bounties';
import { actions as leaderboardActions } from 'public-modules/Leaderboard';

export const actions = {
  ...leaderboardActions,
  ...bountyActions
};

import { actionTypes as bountyActionTypes } from 'public-modules/Bounties';
import { actionTypes as leaderboardActionTypes } from 'public-modules/Leaderboard';

export const actionTypes = {
  ...leaderboardActions,
  ...bountyActionTypes
};

import * as bountiesSelectors from 'public-modules/Bounties/selectors';
import * as leaderboardSelectors from 'public-modules/Leaderboard/selectors';

export const selectors = {
  ...leaderboardSelectors,
  ...bountiesSelectors
};
