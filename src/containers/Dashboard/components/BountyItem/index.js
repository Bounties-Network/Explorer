import React from 'react';
import PropTypes from 'prop-types';
import base from '../BaseStyles.module.scss';
import styles from './BountyItem.module.scss';
import { ListGroup, Card, Text } from 'components';
import { LinkedAvatar } from 'explorer-components';
import Pluralize from 'pluralize';
import moment from 'moment';

const BountyItem = props => {
  const { createdAt, currency, submissions, title, usd_value, value } = props;
  const formattedTime = moment(createdAt, 'YYYY-MM-DD').fromNow();

  let submissionsText = '';
  if (typeof submissions === 'number') {
    const pluralized = Pluralize('Submission', submissions, true);
    submissionsText = `∙ ${pluralized}`;
  }

  return (
    <div className={`row ${styles.container}`}>
      <div className="col-xs-10">
        <div className={base.alignLeft}>
          <Text>{title}</Text>
          <Text
            typeScale="Small"
            color="defaultGrey"
            className={styles.details}
          >
            {`Created ${formattedTime} ${submissionsText}`}
          </Text>
        </div>
      </div>
      <div className="col-xs-2">
        <div className={styles.value}>
          <Text color="purple" typeScale="h3" className={styles.usd}>
            ${usd_value}
          </Text>
          <Text color="defaultGrey" typeScale="Small" className={styles.usd}>
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
