import { invert } from 'lodash';

export const HTTP_200_OK = 200;
export const HTTP_300_MULTIPLE_CHOICES = 300;
export const HTTP_400_BAD_REQUEST = 400;
export const HTTP_401_UNAUTHORIZED = 401;
export const HTTP_401_MOD_UNAUTHORIZED = 40101;
export const HTTP_403_FORBIDDEN = 403;
export const HTTP_404_NOT_FOUND = 404;
export const HTTP_404_MOD_NOT_FOUND = 40401;
export const HTTP_422_UNKNOWN = 422;
export const HTTP_500_INTERNAL_SERVER_ERROR = 500;
export const HTTP_503_SERVICE_UNAVAILABLE = 503;

let API_ENDPOINT = 'https://staging.api.bounties.network';
//let API_ENDPOINT = 'http://localhost:8000';
// update this to be an env passthrough
export const apiEndpoint = {
  set: endpoint => (API_ENDPOINT = endpoint),
  get: () => API_ENDPOINT
};

export const DEFAULT_MARKDOWN = `# Description
- Description of the bounty
# Definition of Done
- Definition 1
- Definition 2
# Requirements
A correct submission will:
- requirement 1
- requirement 2
- requirement 3
# Revisions
We will require at most 3 revisions for submitted work
`;

export const FULFILLMENT_SUBMITTED = 0;
export const FULFILLMENT_SUBMITTED_ISSUER = 1;
export const BOUNTY_ACTIVATED = 2;
export const FULFILLMENT_ACCEPTED = 3;
export const FULFILLMENT_ACCEPTED_FULFILLER = 4;
// export const BOUNTY_EXPIRED = 5
export const BOUNTY_ISSUED = 6;
export const BOUNTY_KILLED = 7;
export const CONTRIBUTION_ADDED = 8;
export const DEADLINE_EXTENDED = 9;
export const BOUNTY_CHANGED = 10;
export const ISSUER_TRANSFERRED = 11;
export const TRANSFER_RECIPIENT = 12;
export const PAYOUT_INCREASED = 13;
export const BOUNTY_EXPIRED = 14;
// ^^^ using this one for now since that is how the api is coding them
// definitely need to fix this at some point :-)
export const BOUNTY_COMMENT = 15;
export const BOUNTY_ISSUED_ACTIVATED = 16;
export const FULFILLMENT_UPDATED = 17;
export const FULFILLMENT_UPDATED_ISSUER = 18;
export const RATING_ISSUED = 19;
export const RATING_RECEIVED = 20;
export const PROFILE_UPDATED = 21;

export const NOTIFICATION_TO_ID = {
  FulfillmentSubmitted: FULFILLMENT_SUBMITTED,
  FulfillmentSubmittedIssuer: FULFILLMENT_SUBMITTED_ISSUER,
  BountyActivated: BOUNTY_ACTIVATED,
  FulfillmentAccepted: FULFILLMENT_ACCEPTED,
  FulfillmentAcceptedFulfiller: FULFILLMENT_ACCEPTED_FULFILLER,
  BountyExpired: BOUNTY_EXPIRED,
  BountyIssued: BOUNTY_ISSUED,
  BountyKilled: BOUNTY_KILLED,
  ContributionAdded: CONTRIBUTION_ADDED,
  DeadlineExtended: DEADLINE_EXTENDED,
  BountyChanged: BOUNTY_CHANGED,
  IssuerTransferred: ISSUER_TRANSFERRED,
  TransferRecipient: TRANSFER_RECIPIENT,
  PayoutIncreased: PAYOUT_INCREASED,
  BountyComment: BOUNTY_COMMENT,
  BountyIssuedActivated: BOUNTY_ISSUED_ACTIVATED,
  FulfillmentUpdated: FULFILLMENT_UPDATED,
  FulfillmentUpdatedIssuer: FULFILLMENT_UPDATED_ISSUER,
  RatingIssued: RATING_ISSUED,
  RatingReceived: RATING_RECEIVED,
  ProfileUpdated: PROFILE_UPDATED
};

export const ID_TO_NOTIFICATION = invert(NOTIFICATION_TO_ID);
