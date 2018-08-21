import bountiesPanelSagas from 'containers/BountiesPanel/sagas';
import submissionsPanelSagas from 'containers/SubmissionsPanel/sagas';

const sagaWatchers = [...bountiesPanelSagas, ...submissionsPanelSagas];

export default sagaWatchers;
