import React from 'react';
import styles from './About.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Avatar, FullAddressBar, Table, Text } from 'components';

const About = props => {
  const { organization, languages } = props;

  return (
    <div className={styles.about}>
      <Text typeScale="h3" color="black">
        About
      </Text>

      <div className={styles.bulletPointContainer}>
        <div className={styles.bulletPoint}>
          <FontAwesomeIcon
            icon={['far', 'briefcase']}
            className={styles.icon}
          />
          <div className={styles.bulletPointText}>
            <Text typeScale="h5" color="defaultGrey">
              Oranization
            </Text>
            <Text typeScale="h4" color="black">
              {organization ? organization : 'N/A'}
            </Text>
          </div>
        </div>

        <div className={styles.bulletPoint}>
          <FontAwesomeIcon icon={['far', 'comments']} className={styles.icon} />
          <div className={styles.bulletPointText}>
            <Text typeScale="h5" color="defaultGrey">
              Languages spoken
            </Text>
            <Text typeScale="h4" color="black">
              {languages ? languages.join(', ') : 'N/A'}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
