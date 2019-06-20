import React from 'react';
import PropTypes from 'prop-types';
import styles from './BountyItem.module.scss';
import { Text } from 'components';
import { Currency } from 'explorer-components';
import moment from 'moment';
import intl from 'react-intl-universal';

const BountyItem = props => {
  const { createdAt, currency, submissions, title, usd_value, value } = props;

  const formattedTime = moment.utc(createdAt, 'YYYY-MM-DDThh:mm:ssZ').fromNow();

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
          {intl.get('components.bounty_item.text', {
            time: formattedTime,
            submissionsCount: submissions.length
          })}
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
          currencyTypeScale="Small"
          currencyWeight="fontWeight-medium"
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
