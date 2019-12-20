/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: fulfillerLeaderboard
// ====================================================

export interface fulfillerLeaderboard_std_bounties_token {
  __typename: "std_bounties_token";
  name: string;
  price_usd: any | null;
}

export interface fulfillerLeaderboard_user_user_std_bounties_fulfillments_aggregate_aggregate_sum {
  __typename: "std_bounties_fulfillment_sum_fields";
  usd_price: any | null;
}

export interface fulfillerLeaderboard_user_user_std_bounties_fulfillments_aggregate_aggregate {
  __typename: "std_bounties_fulfillment_aggregate_fields";
  sum: fulfillerLeaderboard_user_user_std_bounties_fulfillments_aggregate_aggregate_sum | null;
}

export interface fulfillerLeaderboard_user_user_std_bounties_fulfillments_aggregate {
  __typename: "std_bounties_fulfillment_aggregate";
  aggregate: fulfillerLeaderboard_user_user_std_bounties_fulfillments_aggregate_aggregate | null;
}

export interface fulfillerLeaderboard_user_user {
  __typename: "user_user";
  name: string;
  small_profile_image_url: string;
  public_address: string;
  /**
   * An aggregated array relationship
   */
  std_bounties_fulfillments_aggregate: fulfillerLeaderboard_user_user_std_bounties_fulfillments_aggregate;
}

export interface fulfillerLeaderboard {
  /**
   * fetch data from the table: "std_bounties_token"
   */
  std_bounties_token: fulfillerLeaderboard_std_bounties_token[];
  /**
   * fetch data from the table: "user_user"
   */
  user_user: fulfillerLeaderboard_user_user[];
}

export interface fulfillerLeaderboardVariables {
  offset?: number | null;
  limit?: number | null;
}
