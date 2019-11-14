import React from 'react';
import styles from './ApplicantItem.module.scss';
import { Button, Text } from 'components';
import { ApplicantStagePill, LinkedAvatar } from 'explorer-components';
import moment from 'moment';
import intl from 'react-intl-universal';
import { actions as bountyUIActions } from '../../reducer';

const showModal = bountyUIActions.showModal;

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
    initiateLoginProtection
  } = props;

  const formattedTime = moment
    .utc(created, 'YYYY-MM-DDThh:mm:ssZ')
    .local()
    .fromNow();

  let actionsOrStatus = [];

  if (bountyBelongsToLoggedInUser && state === 'P') {
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
    actionsOrStatus.push(
      <Button
        key="reject"
        type="default"
        className={styles.applicantsActionsButton}
        onClick={() =>
          initiateLoginProtection(() => {
            setRejectionModal(applicationId);
            console.log('app id', applicationId);
            showModal('applicationRejection');
          })
        }
      >
        {intl.get('actions.reject')}
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
    <div className="row">
      <div
        className={`col-xs-12 col-sm-10 ${styles.detailsContainer} ${
          styles.filter
        }`}
      >
        <LinkedAvatar
          name={applicant_name}
          address={applicant_address}
          img={applicant_img}
          hash={applicant_address}
          to={`/profile/${applicant_address}`}
        />

        {bountyBelongsToLoggedInUser ? (
          <div>
            <div className={`col-xs-12 col-sm-10 ${styles.filter}`}>
              <div className={`${styles.labelGroup}`}>
                <Text className={styles.submissionDescription}>
                  {description || 'N/A'}
                </Text>
              </div>
            </div>

            <div className={[styles.labelGroup, styles.submitTime].join(' ')}>
              <Text>{formattedTime}</Text>
            </div>
          </div>
        ) : null}
      </div>
      <div className={`col-sm-2 ${styles.applicantsActions}`}>
        {actionsOrStatus}
      </div>
    </div>
  );
};

ApplicantItem.propTypes = {};
ApplicantItem.defaultProps = {};

export default ApplicantItem;
