import explorerSagas from 'containers/Explorer/sagas';
import profileSagas from 'containers/Profile/sagas';
import bountySagas from 'containers/CreateBounty/sagas';
import bountyPageUISagas from 'containers/Bounty/sagas';
import loginSagas from 'containers/Login/sagas';
import dashboardSagas from 'containers/Dashboard/sagas';

// Sagas not from public-modules
const sagaWatchers = [
  ...profileSagas,
  ...explorerSagas,
  ...bountySagas,
  ...dashboardSagas,
  ...bountyPageUISagas,
  ...loginSagas
];

export default sagaWatchers;
