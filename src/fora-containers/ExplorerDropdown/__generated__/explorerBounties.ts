/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: explorerBounties
// ====================================================

export interface explorerBounties_std_bounties_bounty_std_bounties_fulfillments {
  __typename: "std_bounties_fulfillment";
  id: number;
}

export interface explorerBounties_std_bounties_bounty_user_user {
  __typename: "user_user";
  name: string;
  public_address: string;
}

export interface explorerBounties_std_bounties_bounty {
  __typename: "std_bounties_bounty";
  id: number;
  deadline: any;
  title: string;
  balance: any | null;
  experience_level: number | null;
  data_categories: any | null;
  token_symbol: string;
  calculated_fulfillment_amount: any | null;
  usd_price: any;
  /**
   * An array relationship
   */
  std_bounties_fulfillments: explorerBounties_std_bounties_bounty_std_bounties_fulfillments[];
  /**
   * An object relationship
   */
  user_user: explorerBounties_std_bounties_bounty_user_user | null;
}

export interface explorerBounties {
  /**
   * fetch data from the table: "std_bounties_bounty"
   */
  std_bounties_bounty: explorerBounties_std_bounties_bounty[];
}

export interface explorerBountiesVariables {
  platform: string;
  tags?: any | null;
}
