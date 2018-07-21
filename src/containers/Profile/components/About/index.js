import React from 'react';
import baseStyles from '../BaseStyles.module.scss';
import styles from './About.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Avatar, FullAddressBar, Table, Text } from 'components';

const About = props => {
  const { address, img, name } = props;

  return (
    <React.Fragment>
      <div className={baseStyles.statContainer}>
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
                ConsenSys
              </Text>
            </div>
          </div>

          <div className={styles.bulletPoint}>
            <FontAwesomeIcon
              icon={['far', 'comments']}
              className={styles.icon}
            />
            <div className={styles.bulletPointText}>
              <Text typeScale="h5" color="defaultGrey">
                Languages spoken
              </Text>
              <Text typeScale="h4" color="black">
                English, German
              </Text>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default About;
