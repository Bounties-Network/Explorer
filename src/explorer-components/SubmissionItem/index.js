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

const SubmissionItem = props => {
  const {
    bountyId,
    bountyStage,
    title,
    fulfiller,
    fulfiller_img,
    fulfiller_ensDomain,
    submissionDate,
    status,
    usd,
    amount,
    currency
  } = props;

  const formattedTime = moment
    .utc(submissionDate, 'YYYY-MM-DDThh:mm:ssZ')
    .format('M/D/YYYY');

  return (
    <Table.Row className={styles.submissionItemRow}>
      <Table.Cell flexBasis="40%" headerText="Bounty title">
        <Link to={`/bounty/${bountyId}`} className={styles.link}>
          <Text typeScale="h5" weight="fontWeight-medium">
            {title}
          </Text>
        </Link>
      </Table.Cell>
      <Table.Cell flexBasis="16%" headerText="Fulfiller">
        <LinkedAvatar
          img={fulfiller_img}
          address={fulfiller}
          ensDomain={fulfiller_ensDomain}
          hash={fulfiller}
          to={`profile/${fulfiller}`}
          size="small"
        />
      </Table.Cell>
      <Table.Cell
        flexBasis="15%"
        contentType="numerical"
        headerText="Submission date"
      >
        <Text typeScale="Body">{formattedTime}</Text>
      </Table.Cell>
      <Table.Cell flexBasis="16%" headerText="Status">
        <FulfillmentStagePill bountyStage={bountyStage} accepted={status} />
      </Table.Cell>
      <Table.Cell
        flexBasis="13%"
        headerText="Payment amount"
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
