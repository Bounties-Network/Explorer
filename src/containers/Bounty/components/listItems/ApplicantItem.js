import React from 'react';
import styles from './ApplicantItem.module.scss';
import { Button, Text } from 'components';
import { ApplicantStagePill, LinkedAvatar } from 'explorer-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/pro-regular-svg-icons';
import moment from 'moment';
import intl from 'react-intl-universal';

const ApplicantItem = props => {
  const {
    applicant_name,
    applicant_address,
    applicant_img,
    description,
    state,
    created,
    bountyBelongsToLoggedInUser,
    applicationBelongsToLoggedInUser,
    acceptApplicant,
    rejectApplicant,
    setRejectionModal,
    applicationId,
    initiateLoginProtection,
    showModal,
    reply,
    issuer
  } = props;

  const formattedTime = moment
    .utc(created, 'YYYY-MM-DDThh:mm:ssZ')
    .local()
    .fromNow();

  let actionsOrStatus = [];

  if (bountyBelongsToLoggedInUser && state === 'P') {
    actionsOrStatus.push(
      <Button
        key="reject"
        type="default"
        className={styles.applicantsActionsButton}
        onClick={() =>
          initiateLoginProtection(() => {
            showModal('applicationRejection', { applicationId });
          })
        }
      >
        {intl.get('actions.reject')}
      </Button>
    );
    actionsOrStatus.push(
      <Button
        key="accept"
        type="action"
        className={styles.applicantsActionsButton}
        onClick={acceptApplicant}
      >
        {intl.get('actions.accept')}
      </Button>
    );
  } else {
    if (
      (applicationBelongsToLoggedInUser && state === 'R') ||
      bountyBelongsToLoggedInUser ||
      state === 'A'
    ) {
      actionsOrStatus.push(
        <ApplicantStagePill key="pill" applicationStatus={state} />
      );
    }
  }
  return (
    <div className={styles.applicantionItem}>
      <div className={styles.applicationHeader}>
        <LinkedAvatar
          name={applicant_name}
          address={applicant_address}
          img={applicant_img}
          hash={applicant_address}
          to={`/profile/${applicant_address}`}
        />
        <div className={styles.applicationActions}>{actionsOrStatus}</div>
      </div>

      {bountyBelongsToLoggedInUser || applicationBelongsToLoggedInUser ? (
        <div className={styles.applicationBody}>
          <div>
            <Text color="darkGrey" className={styles.applicationDescription}>
              {description || 'N/A'}
            </Text>
          </div>

          <div className={[styles.labelGroup, styles.submitTime].join(' ')}>
            <Text typeScale="Small" color="defaultGrey">
              {formattedTime}
            </Text>
          </div>
        </div>
      ) : null}

      {bountyBelongsToLoggedInUser ||
      (applicationBelongsToLoggedInUser && reply) ? (
        <div className={styles.applicationReply}>
          <div>
            <LinkedAvatar
              textFormat="inline"
              name={issuer.name}
              address={issuer.public_address}
              img={issuer.small_profile_image_url}
              hash={issuer.public_address}
              to={`/profile/${issuer.public_address}`}
            />
          </div>
          <div className={styles.replyContent}>
            <Text typeScale="Body" color="darkGrey">
              {reply}
            </Text>
          </div>
        </div>
      ) : null}

      {applicationBelongsToLoggedInUser && state === 'R' ? (
        <div className={styles.applicationFooter}>
          <Text
            className={styles.declinedNoteText}
            alignment="align-center"
            color="defaultGrey"
            typeScale="Small"
            fontStyle="italic"
          >
            <FontAwesomeIcon
              icon={faEyeSlash}
              color="grey"
              className={styles.faIcon}
            />
            {intl.get(
              'sections.bounty.components.applicant_card.declined_message'
            )}
          </Text>
        </div>
      ) : null}
    </div>
  );
};

ApplicantItem.propTypes = {};
ApplicantItem.defaultProps = {};

export default ApplicantItem;
