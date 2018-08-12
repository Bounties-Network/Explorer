/* eslint import/first: 0 */

// ultimately each of these imports should be in separate files
import bountiesReducer from 'public-modules/Bounties';
import draftsReducer from 'public-modules/Drafts';
import leaderboardReducer from 'public-modules/Leaderboard';
import userInfoReducer from 'public-modules/UserInfo';
import statsReducer from 'public-modules/Stats';
import categoriesReducer from 'public-modules/Categories';
import skillsReducer from 'public-modules/Skills';
import languagesReducer from 'public-modules/Languages';
import authenticationReducer from 'public-modules/Authentication';
import bountyReducer from 'public-modules/Bounty';
import fileUploadRducer from 'public-modules/FileUpload';
import clientReducer from 'public-modules/Client';
import settingsReducer from 'public-modules/Settings';
import transactionReducer from 'public-modules/Transaction';
import notificationReducer from 'public-modules/Notification';
import fulfillmentsReducer from 'public-modules/Fulfillments';
import fulfillmentReducer from 'public-modules/Fulfillment';
import commentsReducer from 'public-modules/Comments';
import reviewReducer from 'public-modules/Review';

export const reducers = {
  bounties: bountiesReducer,
  drafts: draftsReducer,
  leaderboard: leaderboardReducer,
  userInfo: userInfoReducer,
  stats: statsReducer,
  categories: categoriesReducer,
  skills: skillsReducer,
  languages: languagesReducer,
  authentication: authenticationReducer,
  bounty: bountyReducer,
  fileUpload: fileUploadRducer,
  client: clientReducer,
  settings: settingsReducer,
  notification: notificationReducer,
  fulfillments: fulfillmentsReducer,
  fulfillment: fulfillmentReducer,
  transaction: transactionReducer,
  comments: commentsReducer,
  review: reviewReducer
};

import bountiesSagas from 'public-modules/Bounties/sagas';
import draftsSagas from 'public-modules/Drafts/sagas';
import leaderboardSagas from 'public-modules/Leaderboard/sagas';
import userInfoSagas from 'public-modules/UserInfo/sagas';
import statsSagas from 'public-modules/Stats/sagas';
import categoriesSagas from 'public-modules/Categories/sagas';
import skillsSagas from 'public-modules/Skills/sagas';
import languagesSagas from 'public-modules/Languages/sagas';
import authenticationSagas from 'public-modules/Authentication/sagas';
import bountySagas from 'public-modules/Bounty/sagas';
import fileUploadSagas from 'public-modules/FileUpload/sagas';
import clientSagas from 'public-modules/Client/sagas';
import settingsSagas from 'public-modules/Settings/sagas';
import transactionSagas from 'public-modules/Transaction/sagas';
import notificationSagas from 'public-modules/Notification/sagas';
import fulfillmentsSagas from 'public-modules/Fulfillments/sagas';
import fulfillmentSagas from 'public-modules/Fulfillment/sagas';
import commentsSagas from 'public-modules/Comments/sagas';
import reviewSagas from 'public-modules/Review/sagas';

export const sagaWatchers = [
  ...leaderboardSagas,
  ...bountiesSagas,
  ...draftsSagas,
  ...userInfoSagas,
  ...statsSagas,
  ...categoriesSagas,
  ...skillsSagas,
  ...languagesSagas,
  ...authenticationSagas,
  ...bountySagas,
  ...fileUploadSagas,
  ...clientSagas,
  ...settingsSagas,
  ...transactionSagas,
  ...notificationSagas,
  ...fulfillmentsSagas,
  ...fulfillmentSagas,
  ...commentsSagas,
  ...reviewSagas
];
