import React from 'react';
import styles from './Elsewhere.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Text } from 'components';
import { map } from 'lodash';

const Elsewhere = props => {
  const dataKeys = ['website', 'twitter', 'github', 'linkedin'];

  const renderSocialMedia = () => {
    return map(key => {
      return (
        <React.Fragment>
          {props[key] && (
            <div className="row">
              <div className="col-xs-1">
                <FontAwesomeIcon
                  icon={key === 'website' ? ['far', 'globe'] : ['fab', key]}
                  className={styles.icon}
                />
              </div>
              <div className="col-xs-10">
                <Text typeScale="h5" color="defaultGrey">
                  {props[key]}
                </Text>
              </div>
            </div>
          )}
        </React.Fragment>
      );
    }, dataKeys);
  };

  return (
    <div className={styles.elsewhere}>
      <Text typeScale="h4" color="black" weight="fontWeight-medium">
        Elsewhere
      </Text>

      <div className={styles.bulletPointContainer}>{renderSocialMedia()}</div>
    </div>
  );
};

export default Elsewhere;
