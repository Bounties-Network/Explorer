/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: issuerLeaderboard
// ====================================================

export interface issuerLeaderboard_std_bounties_token {
  __typename: "std_bounties_token";
  name: string;
  price_usd: any | null;
}

export interface issuerLeaderboard_user_user_std_bounties_bounties_aggregate_aggregate_sum {
  __typename: "std_bounties_bounty_sum_fields";
  usd_price: any | null;
}

export interface issuerLeaderboard_user_user_std_bounties_bounties_aggregate_aggregate {
  __typename: "std_bounties_bounty_aggregate_fields";
  sum: issuerLeaderboard_user_user_std_bounties_bounties_aggregate_aggregate_sum | null;
}

export interface issuerLeaderboard_user_user_std_bounties_bounties_aggregate {
  __typename: "std_bounties_bounty_aggregate";
  aggregate: issuerLeaderboard_user_user_std_bounties_bounties_aggregate_aggregate | null;
}

export interface issuerLeaderboard_user_user {
  __typename: "user_user";
  name: string;
  small_profile_image_url: string;
  public_address: string;
  /**
   * An aggregated array relationship
   */
  std_bounties_bounties_aggregate: issuerLeaderboard_user_user_std_bounties_bounties_aggregate;
}

export interface issuerLeaderboard {
  /**
   * fetch data from the table: "std_bounties_token"
   */
  std_bounties_token: issuerLeaderboard_std_bounties_token[];
  /**
   * fetch data from the table: "user_user"
   */
  user_user: issuerLeaderboard_user_user[];
}

export interface issuerLeaderboardVariables {
  offset?: number | null;
  limit?: number | null;
}
