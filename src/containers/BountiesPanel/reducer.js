const initialState = {
  currentTab: 'active'
};

const SET_ACTIVE_TAB = 'dashboardUI/bountiesPanel/SET_ACTIVE_TAB';

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

export const actions = { setActiveTab };
export const actionTypes = { SET_ACTIVE_TAB };
export default bountiesPanelReducer;
