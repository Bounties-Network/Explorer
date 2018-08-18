import { createSelector } from 'reselect';
import { values, orderBy } from 'lodash';

export const rootNotificationSelector = state => state.notification;

export const notificationsSelector = createSelector(
  rootNotificationSelector,
  rootNotification => rootNotification.notifications
);

export const notificationsListSelector = createSelector(
  rootNotificationSelector,
  rootNotification => {
    return orderBy(['id'], ['desc'], values(rootNotification.notifications));
  }
);
