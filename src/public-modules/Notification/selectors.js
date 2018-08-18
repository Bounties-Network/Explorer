import { createSelector } from 'reselect';
import { values, orderBy, some } from 'lodash';

export const rootNotificationSelector = state => state.notification;

export const notificationsSelector = createSelector(
  rootNotificationSelector,
  rootNotification => rootNotification.notifications
);

export const notificationsListSelector = createSelector(
  rootNotificationSelector,
  rootNotification => {
    return (
      orderBy(['id'], ['desc'], values(rootNotification.notifications)) || []
    );
  }
);

export const hasUnreadNotifications = createSelector(
  notificationsListSelector,
  notifications => some(['viewed', false], notifications)
);
