import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = {
  locationNonce: 0
};

function AppReducer(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE: {
      return {
        ...state,
        locationNonce: state.locationNonce + 1
      };
    }
    default:
      return state;
  }
}

export default AppReducer;
