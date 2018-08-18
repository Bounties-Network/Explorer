import { createSelector } from 'reselect';

export const rootNotificationSelector = state => state.notification;

export const notificationsSelector = createSelector(
  rootNotificationSelector,
  rootNotification => rootNotification.notifications
);
