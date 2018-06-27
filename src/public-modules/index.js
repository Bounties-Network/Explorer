/* eslint import/first: 0 */

// ultimately each of these imports should be in separate files
import bountiesReducer from 'public-modules/Bounties';
import leaderboardReducer from 'public-modules/Leaderboard';
import userInfoReducer from 'public-modules/UserInfo';
import statsReducer from 'public-modules/Stats';
import categoriesReducer from 'public-modules/Categories';
import authenticationReducer from 'public-modules/Authentication';
import bountyReducer from 'public-modules/Bounty';
import fileUploadRducer from 'public-modules/FileUpload';
import clientReducer from 'public-modules/Client';

export const reducers = {
  bounties: bountiesReducer,
  leaderboard: leaderboardReducer,
  userInfo: userInfoReducer,
  stats: statsReducer,
  categories: categoriesReducer,
  authentication: authenticationReducer,
  bounty: bountyReducer,
  fileUpload: fileUploadRducer,
  client: clientReducer
};

import bountiesSagas from 'public-modules/Bounties/sagas';
import leaderboardSagas from 'public-modules/Leaderboard/sagas';
import userInfoSagas from 'public-modules/UserInfo/sagas';
import statsSagas from 'public-modules/Stats/sagas';
import categoriesSagas from 'public-modules/Categories/sagas';
import authenticationSagas from 'public-modules/Authentication/sagas';
import bountySagas from 'public-modules/Bounty/sagas';
import fileUploadSagas from 'public-modules/FileUpload/sagas';
import clientSagas from 'public-modules/Client/sagas';

export const sagaWatchers = [
  ...leaderboardSagas,
  ...bountiesSagas,
  ...userInfoSagas,
  ...statsSagas,
  ...categoriesSagas,
  ...authenticationSagas,
  ...bountySagas,
  ...fileUploadSagas,
  ...clientSagas
];

import * as namedBountiesSagas from 'public-modules/Bounties/sagas';
import * as namedLeaderboardSagas from 'public-modules/Leaderboard/sagas';
import * as namedUserInfoSagas from 'public-modules/UserInfo/sagas';
import * as namedStatsSagas from 'public-modules/Stats/sagas';
import * as namedCategoriesSagas from 'public-modules/Categories/sagas';
import * as namedAuthenticationSagas from 'public-modules/Authentication/sagas';
import * as namedBountySagas from 'public-modules/Bounty/sagas';
import * as namedFileUploadSagas from 'public-modules/FileUpload/sagas';
import * as namedClientSagas from 'public-modules/Client/sagas';

export const sagas = {
  ...namedLeaderboardSagas,
  ...namedBountiesSagas,
  ...namedUserInfoSagas,
  ...namedStatsSagas,
  ...namedCategoriesSagas,
  ...namedAuthenticationSagas,
  ...namedBountySagas,
  ...namedFileUploadSagas,
  ...namedClientSagas
};

import { actions as bountiesActions } from 'public-modules/Bounties';
import { actions as leaderboardActions } from 'public-modules/Leaderboard';
import { actions as userInfoActions } from 'public-modules/UserInfo';
import { actions as statsActions } from 'public-modules/Stats';
import { actions as categoriesActions } from 'public-modules/Categories';
import { actions as authenticationActions } from 'public-modules/Authentication';
import { actions as bountyActions } from 'public-modules/Bounty';
import { actions as fileUploadActions } from 'public-modules/FileUpload';
import { actions as clientActions } from 'public-modules/Client';

export const actions = {
  ...leaderboardActions,
  ...bountiesActions,
  ...userInfoActions,
  ...statsActions,
  ...categoriesActions,
  ...authenticationActions,
  ...bountyActions,
  ...fileUploadActions,
  ...clientActions
};

import { actionTypes as bountiesActionTypes } from 'public-modules/Bounties';
import { actionTypes as leaderboardActionTypes } from 'public-modules/Leaderboard';
import { actionTypes as userInfoActionTypes } from 'public-modules/UserInfo';
import { actionTypes as statsActionTypes } from 'public-modules/Stats';
import { actionTypes as categoriesActionTypes } from 'public-modules/Categories';
import { actionTypes as authenticationActionTypes } from 'public-modules/Authentication';
import { actionTypes as bountyActionTypes } from 'public-modules/Bounty';
import { actionTypes as fileUploadActionTypes } from 'public-modules/FileUpload';
import { actionTypes as clientActionTypes } from 'public-modules/Client';

export const actionTypes = {
  ...leaderboardActionTypes,
  ...bountiesActionTypes,
  ...userInfoActionTypes,
  ...statsActionTypes,
  ...categoriesActionTypes,
  ...authenticationActionTypes,
  ...bountyActionTypes,
  ...fileUploadActionTypes,
  ...clientActionTypes
};

import * as bountiesSelectors from 'public-modules/Bounties/selectors';
import * as leaderboardSelectors from 'public-modules/Leaderboard/selectors';
import * as userInfoSelectors from 'public-modules/UserInfo/selectors';
import * as statsSelectors from 'public-modules/Stats/selectors';
import * as categoriesSelectors from 'public-modules/Categories/selectors';
import * as authenticationSelectors from 'public-modules/Authentication/selectors';
import * as bountySelectors from 'public-modules/Bounty/selectors';
import * as fileUploadSelectors from 'public-modules/FileUpload/selectors';
import * as clientSelectors from 'public-modules/Client/selectors';

export const selectors = {
  ...leaderboardSelectors,
  ...bountiesSelectors,
  ...userInfoSelectors,
  ...statsSelectors,
  ...categoriesSelectors,
  ...authenticationSelectors,
  ...bountySelectors,
  ...fileUploadSelectors,
  ...clientSelectors
};
