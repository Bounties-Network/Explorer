import explorerSagas from 'containers/Explorer/sagas';
import profileSagas from 'containers/Profile/sagas';
import bountySagas from 'containers/CreateBounty/sagas';
import loginSagas from 'containers/Login/sagas';

// Sagas not from public-modules
const sagaWatchers = [
  ...profileSagas,
  ...explorerSagas,
  ...bountySagas,
  ...loginSagas
];

export default sagaWatchers;
