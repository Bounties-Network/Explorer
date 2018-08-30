import React from 'react';
import PropTypes from 'prop-types';
import styles from './BountyItem.module.scss';
import { Text } from 'components';
import Pluralize from 'pluralize';
import moment from 'moment';

const BountyItem = props => {
  const { createdAt, currency, submissions, title, usd_value, value } = props;

  const formattedTime = moment.utc(createdAt, 'YYYY-MM-DDThh:mm:ssZ').fromNow();

  let submissionsText = '';
  if (typeof submissions === 'number') {
    const pluralized = Pluralize('Submission', submissions, true);
    submissionsText = `∙ ${pluralized}`;
  }

  return (
    <div className={`row ${styles.container}`}>
      <div className="col-xs-9">
        <Text
          alignment="align-left"
          typeScale="Body"
          weight="fontWeight-medium"
        >
          {title}
        </Text>

        <Text
          alignment="align-left"
          typeScale="Small"
          color="defaultGrey"
          className={styles.details}
        >
          {`Created ${formattedTime} ${submissionsText}`}
        </Text>
      </div>
      <div className="col-xs-3">
        <div className={styles.value}>
          <Text
            color="purple"
            typeScale="h4"
            weight="fontWeight-medium"
            className={styles.usd}
          >
            ${usd_value}
          </Text>
          <Text color="defaultGrey" typeScale="Small" className={styles.eth}>
            {`${value} ${currency}`}
          </Text>
        </div>
      </div>
    </div>
  );
};

BountyItem.propTypes = {
  title: PropTypes.string
};

BountyItem.defaultProps = {};

export default BountyItem;
