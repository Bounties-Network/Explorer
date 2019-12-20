/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: platformStatistics
// ====================================================

export interface platformStatistics_activePlatformBountiesQuery_aggregate {
  __typename: "std_bounties_bounty_aggregate_fields";
  count: number | null;
}

export interface platformStatistics_activePlatformBountiesQuery {
  __typename: "std_bounties_bounty_aggregate";
  aggregate: platformStatistics_activePlatformBountiesQuery_aggregate | null;
}

export interface platformStatistics_issuedPlatformBountiesQuery_aggregate {
  __typename: "std_bounties_bounty_aggregate_fields";
  count: number | null;
}

export interface platformStatistics_issuedPlatformBountiesQuery {
  __typename: "std_bounties_bounty_aggregate";
  aggregate: platformStatistics_issuedPlatformBountiesQuery_aggregate | null;
}

export interface platformStatistics_totalValueBountiesIssuedQuery_aggregate_sum {
  __typename: "std_bounties_bounty_sum_fields";
  usd_price: any | null;
}

export interface platformStatistics_totalValueBountiesIssuedQuery_aggregate {
  __typename: "std_bounties_bounty_aggregate_fields";
  sum: platformStatistics_totalValueBountiesIssuedQuery_aggregate_sum | null;
}

export interface platformStatistics_totalValueBountiesIssuedQuery {
  __typename: "std_bounties_bounty_aggregate";
  aggregate: platformStatistics_totalValueBountiesIssuedQuery_aggregate | null;
}

export interface platformStatistics {
  /**
   * fetch aggregated fields from the table: "std_bounties_bounty"
   */
  activePlatformBountiesQuery: platformStatistics_activePlatformBountiesQuery;
  /**
   * fetch aggregated fields from the table: "std_bounties_bounty"
   */
  issuedPlatformBountiesQuery: platformStatistics_issuedPlatformBountiesQuery;
  /**
   * fetch aggregated fields from the table: "std_bounties_bounty"
   */
  totalValueBountiesIssuedQuery: platformStatistics_totalValueBountiesIssuedQuery;
}
