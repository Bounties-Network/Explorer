import React from 'react';
import styles from './Elsewhere.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Text } from 'components';
import { shortenUrl } from 'utils/helpers';
import intl from 'react-intl-universal';
import { faGlobe } from '@fortawesome/pro-regular-svg-icons';
import {
  faTwitter,
  faGithub,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons';

const Elsewhere = props => {
  const { website, twitter, github, linkedin } = props;

  return (
    <div className={styles.elsewhere}>
      <Text typeScale="h4" color="black" weight="fontWeight-medium">
        {intl.get('sections.profile.elsewhere.title')}
      </Text>

      <div className={styles.bulletPointContainer}>
        {website && (
          <div className={styles.bulletPoint}>
            <FontAwesomeIcon icon={faGlobe} className={styles.icon} />
            <Text link absolute src={website} typeScale="h5">
              {shortenUrl(website)}
            </Text>
          </div>
        )}

        {twitter && (
          <div className={styles.bulletPoint}>
            <FontAwesomeIcon icon={faTwitter} className={styles.icon} />
            <Text
              link
              absolute
              src={`https://twitter.com/@${twitter}`}
              typeScale="h5"
            >
              Twitter
            </Text>
          </div>
        )}

        {github && (
          <div className={styles.bulletPoint}>
            <FontAwesomeIcon icon={faGithub} className={styles.icon} />
            <Text
              link
              absolute
              src={`https://github.com/${github}`}
              typeScale="h5"
            >
              Github
            </Text>
          </div>
        )}

        {linkedin && (
          <div className={styles.bulletPoint}>
            <FontAwesomeIcon icon={faLinkedin} className={styles.icon} />
            <Text link absolute src={linkedin} typeScale="h5">
              LinkedIn
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default Elsewhere;
