import React from 'react';
import PropTypes from 'prop-types';
import styles from './SubmissionItem.module.scss';
import { Link } from 'react-router-dom';
import { Table, Text } from 'components';
import { FulfillmentStagePill, LinkedAvatar } from 'explorer-components';
import moment from 'moment';

const SubmissionItem = props => {
  const {
    bountyId,
    bountyStage,
    title,
    fulfiller,
    fulfiller_img,
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
    <Table.Row>
      <Table.Cell headerText="Bounty title" flexGrow={4}>
        <Link to={`/bounty/${bountyId}`} className={styles.link}>
          <Text typeScale="h4" weight="fontWeight-medium">
            {title}
          </Text>
        </Link>
      </Table.Cell>
      <Table.Cell headerText="Fulfiller" flexGrow={3}>
        <LinkedAvatar
          img={fulfiller_img}
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
        <FulfillmentStagePill bountyStage={bountyStage} accepted={status} />
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
