import profileSagas from 'containers/Profile/sagas';
import bountySagas from 'containers/CreateBounty/sagas';
import bountyPageUISagas from 'containers/Bounty/sagas';
import loginSagas from 'containers/Login/sagas';
import dashboardSagas from 'containers/Dashboard/sagas';
import settingsSagas from 'containers/Settings/sagas';
import bountiesPanelSagas from 'containers/BountiesPanel/sagas';
import submissionsPanelSagas from 'containers/SubmissionsPanel/sagas';

// Sagas not from public-modules
const sagaWatchers = [
  ...profileSagas,
  ...bountySagas,
  ...dashboardSagas,
  ...bountyPageUISagas,
  ...loginSagas,
  ...settingsSagas,
  ...bountiesPanelSagas,
  ...submissionsPanelSagas
];

export default sagaWatchers;
