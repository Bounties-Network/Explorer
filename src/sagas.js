import explorerSagas from 'containers/Explorer/sagas';
import profileSagas from 'containers/Profile/sagas';
import bountySagas from 'containers/CreateBounty/sagas';

// Sagas not from public-modules
export const sagaWatchers = [...profileSagas, ...explorerSagas, ...bountySagas];
