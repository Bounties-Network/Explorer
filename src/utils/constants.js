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

// update this to be an env passthrough
export const API_ENDPOINT = 'https://staging.api.bounties.network';

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
