const initialState = {
  loading: true,
  loaded: false,
  error: false,
  loadingMore: false,
  loadingMoreError: false,
  offset: 0,
  count: 0,
  notifications: []
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

function loadNotificationsSuccess(notifications, count) {
  return {
    type: LOAD_NOTIFICATIONS_SUCCESS,
    notifications,
    count
  };
}

function loadNotificationsFail(error) {
  return { type: LOAD_NOTIFICATIONS_FAIL, error };
}

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

function NotificationReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_NOTIFICATIONS: {
      return {
        ...state,
        loading: true,
        loaded: false,
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
        notifications,
        count
      };
    }
    case LOAD_NOTIFICATIONS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: true
      };
    }
    case LOAD_MORE_NOTIFICATIONS: {
      return {
        ...state,
        loadingMore: true,
        loadingMoreError: false
      };
    }
    case LOAD_MORE_NOTIFICATIONS_SUCCESS: {
      const { notifications, count } = action;

      return {
        ...state,
        loadingMore: false,
        notifications: [...state.notifications, ...notifications]
      };
    }
    case LOAD_MORE_NOTIFICATIONS_FAIL: {
      return {
        ...state,
        loadingMore: false,
        loadingMoreError: true
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
  loadMoreNotificationsFail
};

export const actionTypes = {
  LOAD_NOTIFICATIONS,
  LOAD_NOTIFICATIONS_SUCCESS,
  LOAD_NOTIFICATIONS_FAIL,
  LOAD_MORE_NOTIFICATIONS,
  LOAD_MORE_NOTIFICATIONS_SUCCESS,
  LOAD_MORE_NOTIFICATIONS_FAIL
};

export default NotificationReducer;
