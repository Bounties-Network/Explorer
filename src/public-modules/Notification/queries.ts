import gql from 'graphql-tag';

const userDashboardNotificationsSubscription = gql`
  subscription userDashboardNotifications(
    $platforms: [String!]
    $offset: Int = 0
  ) {
    notifications_dashboardnotification(
      order_by: { notifications_notification: { created: asc } }
      offset: $offset
      limit: 25
      where: {
        is_activity: { _eq: true }
        _and: { notifications_notification: { platform: { _in: $platforms } } }
      }
    ) {
      id
      is_activity
      created
      data
      string_data
      viewed
      notifications_notification {
        notification_name
        notification_created
        from_user_id
        platform
      }
    }
  }
`;

const userDashboardNotificationsQuery = gql`
  query userDashboardNotifications($platforms: [String!], $offset: Int = 0) {
    notifications_dashboardnotification(
      order_by: { notifications_notification: { created: asc } }
      offset: $offset
      limit: 25
      where: {
        is_activity: { _eq: true }
        _and: { notifications_notification: { platform: { _in: $platforms } } }
      }
    ) {
      id
      is_activity
      created
      data
      string_data
      viewed
      notifications_notification {
        notification_name
        notification_created
        from_user_id
        platform
      }
    }
  }
`;

/*
  {"data":{"notifications_dashboardnotification":[
    {"id":137,"is_activity":true,"created":"2019-09-30T16:50:45.850657+00:00","data":{"link": "https://explorer.bounties.network/bounty/65", "bounty_title": "proof of action test"},"string_data":"You issued a bounty for: proof of action test.","viewed":false,"notifications_notification":{"notification_name":6,"notification_created":"2019-09-30T15:06:11+00:00","from_user_id":8,"platform":"bounties-network","__typename":"notifications_notification"},"__typename":"notifications_dashboardnotification"}, 
    {"id":139,"is_activity":true,"created":"2019-09-30T16:50:49.05479+00:00","data":{"link": "https://explorer.bounties.network/bounty/65", "bounty_title": "proof of action test"},"string_data":"You contributed ETH 0.001000000000000000 to: proof of action test.","viewed":false,"notifications_notification":{"notification_name":8,"notification_created":"2019-09-30T16:50:49.020424+00:00","from_user_id":8,"platform":"bounties-network","__typename":"notifications_notification"},"__typename":"notifications_dashboardnotification"}]}}
*/
export {
  userDashboardNotificationsSubscription,
  userDashboardNotificationsQuery
};
