/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getUserId
// ====================================================

export interface getUserId_user_user {
  __typename: "user_user";
  id: number;
  small_profile_image_url: string;
}

export interface getUserId {
  /**
   * fetch data from the table: "user_user"
   */
  user_user: getUserId_user_user[];
}

export interface getUserIdVariables {
  address: string;
}
