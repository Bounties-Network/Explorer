import React from 'react';
import PropTypes from 'prop-types';
import styles from './BountyItem.module.scss';
import { Currency, Text } from 'components';
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
          lineHeight="lineHeight-small"
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
        <Currency
          className={styles.value}
          primaryValue={usd_value}
          primaryDecimals="0"
          primaryTypeScale="h4"
          primaryWeight="fontWeight-medium"
          primaryClassName={styles.usd}
          secondaryValue={value}
          secondaryCurrency={currency}
          secondaryClassName={styles.eth}
        />
      </div>
    </div>
  );
};

BountyItem.propTypes = {
  title: PropTypes.string
};

BountyItem.defaultProps = {};

export default BountyItem;
