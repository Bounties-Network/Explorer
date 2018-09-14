import profileSagas from 'containers/Profile/sagas';
import bountySagas from 'containers/CreateBounty/sagas';
import bountyPageUISagas from 'containers/Bounty/sagas';
import loginSagas from 'containers/Login/sagas';
import settingsSagas from 'containers/Settings/sagas';
import submissionsPanelSagas from 'containers/SubmissionsPanel/sagas';
import appSagas from 'layout/App/sagas';

// Sagas not from public-modules
const sagaWatchers = [
  ...profileSagas,
  ...bountySagas,
  ...bountyPageUISagas,
  ...loginSagas,
  ...settingsSagas,
  ...submissionsPanelSagas,
  ...appSagas
];

export default sagaWatchers;
