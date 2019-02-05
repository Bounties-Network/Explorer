import React from 'react';
import styles from './Social.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const Social = props => {
  const { utm_campaign } = props;
  const url_utm_campaign = utm_campaign ? `&utm_campaign=${utm_campaign}` : '';
  const url = source =>
    encodeURIComponent(
      `${window.location.href}?utm_source=${source}${url_utm_campaign}`
    );

  return (
    <div className={styles.social}>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${url('fb')}`}>
        <FontAwesomeIcon icon={['fab', 'facebook']} className={styles.icon} />
      </a>
      <a href={`https://twitter.com/home?status=${url('twitter')}`}>
        <FontAwesomeIcon icon={['fab', 'twitter']} className={styles.icon} />
      </a>
      <a href={`http://reddit.com/submit?url=${url('reddit')}`}>
        <FontAwesomeIcon icon={['fab', 'reddit']} />
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${url(
          'linkedin'
        )}`}
      >
        <FontAwesomeIcon icon={['fab', 'linkedin']} />
      </a>
    </div>
  );
};

export default Social;
