import React from 'react';
import styles from './Cards.module.scss';
import { Button, ListGroup, Loader, Text, ZeroState } from 'components';
import { SubmissionItem } from '../index';
import { map as fpMap } from 'lodash';

const map = fpMap.convert({ cap: false });

const SubmissionsCard = props => {
  const {
    fulfillments,
    bounty,
    loadMoreFulfillments,
    bountyBelongsToLoggedInUser,
    currentUser,
    initiateLoginProtection,
    initiateWalkthrough,
    acceptFulfillment,
    showModal,
    setRatingModal
  } = props;

  const renderFulfillments = list => {
    return map(fulfillment => {
      const {
        fulfillment_id,
        fulfiller_email,
        fulfiller,
        sourceDirectoryHash,
        sourceFileName,
        accepted,
        created,
        description,
        url,
        user,
        fulfiller_review,
        issuer_review
      } = fulfillment;

      const { name, small_profile_image_url } = user;

      const submissionBelongsToLoggedInUser =
        currentUser && fulfiller === currentUser.public_address;

      return (
        <SubmissionItem
          fulfillmentId={fulfillment_id}
          fulfiller_name={name}
          fulfiller_email={fulfiller_email}
          fulfiller_address={fulfiller}
          fulfiller_img={small_profile_image_url}
          bounty={bounty}
          url={url}
          description={description}
          dataHash={sourceDirectoryHash}
          dataFileName={sourceFileName}
          created={created}
          accepted={accepted}
          fulfiller_review={fulfiller_review || null}
          issuer_review={issuer_review || null}
          bountyBelongsToLoggedInUser={bountyBelongsToLoggedInUser}
          submissionBelongsToLoggedInUser={submissionBelongsToLoggedInUser}
          acceptFulfillment={() =>
            initiateLoginProtection(() =>
              initiateWalkthrough(() =>
                acceptFulfillment(bounty.id, fulfillment_id)
              )
            )
          }
          initiateLoginProtection={initiateLoginProtection}
          showModal={showModal}
          setRatingModal={setRatingModal}
        />
      );
    }, list);
  };

  let bodyClass = '';
  let body = (
    <ListGroup className={styles.borderStyle}>
      {[
        ...renderFulfillments(fulfillments.list),
        fulfillments.list.length < fulfillments.count && (
          <ListGroup.ListItem key="load" className={styles.loadMoreButton}>
            <Button
              loading={fulfillments.loadingMore}
              onClick={loadMoreFulfillments}
            >
              Load More
            </Button>
          </ListGroup.ListItem>
        )
      ]}
    </ListGroup>
  );

  if (!fulfillments.list.length) {
    bodyClass = styles.bodyLoading;
    body = (
      <div className={styles.zeroState}>
        <ZeroState
          title={'There are 0 submissions'}
          text={'Submissions to this bounty will appear here.'}
          iconColor="blue"
          icon={['fal', 'level-up']}
        />
      </div>
    );
  }

  if (!fulfillments.list.length) {
    bodyClass = styles.bodyLoading;
    body = (
      <div className={styles.zeroState}>
        <ZeroState
          title={'There are 0 submissions'}
          text={'Submissions to this bounty will appear here.'}
          iconColor="blue"
          icon={['fal', 'level-up']}
        />
      </div>
    );
  }

  if (bounty.private_fulfillments) {
    if (fulfillments.list.length) {
      body = (
        <React.Fragment>
          {body}
          <Text alignment="align-center" color="defaultGrey" typeScale="Small">
            Submissions to this bounty are hidden.
            {bountyBelongsToLoggedInUser
              ? ' The submissions are only visible to you and the fulfiller.'
              : ' Your submissions are only visible to you and the bounty issuer.'}
          </Text>
        </React.Fragment>
      );
    }

    if (!fulfillments.list.length && bountyBelongsToLoggedInUser) {
      bodyClass = styles.bodyLoading;
      body = (
        <div className={styles.zeroState}>
          <ZeroState
            title={'There are 0 submissions'}
            text={
              'Submissions to this bounty will appear here and will \
            only be visible to you. Additionally, fulfillers will be able \
            to see the submissions that they created.'
            }
            iconColor="blue"
            icon={['fal', 'lock']}
          />
        </div>
      );
    }

    if (!fulfillments.list.length && !bountyBelongsToLoggedInUser) {
      bodyClass = styles.bodyLoading;
      body = (
        <div className={styles.zeroState}>
          <ZeroState
            title={'Submissions are private'}
            text={'The submissions for this bounty have been set to private.'}
            iconColor="blue"
            icon={['fal', 'lock']}
          />
        </div>
      );
    }
  }

  if (fulfillments.loading) {
    bodyClass = styles.bodyLoading;
    body = <Loader color="blue" size="medium" />;
  }

  return <div className={bodyClass}>{body}</div>;
};

SubmissionsCard.propTypes = {};
SubmissionsCard.defaultProps = {};

export default SubmissionsCard;
