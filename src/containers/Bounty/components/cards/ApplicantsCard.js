import React from 'react';
import styles from './Cards.module.scss';
import { Button, ListGroup, Loader, Text, ZeroState } from 'components';
import { map as fpMap } from 'lodash';
import { ApplicantItem } from '../index';
import intl from 'react-intl-universal';

const map = fpMap.convert({ cap: false });

const ApplicantsCard = props => {
  const {
    applicants,
    currentUser,
    bountyBelongsToLoggedInUser,
    changeApplicationState,
    loadMoreApplicants
  } = props;

  const renderApplicants = list => {
    let applications = [];
    let renderFirst = [];

    map(applicant_item => {
      const {
        applicationId,
        message,
        created,
        state,
        applicant
      } = applicant_item;

      const { name, small_profile_image_url } = applicant;

      const applicationBelongsToLoggedInUser =
        currentUser && applicant.public_address === currentUser.public_address;

      if (!applicationBelongsToLoggedInUser) {
        const item = (
          <ListGroup.ListItem
            key={applicationId}
            className={styles.listItem}
            fullBorder
          >
            <ApplicantItem
              applicant_name={name}
              applicant_address={applicant.public_address}
              applicant_img={small_profile_image_url}
              state={state}
              description={message}
              created={created}
              bountyBelongsToLoggedInUser={bountyBelongsToLoggedInUser}
              applicationBelongsToLoggedInUser={
                applicationBelongsToLoggedInUser
              }
              acceptApplicant={() => changeApplicationState(applicationId, 'A')}
              rejectApplicant={() => changeApplicationState(applicationId, 'R')}
            />
          </ListGroup.ListItem>
        );

        if (!bountyBelongsToLoggedInUser) {
          if (state === 'A') applications.unshift(item);
          else applications.push(item);
        } else {
          if (state === 'P') renderFirst.unshift(item);
          else if (state === 'A') applications.unshift(item);
          else applications.push(item);
        }
      } else {
        renderFirst.push(
          <div>
            <ListGroup.ListItem
              key={applicationId}
              className={styles.listItem}
              fullBorder
            >
              <ApplicantItem
                applicant_name={name}
                applicant_address={applicant.public_address}
                applicant_img={small_profile_image_url}
                state={state}
                description={message}
                created={created}
                bountyBelongsToLoggedInUser={bountyBelongsToLoggedInUser}
                applicationBelongsToLoggedInUser={
                  applicationBelongsToLoggedInUser
                }
                acceptApplicant={() =>
                  changeApplicationState(applicationId, 'A')
                }
                rejectApplicant={() =>
                  changeApplicationState(applicationId, 'R')
                }
              />
            </ListGroup.ListItem>
            {state === 'R' ? (
              <Text
                className={styles.declinedNoteText}
                alignment="align-center"
                color="defaultGrey"
                typeScale="Small"
              >
                {intl.get(
                  'sections.bounty.components.applicant_card.declined_message'
                )}
              </Text>
            ) : (
              <div className={styles.bottomBorder} />
            )}
          </div>
        );
      }
    }, list);

    return [...renderFirst, ...applications];
  };

  let bodyClass = '';
  let body = null;

  if (!applicants.list.length) {
    bodyClass = styles.bodyLoading;
    body = (
      <div className={styles.zeroState}>
        <ZeroState
          title={intl.get(
            'sections.bounty.components.applicant_card.zero_state.title'
          )}
          text={intl.get(
            'sections.bounty.components.applicant_card.zero_state.description'
          )}
          icon="inbox"
        />
      </div>
    );
  } else {
    body = (
      <ListGroup className={styles.applicantsTab}>
        {[
          ...renderApplicants(applicants.list),
          applicants.list.length < applicants.count && (
            <ListGroup.ListItem key="load" className={styles.loadMoreButton}>
              <Button
                loading={applicants.loadingMore}
                onClick={loadMoreApplicants}
              >
                {intl.get('actions.load_more')}
              </Button>
            </ListGroup.ListItem>
          )
        ]}
      </ListGroup>
    );
  }

  if (applicants.loading) {
    bodyClass = styles.bodyLoading;
    body = <Loader color="blue" size="medium" />;
  }

  return <div className={bodyClass}>{body}</div>;
};

ApplicantsCard.propTypes = {};
ApplicantsCard.defaultProps = {};

export default ApplicantsCard;
