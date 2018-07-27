import React from 'react';
import baseStyles from '../BaseStyles.module.scss';
import styles from './Elsewhere.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Avatar, FullAddressBar, Table, Text } from 'components';
import { map } from 'lodash';

const Elsewhere = props => {
  const dataKeys = ['website', 'twitter', 'github', 'linkedin'];

  const renderSocialMedia = () => {
    return map(key => {
      return (
        <div className="row">
          <div className="col-xs-1">
            <FontAwesomeIcon
              icon={key === 'website' ? ['far', 'globe'] : ['fab', key]}
              className={styles.icon}
            />
          </div>
          <div className="col-xs-10">
            <Text typeScale="h5" color="defaultGrey">
              {props[key] || 'N/A'}
            </Text>
          </div>
        </div>
      );
    }, dataKeys);
  };

  return (
    <div className={styles.elsewhere}>
      <Text typeScale="h3" color="black">
        Elsewhere
      </Text>

      <div className={styles.bulletPointContainer}>{renderSocialMedia()}</div>
    </div>
  );
};

export default Elsewhere;
