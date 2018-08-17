import { keyBy } from 'lodash';

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

const SET_NOTIFICATION_VIEWED = 'notification/SET_NOTIFICATION_VIEWED';

function setNotificationViewed(id) {
  return { type: SET_NOTIFICATION_VIEWED, id };
}

function NotificationReducer(state = {}, action) {
  switch (action.type) {
    case SET_NOTIFICATION_VIEWED: {
      return {
        ...state,
        viewed: true
      };
    }
    default:
      return state;
  }
}

const ADD_NOTIFICATION = 'notification/ADD_NOTIFICATION';

function addNotification(notification) {
  return { type: ADD_NOTIFICATION, notification };
}

function NotificationsReducer(state = {}, action) {
  switch (action.type) {
    case ADD_NOTIFICATION: {
      const { notification } = action;

      return {
        ...state,
        [notification.id]: notification
      };
    }
    case SET_NOTIFICATION_VIEWED: {
      const { id } = action;

      return {
        ...state,
        [id]: NotificationReducer(state[id], action)
      };
    }
    default:
      return state;
  }
}

const LOAD_NOTIFICATIONS = 'notifications/LOAD_NOTIFICATIONS';
const LOAD_NOTIFICATIONS_SUCCESS = 'notifications/LOAD_NOTIFICATIONS_SUCCESS';
const LOAD_NOTIFICATIONS_FAIL = 'notifications/LOAD_NOTIFICATIONS_FAIL';

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

function loadMoreNotificationsSuccess(notifications, count) {
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
    case LOAD_NOTIFICATIONS: {
      return {
        ...state,
        loading: true,
        error: false
      };
    }
    case LOAD_NOTIFICATIONS_SUCCESS: {
      const { notifications, count } = action;

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
      const { notifications, count } = action;

      return {
        ...state,
        loadingMore: false,
        count,
        notifications: {
          ...keyBy('id', notifications),
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
  setNotificationViewed
};

export const actionTypes = {
  LOAD_NOTIFICATIONS,
  LOAD_NOTIFICATIONS_SUCCESS,
  LOAD_NOTIFICATIONS_FAIL,
  LOAD_MORE_NOTIFICATIONS,
  LOAD_MORE_NOTIFICATIONS_SUCCESS,
  LOAD_MORE_NOTIFICATIONS_FAIL,
  ADD_NOTIFICATION,
  SET_NOTIFICATION_VIEWED
};

export default ManageNotificationReducer;
