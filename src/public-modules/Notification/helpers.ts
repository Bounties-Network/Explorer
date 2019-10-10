import { userDashboardNotifications_notifications_dashboardnotification } from './__generated__/userDashboardNotifications';

export const deserializeNotification = (
  notificationItem: userDashboardNotifications_notifications_dashboardnotification
) => {
  const {
    notifications_notification: {
      from_user_id,
      notification_name,
      notification_created
    },
    data: { link, bounty_title },
    viewed,
    id
  } = notificationItem;
  return {
    from_user: from_user_id,
    notification_name,
    // make link relative
    link: link.replace(new RegExp('^.*//[^/]+'), ''),
    bounty_title,
    created: notification_created,
    viewed,
    id
  };
};
