import React from 'react';
import styles from './SubmissionItem.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Button, Text } from 'components';
import { FulfillmentStagePill, LinkedAvatar } from 'explorer-components';
import { ACTIVE } from 'public-modules/Bounty/constants';
import { hasImageExtension, shortenFileName, shortenUrl } from 'utils/helpers';
import moment from 'moment';

const SubmissionItem = props => {
  const {
    fulfillmentId,
    bounty,
    fulfiller_name,
    fulfiller_email,
    fulfiller_address,
    fulfiller_img,
    url,
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
    showModal,
    setRatingModal,
    initiateLoginProtection
  } = props;

  const { bountyStage } = bounty;

  const formattedTime = moment
    .utc(created, 'YYYY-MM-DDThh:mm:ssZ')
    .local()
    .format('MM/DD/YYYY');

  let actionButton = null;
  if (bountyBelongsToLoggedInUser && bountyStage === ACTIVE && !accepted) {
    actionButton = (
      <Button
        type="action"
        className={styles.actionButton}
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
        className={styles.actionButton}
        icon={['far', 'star']}
        onClick={() =>
          initiateLoginProtection(() => {
            setRatingModal(fulfillmentId, {
              name: fulfiller_name,
              address: fulfiller_address,
              img: fulfiller_img
            });

            showModal('issueRatingForFulfiller');
          })
        }
      >
        Rate fulfiller
      </Button>
    );
  }

  if (submissionBelongsToLoggedInUser && accepted && !issuer_review) {
    actionButton = (
      <Button
        className={styles.actionButton}
        icon={['far', 'star']}
        onClick={() =>
          initiateLoginProtection(() => {
            const {
              name,
              public_address,
              small_profile_image_url
            } = bounty.user;
            setRatingModal(fulfillmentId, {
              name,
              address: public_address,
              img: small_profile_image_url
            });
            showModal('issueRatingForIssuer');
          })
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
          name={fulfiller_name}
          address={fulfiller_address}
          img={fulfiller_img}
          hash={fulfiller_address}
          to={`/profile/${fulfiller_address}`}
          nameTextScale={'h4'}
          nameTextColor="black"
        />
        <div className={[styles.labelGroup, styles.contactInfo].join(' ')}>
          <Text inputLabel>Contact</Text>
          <Text link src={`mailto:${fulfiller_email}`}>
            {fulfiller_email}
          </Text>
        </div>

        <div className={[styles.labelGroup, styles.submitTime].join(' ')}>
          <Text inputLabel>Submitted</Text>
          <Text>{formattedTime}</Text>
        </div>
      </div>
      <div className={`col-xs-12 col-sm-6 ${styles.filter}`}>
        {url ? (
          <div className={[styles.labelGroup, styles.bottomMargin].join(' ')}>
            <Text inputLabel>Web link</Text>
            <Text link src={url}>
              {shortenUrl(url)}
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
              {shortenFileName(dataFileName)}
            </Text>
            {hasImageExtension(dataFileName) && (
              <img
                src={`https://ipfs.infura.io/ipfs/${dataHash}/${dataFileName}`}
                class={styles.image}
              />
            )}
          </div>
        ) : null}
      </div>
      <div className={`col-sm-3 ${styles.actionColumn}`}>
        <FulfillmentStagePill
          className={styles.fulfillmentStage}
          accepted={accepted}
          bountyStage={bountyStage}
        />
        {actionButton}
      </div>
    </div>
  );
};

SubmissionItem.propTypes = {};

SubmissionItem.defaultProps = {};

export default SubmissionItem;
