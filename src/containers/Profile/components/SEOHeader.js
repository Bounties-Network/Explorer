import React from 'react';
import { Helmet } from 'react-helmet';

const SEOHeader = props => {
  const { user } = props;

  if (!user) {
    return null;
  }

  const title = user.name
    ? `Bounties Explorer Profile ${user.name}`
    : 'Bounties Explorer Profile';

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="twitter:card" value="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:site" content="@ethbounties" />
      <meta name="twitter:creator" content="@ethbounties" />
      <meta name="twitter:image:src" content={user.page_preview} />
      <meta property="og:type" content="profile" />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={user.page_preview} />
      <meta property="og:profile:username" content={user.name} />
    </Helmet>
  );
};

export default SEOHeader;
