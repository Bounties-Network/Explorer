import bountiesPanelSagas from './components/BountiesPanel/sagas';
import submissionsPanelSagas from './components/SubmissionsPanel/sagas';

const sagaWatchers = [...bountiesPanelSagas, ...submissionsPanelSagas];

export default sagaWatchers;
