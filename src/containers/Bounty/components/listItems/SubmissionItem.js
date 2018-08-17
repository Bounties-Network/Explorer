import React from 'react';
import PropTypes from 'prop-types';
import styles from './SubmissionItem.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Button, Card, ListGroup, Text } from 'components';
import { FulfillmentStagePill, LinkedAvatar } from 'explorer-components';
import moment from 'moment';

const SubmissionItem = props => {
  const {
    fulfillmentId,
    bounty,
    name,
    address,
    img,
    url,
    email,
    description,
    dataHash,
    dataFileName,
    accepted,
    created,
    fulfiller_review,
    issuer_review,
    bountyBelongsToLoggedInUser,
    submissionBelongsToLoggedInUser,
    acceptFulfillment,
    showModal
  } = props;

  const formattedTime = moment(created, 'YYYY-MM-DD').format('MM/DD/YYYY');

  let actionButton = null;
  if (bountyBelongsToLoggedInUser && !accepted) {
    actionButton = (
      <Button
        type="action"
        className={styles.reactivateButton}
        icon={['far', 'check']}
        onClick={acceptFulfillment}
      >
        Accept
      </Button>
    );
  }

  if (bountyBelongsToLoggedInUser && accepted && !fulfiller_review) {
    actionButton = (
      <Button
        className={styles.reactivateButton}
        icon={['far', 'star']}
        onClick={() =>
          initiateLoginProtection(() =>
            showModal('issueRatingForFulfiller', {
              fulfillmentId
            })
          )
        }
      >
        Rate fulfiller
      </Button>
    );
  }

  if (submissionBelongsToLoggedInUser && accepted && !issuer_review) {
    actionButton = (
      <Button
        className={styles.reactivateButton}
        icon={['far', 'star']}
        onClick={() =>
          initiateLoginProtection(() =>
            showModal('issueRatingForIssuer', {
              fulfillmentId
            })
          )
        }
      >
        Rate issuer
      </Button>
    );
  }

  return (
    <div className="row">
      <div
        className={`col-xs-12 col-sm-3 ${styles.detailsContainer} ${
          styles.filter
        }`}
      >
        <LinkedAvatar
          name={name}
          address={address}
          img={img}
          hash={address}
          to={`/profile/${address}`}
          nameTextScale={'h4'}
          nameTextColor="black"
        />
        <div className={`${styles.labelGroup} ${styles.contactInfo}`}>
          <Text inputLabel>Contact</Text>
          <Text link src={`mailto:${email}`}>
            {email}
          </Text>
        </div>

        <div className={styles.labelGroup}>
          <Text inputLabel>Submitted</Text>
          <Text>{formattedTime}</Text>
        </div>
      </div>
      <div className={`col-xs-12 col-sm-7 ${styles.filter}`}>
        {url ? (
          <div className={styles.labelGroup}>
            <Text inputLabel>Web link</Text>
            <Text link src={url}>
              {url}
            </Text>
          </div>
        ) : null}
        <div className={`${styles.labelGroup} ${styles.submissionContents}`}>
          <Text inputLabel>Description</Text>
          <Text className={styles.submissionDescription}>
            {description || 'N/A'}
          </Text>
        </div>
        {dataHash ? (
          <div className={styles.labelGroup}>
            <Text inputLabel>Associated files</Text>
            <FontAwesomeIcon
              icon={['fal', 'file-archive']}
              className={styles.fileIcon}
            />
            <Text
              link
              src={`https://ipfs.infura.io/ipfs/${dataHash}/${dataFileName}`}
            >
              {dataFileName}
            </Text>
          </div>
        ) : null}
      </div>
      <div className={`col-sm-2 ${styles.actionColumn}`}>
        <FulfillmentStagePill
          className={styles.fulfillmentStage}
          accepted={accepted}
        />
        {actionButton}
      </div>
    </div>
  );
};

SubmissionItem.propTypes = {};

SubmissionItem.defaultProps = {};

export default SubmissionItem;
