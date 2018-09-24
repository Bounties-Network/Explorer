import React from 'react';
import { Helmet } from 'react-helmet';

export const SEOHeader = () => {
  return (
    <Helmet>
      <title>
        Bounties Explorer: Find Open Bounties & Freelance Jobs Online
      </title>
      <meta
        name="description"
        content="Find open bounties and freelancers for any task. Get paid in ETH or ERC20 tokens. Clear requirements tied to payouts. Payments held in escrow."
      />
      <meta name="twitter:card" value="summary" />
      <meta name="twitter:site" content="@ethbounties" />
      <meta
        name="twitter:title"
        content="Bounties Explorer: Find Open #BugBounties & Freelance Jobs Online "
      />
      <meta
        name="twitter:description"
        content="Find open bounties and #freelancers for any task. Get paid in ETH or ERC20 tokens. Clear requirements tied to payouts. Payments held in escrow."
      />
      <meta name="twitter:creator" content="@ethbounties" />
      <meta
        name="twitter:image:src"
        content="https://bounties.network/img/twitter.png"
      />
      <meta
        property="og:title"
        content="Bounties Explorer: Find Open #BugBounties & Freelance Jobs Online "
      />
      <meta property="og:type" content="article" />
      <meta property="og:url" content="https://explorer.bounties.network/" />
      <meta
        property="og:image"
        content="https://bounties.network/img/twitter.png"
      />
      <meta
        property="og:description"
        content="Find open bounties and #freelancers for any task. Get paid in ETH or ERC20 tokens. Clear requirements tied to payouts. Payments held in escrow."
      />
    </Helmet>
  );
};
