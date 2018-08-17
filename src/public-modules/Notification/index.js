import { keyBy, map, mapValues } from 'lodash';
import { LIMIT } from './constants';
import { deserializeNotification } from './helpers';
import { actionTypes as authActionTypes } from 'public-modules/Authentication';

const { LOGOUT_SUCCESS } = authActionTypes;

const initialState = {
  loading: true,
  loaded: false,
  error: false,
  loadingMore: false,
  loadingMoreError: false,
  offset: 0,
  count: 0,
  notifications: {}
};

const LOAD_NOTIFICATIONS = 'notifications/LOAD_NOTIFICATIONS';
const LOAD_NOTIFICATIONS_SUCCESS = 'notifications/LOAD_NOTIFICATIONS_SUCCESS';
const LOAD_NOTIFICATIONS_FAIL = 'notifications/LOAD_NOTIFICATIONS_FAIL';

const LOAD_MORE_NOTIFICATIONS = 'notifications/LOAD_MORE_NOTIFICATIONS';
const LOAD_MORE_NOTIFICATIONS_SUCCESS =
  'notifications/LOAD_MORE_NOTIFICATIONS_SUCCESS';
const LOAD_MORE_NOTIFICATIONS_FAIL =
  'notifications/LOAD_MORE_NOTIFICATIONS_FAIL';

function loadNotifications(address) {
  return { type: LOAD_NOTIFICATIONS, address };
}

function loadNotificationsSuccess(count) {
  return {
    type: LOAD_NOTIFICATIONS_SUCCESS,
    count
  };
}

function loadNotificationsFail(error) {
  return { type: LOAD_NOTIFICATIONS_FAIL, error };
}

const LOAD_MORE_NOTIFICATIONS = 'notifications/LOAD_MORE_NOTIFICATIONS';
const LOAD_MORE_NOTIFICATIONS_SUCCESS =
  'notifications/LOAD_MORE_NOTIFICATIONS_SUCCESS';
const LOAD_MORE_NOTIFICATIONS_FAIL =
  'notifications/LOAD_MORE_NOTIFICATIONS_FAIL';

function loadMoreNotifications(address) {
  return { type: LOAD_MORE_NOTIFICATIONS, address };
}

function loadMoreNotificationsSuccess(notifications) {
  return {
    type: LOAD_MORE_NOTIFICATIONS_SUCCESS,
    notifications
  };
}

function loadMoreNotificationsFail(error) {
  return { type: LOAD_MORE_NOTIFICATIONS_FAIL, error };
}

function ManageNotificationReducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT_SUCCESS: {
      return {
        ...initialState
      };
    }
    case LOAD_NOTIFICATIONS: {
      return {
        ...state,
        loading: true,
        error: false
      };
    }
    case LOAD_NOTIFICATIONS_SUCCESS: {
      const { count } = action;

      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        count
      };
    }
    case LOAD_NOTIFICATIONS_FAIL: {
      return {
        ...state,
        loading: false,
        error: true
      };
    }
    case LOAD_MORE_NOTIFICATIONS: {
      return {
        ...state,
        loadingMore: true
      };
    }
    case LOAD_MORE_NOTIFICATIONS_SUCCESS: {
      const { notifications } = action;

      return {
        ...state,
        offset: state.offset + LIMIT,
        loadingMore: false,
        notifications: {
          ...keyBy('id', map(deserializeNotification, notifications)),
          ...state.notifications
        }
      };
    }
    case LOAD_MORE_NOTIFICATIONS_FAIL: {
      return {
        ...state,
        loadingMore: false,
        loadingMoreError: true
      };
    }
    case VIEW_ALL_NOTIFICATIONS:
    case SET_NOTIFICATION_VIEWED:
    case ADD_NOTIFICATION: {
      return {
        ...state,
        notifications: NotificationsReducer(state.notifications, action)
      };
    }
    default:
      return state;
  }
}

export const actions = {
  loadNotifications,
  loadNotificationsSuccess,
  loadNotificationsFail,
  loadMoreNotifications,
  loadMoreNotificationsSuccess,
  loadMoreNotificationsFail,
  addNotification,
  setNotificationViewed,
  viewAllNotifications
};

export const actionTypes = {
  LOAD_NOTIFICATIONS,
  LOAD_NOTIFICATIONS_SUCCESS,
  LOAD_NOTIFICATIONS_FAIL,
  LOAD_MORE_NOTIFICATIONS,
  LOAD_MORE_NOTIFICATIONS_SUCCESS,
  LOAD_MORE_NOTIFICATIONS_FAIL,
  ADD_NOTIFICATION,
  SET_NOTIFICATION_VIEWED,
  VIEW_ALL_NOTIFICATIONS
};

export default ManageNotificationReducer;
