import React from 'react';
import PropTypes from 'prop-types';
import styles from './SubmissionItem.module.scss';
import { Link } from 'react-router-dom';
import { Table, Text } from 'components';
import {
  Currency,
  FulfillmentStagePill,
  LinkedAvatar
} from 'explorer-components';
import moment from 'moment';
import intl from 'react-intl-universal';

const SubmissionItem = props => {
  const {
    bountyId,
    bounty_stage,
    title,
    fulfiller,
    fulfiller_img,
    submissionDate,
    status,
    usd,
    amount,
    currency,
    pending
  } = props;

  const formattedTime = moment
    .utc(submissionDate, 'YYYY-MM-DDThh:mm:ssZ')
    .format('L');

  return (
    <Table.Row className={styles.submissionItemRow}>
      <Table.Cell
        flexBasis="40%"
        headerText={intl.get('components.submission.title')}
      >
        <Link to={`/bounty/${bountyId}`} className={styles.link}>
          <Text typeScale="h5" weight="fontWeight-medium">
            {title}
          </Text>
        </Link>
      </Table.Cell>
      <Table.Cell
        flexBasis="16%"
        headerText={intl.get('components.submission.fulfiller')}
      >
        <LinkedAvatar
          img={fulfiller_img}
          address={fulfiller}
          hash={fulfiller}
          to={`profile/${fulfiller}`}
          variant="small"
        />
      </Table.Cell>
      <Table.Cell
        flexBasis="15%"
        contentType="numerical"
        headerText={intl.get('components.submission.date')}
      >
        <Text typeScale="Body">{formattedTime}</Text>
      </Table.Cell>
      <Table.Cell
        flexBasis="16%"
        headerText={intl.get('components.submission.status')}
      >
        <FulfillmentStagePill
          bounty_stage={bounty_stage}
          accepted={status}
          pending={pending}
        />
      </Table.Cell>
      <Table.Cell
        flexBasis="13%"
        headerText={intl.get('components.submission.amount')}
        contentType="numerical"
      >
        <Currency
          primaryValue={usd}
          primaryDecimals="0"
          primaryTypeScale="h4"
          primaryClassName={styles.usd}
          secondaryValue={amount}
          secondaryCurrency={currency}
          currencyTypeScale="Small"
        />
      </Table.Cell>
    </Table.Row>
  );
};

SubmissionItem.propTypes = {
  title: PropTypes.string
};

SubmissionItem.defaultProps = {};

export default SubmissionItem;
