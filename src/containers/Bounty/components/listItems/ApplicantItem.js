import React from 'react';
import styles from './SubmissionItem.module.scss';
import { Button, Text } from 'components';
import { ApplicantStagePill, LinkedAvatar } from 'explorer-components';
import moment from 'moment';

const ApplicantItem = props => {
  const {
    applicationId,
    bounty,
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
    showModal,
    setRatingModal,
    initiateLoginProtection
  } = props;

  const { bountyStage } = bounty;

  const formattedTime = moment
    .utc(created, 'YYYY-MM-DDThh:mm:ssZ')
    .local()
    .format('MM/DD/YYYY');

  let actionsOrStatus = [];

  if (bountyBelongsToLoggedInUser) {
    actionsOrStatus.push(
      <Button
        type="action"
        className={styles.actionButton}
        icon={['far', 'check']}
        onClick={acceptApplicant}
      >
        Accept
      </Button>
    );
    actionsOrStatus.push(
      <Button
        type="action"
        className={styles.actionButton}
        icon={['far', 'check']}
        onClick={rejectApplicant}
      >
        Reject
      </Button>
    );
  }

  if (applicationBelongsToLoggedInUser) {
    actionsOrStatus.push(<ApplicantStagePill applicationStatus={state} />);
  } else {
    actionsOrStatus.push(<ApplicantStagePill applicationStatus={state} />);
  }

  return (
    <div className="row">
      <div
        className={`col-xs-12 col-sm-3 ${styles.detailsContainer} ${
          styles.filter
        }`}
      >
        <LinkedAvatar
          name={applicant_name}
          address={applicant_address}
          img={applicant_img}
          hash={applicant_address}
          to={`/profile/${applicant_address}`}
          nameTextScale={'h4'}
          nameTextColor="black"
        />

        <div className={[styles.labelGroup, styles.submitTime].join(' ')}>
          <Text inputLabel>Submitted</Text>
          <Text>{formattedTime}</Text>
        </div>
      </div>

      <div className={`col-xs-12 col-sm-6 ${styles.filter}`}>
        <div className={`${styles.labelGroup} ${styles.submissionContents}`}>
          <Text inputLabel>Description</Text>
          <Text className={styles.submissionDescription}>
            {description || 'N/A'}
          </Text>
        </div>
      </div>
      <div className={`col-sm-3 ${styles.actionColumn}`}>{actionsOrStatus}</div>
    </div>
  );
};

ApplicantItem.propTypes = {};
ApplicantItem.defaultProps = {};

export default ApplicantItem;
