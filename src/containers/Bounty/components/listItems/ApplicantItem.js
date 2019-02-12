import React from 'react';
import styles from './ApplicantItem.module.scss';
import { Button, Text } from 'components';
import { ApplicantStagePill, LinkedAvatar } from 'explorer-components';
import moment from 'moment';

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
    rejectApplicant
  } = props;

  const formattedTime = moment
    .utc(created, 'YYYY-MM-DDThh:mm:ssZ')
    .local()
    .fromNow();

  let actionsOrStatus = [];

  if (
    state === 'R' &&
    !bountyBelongsToLoggedInUser &&
    !applicationBelongsToLoggedInUser
  ) {
    return null;
  }

  if (bountyBelongsToLoggedInUser && state === 'P') {
    actionsOrStatus.push(
      <Button
        type="action"
        className={styles.applicantsActionsButton}
        onClick={acceptApplicant}
      >
        Accept
      </Button>
    );
    actionsOrStatus.push(
      <Button
        type="default"
        className={styles.applicantsActionsButton}
        onClick={rejectApplicant}
      >
        Reject
      </Button>
    );
  } else {
    actionsOrStatus.push(<ApplicantStagePill applicationStatus={state} />);
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
          nameTextScale={'h4'}
          nameTextColor="black"
        />

        {bountyBelongsToLoggedInUser ? (
          <div>
            <div className={`col-xs-12 col-sm-10 ${styles.filter}`}>
              <div
                className={`${styles.labelGroup} ${styles.submissionContents}`}
              >
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
