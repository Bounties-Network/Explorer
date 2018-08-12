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
    fulfiller_reivew,
    issuer_reivew,
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

  if (bountyBelongsToLoggedInUser && accepted && !fulfiller_reivew) {
    actionButton = (
      <Button
        className={styles.reactivateButton}
        icon={['far', 'star']}
        onClick={() =>
          showModal('issueRatingForFulfiller', {
            fulfillmentId,
            name,
            address,
            img
          })
        }
      >
        Rate fulfiller
      </Button>
    );
  }

  if (submissionBelongsToLoggedInUser && accepted && !issuer_reivew) {
    actionButton = (
      <Button
        className={styles.reactivateButton}
        icon={['far', 'star']}
        onClick={() =>
          showModal('issueRatingForIssuer', {
            fulfillmentId,
            name: bounty.issuer_name,
            address: bounty.issuer_address,
            img: bounty.user.profile_image
          })
        }
      >
        Rate issuer
      </Button>
    );
  }

  return (
    <div className="">
      <div className="row">
        <div className={`col-xs-3 ${styles.detailsContainer} ${styles.filter}`}>
          <div className="row">
            <div className="col-xs-12">
              <LinkedAvatar
                className={styles.labelGroup}
                name={name}
                address={address}
                img={img}
                hash={address}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <div className={styles.labelGroup}>
                <Text color="defaultGrey" className={styles.label}>
                  Contact
                </Text>
                <Text link src={`mailto:${email}`}>
                  {email}
                </Text>
              </div>

              <div className={styles.labelGroup}>
                <Text color="defaultGrey" className={styles.label}>
                  Submitted
                </Text>
                <Text>{formattedTime}</Text>
              </div>
            </div>
          </div>
        </div>
        <div className={`col-xs-6 ${styles.filter}`}>
          {url ? (
            <div className={styles.labelGroup}>
              <Text color="defaultGrey" className={styles.label}>
                Web link
              </Text>
              <Text link src={url}>
                {url}
              </Text>
            </div>
          ) : null}
          <div className={styles.labelGroup}>
            <Text color="defaultGrey" className={styles.label}>
              Description
            </Text>
            <Text>{description || 'N/A'}</Text>
          </div>

          {dataHash ? (
            <div className={styles.labelGroup}>
              <Text color="defaultGrey" className={styles.label}>
                Associated files
              </Text>
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
        <div className={`col-xs-3 ${styles.actionColumn}`}>
          <FulfillmentStagePill className={styles.label} accepted={accepted} />
          {actionButton}
        </div>
      </div>
    </div>
  );
};

SubmissionItem.propTypes = {};

SubmissionItem.defaultProps = {};

export default SubmissionItem;
