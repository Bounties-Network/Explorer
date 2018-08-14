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

export const NOTIFICATION_ID = {
  FULFILLMENT_SUBMITTED: 0,
  FULFILLMENT_SUBMITTED_ISSUER: 1,
  BOUNTY_ACTIVATED: 2,
  FULFILLMENT_ACCEPTED: 3,
  FULFILLMENT_ACCEPTED_FULFILLER: 4,
  // BOUNTY_EXPIRED: 5
  BOUNTY_ISSUED: 6,
  BOUNTY_KILLED: 7,
  CONTRIBUTION_ADDED: 8,
  DEADLINE_EXTENDED: 9,
  BOUNTY_CHANGED: 10,
  ISSUER_TRANSFERRED: 11,
  TRANSFER_RECIPIENT: 12,
  PAYOUT_INCREASED: 13,
  BOUNTY_EXPIRED: 14,
  // ^^^ using this one for now since that is how the api is coding them
  // definitely need to fix this at some point :-)
  BOUNTY_COMMENT: 15,
  BOUNTY_ISSUED_ACTIVATED: 16,
  FULFILLMENT_UPDATED: 17,
  FULFILLMENT_UPDATED_ISSUER: 18,
  RATING_ISSUED: 19,
  RATING_RECEIVED: 20,
  PROFILE_UPDATED: 21
};
