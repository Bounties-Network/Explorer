import React from 'react';
import PropTypes from 'prop-types';
import styles from './Social.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Text } from 'components';

const Social = props => {
  const { twitterLink, facebookLink, redditLink } = props;

  return (
    <div className={styles.social}>
      <Text color="grey" type="H2">
        <a href={twitterLink}>
          <FontAwesomeIcon icon={['fab', 'twitter']} className={styles.icon} />
        </a>
        <a href={facebookLink}>
          <FontAwesomeIcon icon={['fab', 'facebook']} className={styles.icon} />
        </a>
        <a href={redditLink}>
          <FontAwesomeIcon icon={['fab', 'reddit']} />
        </a>
      </Text>
    </div>
  );
};

export default Social;
