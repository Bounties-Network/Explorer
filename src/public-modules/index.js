/* eslint import/first: 0 */

// ultimately each of these imports should be in separate files
import bountiesReducer from 'public-modules/Bounties';

export const reducers = {
  bounties: bountiesReducer
};

import bountiesSagas from 'public-modules/Bounties/sagas';

export const sagaWatchers = [...bountiesSagas];

import * as namedBountiesSagas from 'public-modules/Bounties/sagas';

export const sagas = {
  ...namedBountiesSagas
};

import { actions as bountyActions } from 'public-modules/Bounties';

export const actions = {
  ...bountyActions
};

import { actionTypes as bountyActionTypes } from 'public-modules/Bounties';

export const actionTypes = {
  ...bountyActionTypes
};

import * as bountiesSelectors from 'public-modules/Bounties/selectors';

export const selectors = {
  ...bountiesSelectors
};
