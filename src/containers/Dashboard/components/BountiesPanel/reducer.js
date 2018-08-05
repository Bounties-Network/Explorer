const initialState = {
  currentTab: 'active'
};

const LOAD_BOUNTIES_PANEL = 'dashboardUI/bountiesPanel/LOAD_BOUNTIES_PANEL';
const SET_ACTIVE_TAB = 'dashboardUI/bountiesPanel/SET_ACTIVE_TAB';

const loadBountiesPanel = () => {
  return { type: LOAD_BOUNTIES_PANEL };
};

const setActiveTab = tabKey => {
  return { type: SET_ACTIVE_TAB, tabKey };
};

function bountiesPanelReducer(state = initialState, action) {
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

export const actions = { loadBountiesPanel, setActiveTab };
export const actionTypes = { LOAD_BOUNTIES_PANEL, SET_ACTIVE_TAB };
export default bountiesPanelReducer;
