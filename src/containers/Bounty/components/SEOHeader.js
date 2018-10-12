import React from 'react';
import { Helmet } from 'react-helmet';
import { EXPIRED } from 'public-modules/Bounty/constants';
import moment from 'moment';

const SEOHeader = props => {
  const { bounty } = props;

  if (!bounty) {
    return null;
  }

  let description = bounty.description
    .replace('# Description', '')
    .substring(0, 196);

  if (bounty.description.replace('# Description', '').length > 196) {
    description += '...';
  }

  const fulfillmentAmount = Number(bounty.calculated_fulfillmentAmount).toFixed(
    2
  );
  const usdPrice = Number(bounty.usd_price).toFixed(2);
  const value = `${fulfillmentAmount} ${bounty.tokenSymbol} ($${usdPrice} USD)`;
  const deadline = moment
    .utc(bounty.deadline, 'YYYY-MM-DDThh:mm:ssZ')
    .fromNow(true);
  const deadlineDescription =
    bounty.bountyStage === EXPIRED ? 'expired' : 'remaining';
  const deadlineText = `${deadline} ${deadlineDescription}`;

  return (
    <Helmet>
      <title>{bounty.title}</title>
      <meta name="description" content={description} />
      <meta name="twitter:card" value="summary_large_image" />
      <meta name="twitter:site" content="@ethbounties" />
      <meta name="twitter:title" content={bounty.title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:creator" content="@ethbounties" />
      <meta name="twitter:image:src" content={bounty.image_preview} />
      <meta name="twitter:label1" value="Bounty Payout" />
      <meta name="twitter:data1" value={value} />
      <meta name="twitter:label2" value="Deadline to Submit" />
      <meta name="twitter:data2" value={deadlineText} />
      <meta property="og:title" content={bounty.title} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:image:secure_url" content={bounty.image_preview} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
};

export default SEOHeader;
