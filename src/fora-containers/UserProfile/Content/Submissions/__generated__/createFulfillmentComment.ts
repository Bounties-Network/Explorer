/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createFulfillmentComment
// ====================================================

export interface createFulfillmentComment_insert_std_bounties_fulfillment_comments_returning_std_bounties_comment {
  __typename: "std_bounties_comment";
  text: string;
}

export interface createFulfillmentComment_insert_std_bounties_fulfillment_comments_returning {
  __typename: "std_bounties_fulfillment_comments";
  comment_id: number;
  id: number;
  fulfillment_id: number;
  /**
   * An object relationship
   */
  std_bounties_comment: createFulfillmentComment_insert_std_bounties_fulfillment_comments_returning_std_bounties_comment;
}

export interface createFulfillmentComment_insert_std_bounties_fulfillment_comments {
  __typename: "std_bounties_fulfillment_comments_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: createFulfillmentComment_insert_std_bounties_fulfillment_comments_returning[];
}

export interface createFulfillmentComment {
  /**
   * insert data into the table: "std_bounties_fulfillment_comments"
   */
  insert_std_bounties_fulfillment_comments: createFulfillmentComment_insert_std_bounties_fulfillment_comments | null;
}

export interface createFulfillmentCommentVariables {
  userId?: number | null;
  comment?: string | null;
  timestamp?: any | null;
  submissionId?: number | null;
}
