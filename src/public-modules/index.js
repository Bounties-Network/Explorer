/* eslint import/first: 0 */

// ultimately each of these imports should be in separate files
import bountiesReducer from 'public-modules/Bounties';
import leaderboardReducer from 'public-modules/Leaderboard';
import userInfoReducer from 'public-modules/UserInfo';
import statsReducer from 'public-modules/Stats';
import categoriesReducer from 'public-modules/Categories';
import skillsReducer from 'public-modules/Skills';
import authenticationReducer from 'public-modules/Authentication';
import bountyReducer from 'public-modules/Bounty';
import fileUploadRducer from 'public-modules/FileUpload';
import clientReducer from 'public-modules/Client';
import settingsReducer from 'public-modules/Settings';

export const reducers = {
  bounties: bountiesReducer,
  leaderboard: leaderboardReducer,
  userInfo: userInfoReducer,
  stats: statsReducer,
  categories: categoriesReducer,
  skills: skillsReducer,
  authentication: authenticationReducer,
  bounty: bountyReducer,
  fileUpload: fileUploadRducer,
  client: clientReducer,
  settings: settingsReducer
};

import bountiesSagas from 'public-modules/Bounties/sagas';
import leaderboardSagas from 'public-modules/Leaderboard/sagas';
import userInfoSagas from 'public-modules/UserInfo/sagas';
import statsSagas from 'public-modules/Stats/sagas';
import categoriesSagas from 'public-modules/Categories/sagas';
import skillsSagas from 'public-modules/Skills/sagas';
import authenticationSagas from 'public-modules/Authentication/sagas';
import bountySagas from 'public-modules/Bounty/sagas';
import fileUploadSagas from 'public-modules/FileUpload/sagas';
import clientSagas from 'public-modules/Client/sagas';
import settingsSagas from 'public-modules/Settings/sagas';

export const sagaWatchers = [
  ...leaderboardSagas,
  ...bountiesSagas,
  ...userInfoSagas,
  ...statsSagas,
  ...categoriesSagas,
  ...skillsSagas,
  ...authenticationSagas,
  ...bountySagas,
  ...fileUploadSagas,
  ...clientSagas,
  ...settingsSagas
];
