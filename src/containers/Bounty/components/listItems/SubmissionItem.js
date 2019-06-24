import React from 'react';
import styles from './SubmissionItem.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { includes } from 'lodash';
import { Button, Text } from 'components';
import { FulfillmentStagePill, LinkedAvatar } from 'explorer-components';
import { ACTIVE, EXPIRED } from 'public-modules/Bounty/constants';
import { hasImageExtension, shortenFileName, shortenUrl } from 'utils/helpers';
import moment from 'moment';
import intl from 'react-intl-universal';

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

  const { bounty_stage } = bounty;

  const formattedTime = moment
    .utc(created, 'YYYY-MM-DDThh:mm:ssZ')
    .local()
    .format('L');
  let actionButton = null;
  if (
    bountyBelongsToLoggedInUser &&
    includes(bounty_stage, [ACTIVE, EXPIRED]) &&
    !accepted
  ) {
    actionButton = (
      <Button
        type="action"
        className={styles.actionButton}
        onClick={acceptFulfillment}>
        {intl.get('actions.accept')}
      </Button>
    );
  }

  if (bountyBelongsToLoggedInUser && accepted && !fulfiller_review) {
    actionButton = (
      <Button
        className={styles.actionButton}
        onClick={() =>
          initiateLoginProtection(() => {
            setRatingModal(fulfillmentId, {
              name: fulfiller_name,
              address: fulfiller_address,
              img: fulfiller_img
            });

            showModal('issueRatingForFulfiller');
          })
        }>
        {intl.get('actions.rate_fulfiller')}
      </Button>
    );
  }

  if (submissionBelongsToLoggedInUser && accepted && !issuer_review) {
    actionButton = (
      <Button
        className={styles.actionButton}
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
        }>
        {intl.get('actions.rate_issuer')}
      </Button>
    );
  }

  return (
    <div className={`${styles.submissionItem}`}>
      <header className={`${styles.submissionHeader}`}>
        <LinkedAvatar
          name={fulfiller_name}
          address={fulfiller_address}
          img={fulfiller_img}
          hash={fulfiller_address}
          to={`/profile/${fulfiller_address}`}
          nameTextScale={'h4'}
          nameTextColor="black"
          border
        />
        <div className={`${styles.actionContainer}`}>
          <Text
            link
            src={`mailto:${fulfiller_email}`}
            className={styles.emailLink}>
            <FontAwesomeIcon
              icon={['far', 'envelope']}
              className={styles.emailIcon}
            />
          </Text>
          {actionButton}
          <FulfillmentStagePill
            accepted={accepted}
            bounty_stage={bounty_stage}
          />
        </div>
      </header>
      <div className={`${styles.detailsContainer} ${styles.filter}`}>
        <Text color="darkGrey" className={styles.submissionDescription}>
          {description || 'N/A'}
        </Text>
        <div className={`${styles.metaDataContainer}`}>
          <div className={`${styles.submissionMetadata}`}>
            <Text inline>{formattedTime}</Text>
          </div>
          <div className={`${styles.submissionMetadata}`}>
            <Text link src="#">
              Comment
            </Text>
          </div>
          {url ? (
            <div
              className={[styles.submissionMetadata, styles.bottomMargin].join(
                ' '
              )}>
              <FontAwesomeIcon
                icon={['far', 'link']}
                className={styles.submissionIcon}
              />
              <Text link absolute src={url}>
                {shortenUrl(url)}
              </Text>
            </div>
          ) : null}
        </div>
        {dataHash ? (
          <div className={`${styles.labelGroup}`}>
            <Text inputLabel>Submission files</Text>
            {!hasImageExtension(dataFileName) && (
              <div>
                <FontAwesomeIcon
                  icon={['far', 'file-archive']}
                  className={styles.submissionIcon}
                />
                <Text
                  link
                  absolute
                  src={`https://ipfs.infura.io/ipfs/${dataHash}/${dataFileName}`}>
                  {shortenFileName(dataFileName)}
                </Text>
              </div>
            )}
            {hasImageExtension(dataFileName) && (
              <a
                className={`${styles.imageLink}`}
                href={`https://ipfs.infura.io/ipfs/${dataHash}/${dataFileName}`}
                target="_blank">
                <img
                  src={`https://ipfs.infura.io/ipfs/${dataHash}/${dataFileName}`}
                  class={styles.image}
                  alt={dataFileName}
                />
              </a>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

SubmissionItem.propTypes = {};

SubmissionItem.defaultProps = {};

export default SubmissionItem;
