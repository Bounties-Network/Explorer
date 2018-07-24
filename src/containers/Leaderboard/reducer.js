const initialState = {
  toggleValue: 'fulfiller'
};

const LEADERBOARD_TOGGLE = 'leaderboard/LEADERBOARD_TOGGLE';

function leaderboardToggle() {
  return { type: LEADERBOARD_TOGGLE };
}

function leaderboardUIReducer(state = initialState, action) {
  switch (action.type) {
    case LEADERBOARD_TOGGLE: {
      const toggleValue =
        state.toggleValue === 'fulfiller' ? 'issuer' : 'fulfiller';

      return {
        ...state,
        toggleValue
      };
    }
    default:
      return state;
  }
}

export const actions = {
  leaderboardToggle
};

export const actionTypes = {
  LEADERBOARD_TOGGLE
};

export default leaderboardUIReducer;
