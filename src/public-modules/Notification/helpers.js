export const deserializeNotification = notificationItem => {
  const {
    notification: { from_user, notification_name },
    data: { link, bounty_title },
    viewed,
    created,
    id
  } = notificationItem;
  return {
    from_user,
    notification_name,
    // make link relative
    link: link.replace(/^.*\/\/[^\/]+/, ''),
    bounty_title,
    created,
    viewed,
    id
  };
};
