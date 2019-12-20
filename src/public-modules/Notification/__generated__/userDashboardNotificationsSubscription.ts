/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: userDashboardNotificationsSubscription
// ====================================================

export interface userDashboardNotificationsSubscription_notifications_dashboardnotification_notifications_notification {
  __typename: "notifications_notification";
  notification_name: number;
  notification_created: any;
  from_user_id: number | null;
  platform: string;
}

export interface userDashboardNotificationsSubscription_notifications_dashboardnotification {
  __typename: "notifications_dashboardnotification";
  id: number;
  is_activity: boolean;
  created: any;
  data: any | null;
  string_data: string;
  viewed: boolean;
  /**
   * An object relationship
   */
  notifications_notification: userDashboardNotificationsSubscription_notifications_dashboardnotification_notifications_notification;
}

export interface userDashboardNotificationsSubscription {
  /**
   * fetch data from the table: "notifications_dashboardnotification"
   */
  notifications_dashboardnotification: userDashboardNotificationsSubscription_notifications_dashboardnotification[];
}

export interface userDashboardNotificationsSubscriptionVariables {
  platforms?: string[] | null;
  offset?: number | null;
}
