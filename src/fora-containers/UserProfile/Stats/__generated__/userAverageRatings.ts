/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userAverageRatings
// ====================================================

export interface userAverageRatings_user_user_std_bounties_fulfillments {
  __typename: "std_bounties_fulfillment";
  accepted: boolean;
}

export interface userAverageRatings_user_user_std_bounties_fulfillments_aggregate_aggregate {
  __typename: "std_bounties_fulfillment_aggregate_fields";
  count: number | null;
}

export interface userAverageRatings_user_user_std_bounties_fulfillments_aggregate {
  __typename: "std_bounties_fulfillment_aggregate";
  aggregate: userAverageRatings_user_user_std_bounties_fulfillments_aggregate_aggregate | null;
}

export interface userAverageRatings_user_user_std_bounties_bounties_std_bounties_fulfillments_aggregate_aggregate {
  __typename: "std_bounties_fulfillment_aggregate_fields";
  count: number | null;
}

export interface userAverageRatings_user_user_std_bounties_bounties_std_bounties_fulfillments_aggregate {
  __typename: "std_bounties_fulfillment_aggregate";
  aggregate: userAverageRatings_user_user_std_bounties_bounties_std_bounties_fulfillments_aggregate_aggregate | null;
}

export interface userAverageRatings_user_user_std_bounties_bounties {
  __typename: "std_bounties_bounty";
  /**
   * An aggregated array relationship
   */
  std_bounties_fulfillments_aggregate: userAverageRatings_user_user_std_bounties_bounties_std_bounties_fulfillments_aggregate;
}

export interface userAverageRatings_user_user_std_bounties_bounties_aggregate_nodes_std_bounties_fulfillments_aggregate_aggregate {
  __typename: "std_bounties_fulfillment_aggregate_fields";
  count: number | null;
}

export interface userAverageRatings_user_user_std_bounties_bounties_aggregate_nodes_std_bounties_fulfillments_aggregate {
  __typename: "std_bounties_fulfillment_aggregate";
  aggregate: userAverageRatings_user_user_std_bounties_bounties_aggregate_nodes_std_bounties_fulfillments_aggregate_aggregate | null;
}

export interface userAverageRatings_user_user_std_bounties_bounties_aggregate_nodes {
  __typename: "std_bounties_bounty";
  /**
   * An aggregated array relationship
   */
  std_bounties_fulfillments_aggregate: userAverageRatings_user_user_std_bounties_bounties_aggregate_nodes_std_bounties_fulfillments_aggregate;
}

export interface userAverageRatings_user_user_std_bounties_bounties_aggregate {
  __typename: "std_bounties_bounty_aggregate";
  nodes: userAverageRatings_user_user_std_bounties_bounties_aggregate_nodes[];
}

export interface userAverageRatings_user_user_stdBountiesReviewsByReviewerId_aggregate_aggregate_avg {
  __typename: "std_bounties_review_avg_fields";
  rating: number | null;
}

export interface userAverageRatings_user_user_stdBountiesReviewsByReviewerId_aggregate_aggregate {
  __typename: "std_bounties_review_aggregate_fields";
  avg: userAverageRatings_user_user_stdBountiesReviewsByReviewerId_aggregate_aggregate_avg | null;
}

export interface userAverageRatings_user_user_stdBountiesReviewsByReviewerId_aggregate {
  __typename: "std_bounties_review_aggregate";
  aggregate: userAverageRatings_user_user_stdBountiesReviewsByReviewerId_aggregate_aggregate | null;
}

export interface userAverageRatings_user_user_std_bounties_reviews_aggregate_aggregate_avg {
  __typename: "std_bounties_review_avg_fields";
  rating: number | null;
}

export interface userAverageRatings_user_user_std_bounties_reviews_aggregate_aggregate {
  __typename: "std_bounties_review_aggregate_fields";
  avg: userAverageRatings_user_user_std_bounties_reviews_aggregate_aggregate_avg | null;
}

export interface userAverageRatings_user_user_std_bounties_reviews_aggregate {
  __typename: "std_bounties_review_aggregate";
  aggregate: userAverageRatings_user_user_std_bounties_reviews_aggregate_aggregate | null;
}

export interface userAverageRatings_user_user {
  __typename: "user_user";
  /**
   * An array relationship
   */
  std_bounties_fulfillments: userAverageRatings_user_user_std_bounties_fulfillments[];
  /**
   * An aggregated array relationship
   */
  std_bounties_fulfillments_aggregate: userAverageRatings_user_user_std_bounties_fulfillments_aggregate;
  /**
   * An array relationship
   */
  std_bounties_bounties: userAverageRatings_user_user_std_bounties_bounties[];
  /**
   * An aggregated array relationship
   */
  std_bounties_bounties_aggregate: userAverageRatings_user_user_std_bounties_bounties_aggregate;
  /**
   * An aggregated array relationship
   */
  stdBountiesReviewsByReviewerId_aggregate: userAverageRatings_user_user_stdBountiesReviewsByReviewerId_aggregate;
  /**
   * An aggregated array relationship
   */
  std_bounties_reviews_aggregate: userAverageRatings_user_user_std_bounties_reviews_aggregate;
}

export interface userAverageRatings {
  /**
   * fetch data from the table: "user_user"
   */
  user_user: userAverageRatings_user_user[];
}

export interface userAverageRatingsVariables {
  address: string;
}
