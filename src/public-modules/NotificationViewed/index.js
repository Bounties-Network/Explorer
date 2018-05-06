const initialState = {
  loading: true,
  loaded: false,
  error: false,
  notification: {}
};

const LOAD_NOTIFICATIONVIEWED = 'notificationViewed/LOAD_NOTIFICATIONVIEWED';
const LOAD_NOTIFICATIONVIEWED_SUCCESS =
  'notificationViewed/LOAD_NOTIFICATIONVIEWED_SUCCESS';
const LOAD_NOTIFICATIONVIEWED_FAIL =
  'notificationViewed/LOAD_NOTIFICATIONVIEWED_FAIL';

function loadNotificationViewed(notificationId) {
  return { type: LOAD_NOTIFICATIONVIEWED, notificationId };
}

function loadNotificationViewedSuccess(notification) {
  return {
    type: LOAD_NOTIFICATIONVIEWED_SUCCESS,
    notification
  };
}

function loadNotificationViewedFail(error) {
  return { type: LOAD_NOTIFICATIONVIEWED_FAIL, error };
}

function NotificationViewedReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_NOTIFICATIONVIEWED: {
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false
      };
    }
    case LOAD_NOTIFICATIONVIEWED_SUCCESS: {
      const { notification } = action;

      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        notification
      };
    }
    case LOAD_NOTIFICATIONVIEWED_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: true
      };
    }
    default:
      return state;
  }
}

export const actions = {
  loadNotificationViewed,
  loadNotificationViewedSuccess,
  loadNotificationViewedFail
};

export const actionTypes = {
  LOAD_NOTIFICATIONVIEWED,
  LOAD_NOTIFICATIONVIEWED_SUCCESS,
  LOAD_NOTIFICATIONVIEWED_FAIL
};

export default NotificationViewedReducer;
