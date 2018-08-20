const initialState = {
  currentTab: 'received'
};

const LOAD_SUBMISSIONS_PANEL =
  'dashboardUI/submissionsPanel/LOAD_SUBMISSIONS_PANEL';
const SET_ACTIVE_TAB = 'dashboardUI/submissionsPanel/SET_ACTIVE_TAB';

const loadSubmissionsPanel = () => {
  return { type: LOAD_SUBMISSIONS_PANEL };
};

const setActiveTab = tabKey => {
  return { type: SET_ACTIVE_TAB, tabKey };
};

function submissionsPanelReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_TAB: {
      const { tabKey } = action;

      return {
        ...state,
        currentTab: tabKey
      };
    }
    default: {
      return state;
    }
  }
}

export const actions = { loadSubmissionsPanel, setActiveTab };
export const actionTypes = { LOAD_SUBMISSIONS_PANEL, SET_ACTIVE_TAB };
export default submissionsPanelReducer;
