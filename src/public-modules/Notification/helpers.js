export const deserializeNotification = notificationItem => {
  const {
    notification: { from_user, notification_name, notification_created },
    data: { link, bounty_title },
    viewed,
    id
  } = notificationItem;
  return {
    from_user,
    notification_name,
    // make link relative
    link: link.replace(/^.*\/\/[^\/]+/, ''),
    bounty_title,
    created: notification_created,
    viewed,
    id
  };
};
