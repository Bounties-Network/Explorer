/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userProfileBounties
// ====================================================

export interface userProfileBounties_std_bounties_bounty_std_bounties_fulfillments_aggregate_aggregate {
  __typename: "std_bounties_fulfillment_aggregate_fields";
  count: number | null;
}

export interface userProfileBounties_std_bounties_bounty_std_bounties_fulfillments_aggregate {
  __typename: "std_bounties_fulfillment_aggregate";
  aggregate: userProfileBounties_std_bounties_bounty_std_bounties_fulfillments_aggregate_aggregate | null;
}

export interface userProfileBounties_std_bounties_bounty {
  __typename: "std_bounties_bounty";
  id: number;
  title: string;
  deadline: any;
  /**
   * An aggregated array relationship
   */
  std_bounties_fulfillments_aggregate: userProfileBounties_std_bounties_bounty_std_bounties_fulfillments_aggregate;
  bounty_stage: number;
  usd_price: any;
  calculated_fulfillment_amount: any | null;
}

export interface userProfileBounties {
  /**
   * fetch data from the table: "std_bounties_bounty"
   */
  std_bounties_bounty: userProfileBounties_std_bounties_bounty[];
}

export interface userProfileBountiesVariables {
  address?: string | null;
}
