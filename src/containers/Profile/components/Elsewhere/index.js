import React from 'react';
import baseStyles from '../BaseStyles.module.scss';
import styles from './Elsewhere.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Avatar, FullAddressBar, Table, Text } from 'components';

const Elsewhere = props => {
  const { address, img, name } = props;

  return (
    <React.Fragment>
      <div className={styles.elsewhere}>
        <Text typeScale="h3" color="black">
          Elsewhere
        </Text>

        <div className={styles.bulletPointContainer}>
          <div className={styles.bulletPoint}>
            <FontAwesomeIcon
              icon={['far', 'briefcase']}
              className={styles.icon}
            />

            <Text typeScale="h5" color="defaultGrey">
              mattgarnett.com
            </Text>
          </div>

          <div className={styles.bulletPoint}>
            <FontAwesomeIcon
              icon={['far', 'comments']}
              className={styles.icon}
            />

            <Text typeScale="h5" color="defaultGrey">
              @matt_garnett
            </Text>
          </div>

          <div className={styles.bulletPoint}>
            <FontAwesomeIcon
              icon={['far', 'comments']}
              className={styles.icon}
            />

            <Text typeScale="h5" color="defaultGrey">
              @matt_garnett
            </Text>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Elsewhere;
