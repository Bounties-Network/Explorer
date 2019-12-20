/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userProfileSubmissions
// ====================================================

export interface userProfileSubmissions_std_bounties_fulfillment_user_user {
  __typename: "user_user";
  name: string;
  small_profile_image_url: string;
  public_address: string;
}

export interface userProfileSubmissions_std_bounties_fulfillment_std_bounties_fulfillment_comments_std_bounties_comment_user_user {
  __typename: "user_user";
  name: string;
  public_address: string;
  small_profile_image_url: string;
}

export interface userProfileSubmissions_std_bounties_fulfillment_std_bounties_fulfillment_comments_std_bounties_comment {
  __typename: "std_bounties_comment";
  id: number;
  text: string;
  modified: any;
  /**
   * An object relationship
   */
  user_user: userProfileSubmissions_std_bounties_fulfillment_std_bounties_fulfillment_comments_std_bounties_comment_user_user;
}

export interface userProfileSubmissions_std_bounties_fulfillment_std_bounties_fulfillment_comments {
  __typename: "std_bounties_fulfillment_comments";
  /**
   * An object relationship
   */
  std_bounties_comment: userProfileSubmissions_std_bounties_fulfillment_std_bounties_fulfillment_comments_std_bounties_comment;
}

export interface userProfileSubmissions_std_bounties_fulfillment_std_bounties_bounty_std_bounties_fulfillments_aggregate_aggregate {
  __typename: "std_bounties_fulfillment_aggregate_fields";
  count: number | null;
}

export interface userProfileSubmissions_std_bounties_fulfillment_std_bounties_bounty_std_bounties_fulfillments_aggregate {
  __typename: "std_bounties_fulfillment_aggregate";
  aggregate: userProfileSubmissions_std_bounties_fulfillment_std_bounties_bounty_std_bounties_fulfillments_aggregate_aggregate | null;
}

export interface userProfileSubmissions_std_bounties_fulfillment_std_bounties_bounty {
  __typename: "std_bounties_bounty";
  id: number;
  title: string;
  deadline: any;
  /**
   * An aggregated array relationship
   */
  std_bounties_fulfillments_aggregate: userProfileSubmissions_std_bounties_fulfillment_std_bounties_bounty_std_bounties_fulfillments_aggregate;
  bounty_stage: number;
  usd_price: any;
  calculated_fulfillment_amount: any | null;
}

export interface userProfileSubmissions_std_bounties_fulfillment {
  __typename: "std_bounties_fulfillment";
  id: number;
  url: string;
  description: string;
  modified: any;
  accepted: boolean;
  /**
   * An object relationship
   */
  user_user: userProfileSubmissions_std_bounties_fulfillment_user_user | null;
  /**
   * An array relationship
   */
  std_bounties_fulfillment_comments: userProfileSubmissions_std_bounties_fulfillment_std_bounties_fulfillment_comments[];
  /**
   * An object relationship
   */
  std_bounties_bounty: userProfileSubmissions_std_bounties_fulfillment_std_bounties_bounty;
}

export interface userProfileSubmissions {
  /**
   * fetch data from the table: "std_bounties_fulfillment"
   */
  std_bounties_fulfillment: userProfileSubmissions_std_bounties_fulfillment[];
}

export interface userProfileSubmissionsVariables {
  address: string;
}
