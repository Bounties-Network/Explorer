import React from 'react';
import styles from './About.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Text } from 'components';

const About = props => {
  const { organization, languages } = props;

  return (
    <div className={styles.about}>
      <Text typeScale="h4" color="black" weight="fontWeight-medium">
        About
      </Text>

      <div className={styles.bulletPointContainer}>
        {organization && (
          <div className={styles.bulletPoint}>
            <FontAwesomeIcon
              icon={['far', 'briefcase']}
              className={styles.icon}
            />
            <div className={styles.bulletPointText}>
              <Text inputLabel>Oranization</Text>
              <Text typeScale="Body" color="black">
                {organization}
              </Text>
            </div>
          </div>
        )}

        {languages.length && (
          <div className={styles.bulletPoint}>
            <FontAwesomeIcon
              icon={['far', 'comments']}
              className={styles.icon}
            />
            <div className={styles.bulletPointText}>
              <Text inputLabel>Languages spoken</Text>
              <Text typeScale="Body" color="black">
                {languages ? languages.join(', ') : 'N/A'}
              </Text>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
