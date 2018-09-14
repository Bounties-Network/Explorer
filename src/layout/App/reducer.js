import { LOCATION_CHANGE } from 'react-router-redux';
import { actionTypes as clientActionTypes } from 'public-modules/Client';

const defaultConfig = {
  rootConfig: null,
  resetFilters: null,
  defaultStageFilters: null
};

const initialState = {
  locationNonce: 0,
  showFilterNav: false,
  filterConfig: { ...defaultConfig }
};

const INITIALIZE_FILTER_NAV = 'app/INITIALIZE_FILTER_NAV';
const SHOW_FILTER_NAV = 'app/SHOW_FILTER_NAV';
const HIDE_FILTER_NAV = 'app/HIDE_FILTER_NAV';
const RESET_FILTER_NAV = 'app/RESET_FILTER_NAV';

function initializeFilterNav(config) {
  return { type: INITIALIZE_FILTER_NAV, config };
}

function showFilterNav() {
  return { type: SHOW_FILTER_NAV };
}

function hideFilterNav() {
  return { type: HIDE_FILTER_NAV };
}

function resetFilterNav() {
  return { type: RESET_FILTER_NAV };
}

/* In order to do async validation within redux forms, we must return a
promise that resolves once the saga has completed the validation. To keep the
public modules clean we are hijacking the GET_TOKEN_BALANCE action and passing
the promise's resolve and reject to the saga to be completed as soon as the
success action is dispatched. */
const { GET_TOKEN_BALANCE } = clientActionTypes;

function getTokenBalance(address, resolve, reject) {
  return { type: GET_TOKEN_BALANCE, address, resolve, reject };
}

function AppReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_FILTER_NAV: {
      return {
        ...state,
        showFilterNav: false,
        filterConfig: { ...defaultConfig }
      };
    }
    case INITIALIZE_FILTER_NAV: {
      const { config } = action;

      return {
        ...state,
        showFilterNav: false,
        filterConfig: config
      };
    }
    case SHOW_FILTER_NAV: {
      return {
        ...state,
        showFilterNav: true
      };
    }
    case HIDE_FILTER_NAV: {
      return {
        ...state,
        showFilterNav: false
      };
    }
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

export const actionTypes = {
  INITIALIZE_FILTER_NAV,
  SHOW_FILTER_NAV,
  HIDE_FILTER_NAV,
  RESET_FILTER_NAV,
  GET_TOKEN_BALANCE
};

export const actions = {
  initializeFilterNav,
  hideFilterNav,
  showFilterNav,
  resetFilterNav,
  getTokenBalance
};

export default AppReducer;
