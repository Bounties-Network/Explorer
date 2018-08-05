import React from 'react';
import PropTypes from 'prop-types';
import base from '../BaseStyles.module.scss';
import styles from './SubmissionItem.module.scss';
import { Table, Card, Text } from 'components';
import { FulfillmentStagePill, LinkedAvatar } from 'explorer-components';
import moment from 'moment';

const SubmissionItem = props => {
  const {
    title,
    fulfiller,
    submissionDate,
    status,
    usd,
    amount,
    currency
  } = props;

  const formattedTime = moment(submissionDate, 'YYYY-MM-DD').fromNow();

  return (
    <Table.Row hover>
      <Table.Cell headerText="Bounty title" flexGrow={4}>
        {title}
      </Table.Cell>
      <Table.Cell headerText="Fulfiller" flexGrow={3}>
        <LinkedAvatar
          address={fulfiller}
          hash={fulfiller}
          to={`profile/${fulfiller}`}
          size="small"
        />
      </Table.Cell>
      <Table.Cell headerText="Submission date" flexGrow={2}>
        {formattedTime}
      </Table.Cell>
      <Table.Cell headerText="Status" flexGrow={2}>
        <FulfillmentStagePill accepted={status} />
      </Table.Cell>
      <Table.Cell headerText="Payment amount" flexGrow={2}>
        <div className={styles.value}>
          <Text color="purple" typeScale="h3" className={styles.usd}>
            ${usd}
          </Text>
          <Text color="defaultGrey" typeScale="Small" className={styles.usd}>
            {`${amount} ${currency}`}
          </Text>
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

SubmissionItem.propTypes = {
  title: PropTypes.string
};

SubmissionItem.defaultProps = {};

export default SubmissionItem;
