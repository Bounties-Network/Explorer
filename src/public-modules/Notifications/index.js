const initialState = {
  notifications: [],
  count: 0,
  error: false,
  loadMoreError: false,
  loadingMore: false
};

const LOAD_NOTIFICATIONS = 'notifications/LOAD_NOTIFICATIONS';
const LOAD_NOTIFICATIONS_SUCCESS = 'notifications/LOAD_NOTIFICATIONS_SUCCESS';
const LOAD_NOTIFICATIONS_FAIL = 'notifications/LOAD_NOTIFICATIONS_FAIL';
const LOAD_MORE_NOTIFICATIONS = 'notifications/LOAD_NOTIFICATIONS';
const LOAD_MORE_NOTIFICATIONS_SUCCESS =
  'notifications/LOAD_NOTIFICATIONS_SUCCESS';
const LOAD_MORE_NOTIFICATIONS_FAIL = 'notifications/LOAD_NOTIFICATIONS_FAIL';

function loadNotifications() {
  return { type: LOAD_NOTIFICATIONS };
}

function loadNotificationsSuccess(notifications, count) {
  return { type: LOAD_NOTIFICATIONS_SUCCESS, notifications, count };
}

function loadNotificationsFail() {
  return { type: LOAD_NOTIFICATIONS_FAIL };
}

function loadMoreNotifications() {
  return { type: LOAD_NOTIFICATIONS };
}

function loadMoreNotificationsSuccess(notifications, count) {
  return { type: LOAD_NOTIFICATIONS_SUCCESS, notifications };
}

function loadMoreNotificationsFail() {
  return { type: LOAD_NOTIFICATIONS_FAIL };
}

const SET_NOTIFICATION_VIEWED = 'notifications/SET_NOTIFICATION_VIEWED';

function setNotificationViewed(notificationId) {
  return { type: SET_NOTIFICATION_VIEWED, notificationId };
}

function NotificationsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_NOTIFICATIONS_SUCCESS: {
      const { notifications, count } = action;

      return {
        ...state,
        error: false,
        notifications,
        count
      };
    }
    case LOAD_NOTIFICATIONS_FAIL: {
      return {
        ...state,
        error: true
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
  setNotificationViewed
};

export const actionTypes = {
  LOAD_NOTIFICATIONS,
  LOAD_NOTIFICATIONS_SUCCESS,
  LOAD_NOTIFICATIONS_FAIL,
  LOAD_MORE_NOTIFICATIONS,
  LOAD_MORE_NOTIFICATIONS_SUCCESS,
  LOAD_MORE_NOTIFICATIONS_FAIL,
  SET_NOTIFICATION_VIEWED
};

export default NotificationsReducer;
