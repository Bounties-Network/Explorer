import React from 'react';
import styles from './Social.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Text } from 'components';

const Social = props => {
  return (
    <div className={styles.social}>
      <Text color="grey" type="H2">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            window.location.href
          )}`}
        >
          <FontAwesomeIcon icon={['fab', 'twitter']} className={styles.icon} />
        </a>
        <a
          href={`https://twitter.com/home?status=${encodeURIComponent(
            window.location.href
          )}`}
        >
          <FontAwesomeIcon icon={['fab', 'facebook']} className={styles.icon} />
        </a>
        <a
          href={`http://reddit.com/submit?url=${encodeURIComponent(
            window.location.href
          )}`}
        >
          <FontAwesomeIcon icon={['fab', 'reddit']} />
        </a>
      </Text>
    </div>
  );
};

export default Social;
