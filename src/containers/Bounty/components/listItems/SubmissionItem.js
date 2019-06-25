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
        onClick={acceptFulfillment}
      >
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
        }
      >
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
        }
      >
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
          <FulfillmentStagePill
            accepted={accepted}
            bounty_stage={bounty_stage}
          />
          {actionButton}
          <Text
            link
            src={`mailto:${fulfiller_email}`}
            className={styles.emailLink}
          >
            <FontAwesomeIcon
              icon={['far', 'envelope']}
              className={styles.emailIcon}
            />
          </Text>
        </div>
      </header>
      <div className={`${styles.submissionContents}`}>
        <Text color="darkGrey" className={`${styles.submissionDescription}`}>
          {description || 'N/A'}
        </Text>
        <div className={`${styles.submissionMedia}`}>
          {url ? (
            <a src={url} className={`${styles.submissionMediaItem}`}>
              <FontAwesomeIcon
                icon={['fal', 'external-link-square']}
                className={styles.submissionMediaIcon}
              />
              <Text className={`${styles.fileName}`}>{shortenUrl(url)}</Text>
            </a>
          ) : null}
          {dataHash ? (
            <div>
              {!hasImageExtension(dataFileName) && (
                <a
                  src={`https://ipfs.infura.io/ipfs/${dataHash}/${dataFileName}`}
                  className={`${styles.submissionMediaItem}`}
                >
                  <FontAwesomeIcon
                    icon={['far', 'file-archive']}
                    className={styles.submissionMediaIcon}
                  />
                  <Text
                    className={`${styles.fileName}`}
                    src={`https://ipfs.infura.io/ipfs/${dataHash}/${dataFileName}`}
                  >
                    {shortenFileName(dataFileName)}
                  </Text>
                </a>
              )}
              {hasImageExtension(dataFileName) && (
                <a
                  className={`${styles.submissionMediaItem}`}
                  href={`https://ipfs.infura.io/ipfs/${dataHash}/${dataFileName}`}
                  target="_blank"
                >
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
        <footer className={`${styles.submissionFooter}`}>
          <Text inline color="defaultGrey" className={`${styles.timePosted}`}>
            {formattedTime}
          </Text>
          <Text link src="#">
            <FontAwesomeIcon
              icon={['far', 'comment']}
              className={styles.commentIcon}
            />
            Comment
          </Text>
        </footer>
      </div>
      <button className={`${styles.toggleComments}`}>
        <FontAwesomeIcon icon={['far', 'angle-down']} />
        Show 3 comments
      </button>
    </div>
  );
};

SubmissionItem.propTypes = {};

SubmissionItem.defaultProps = {};

export default SubmissionItem;
