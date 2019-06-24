import React from 'react';
import styles from './Cards.module.scss';
import { Button, Loader, Text, ZeroState } from 'components';
import { SubmissionItem } from '../index';
import { map as fpMap } from 'lodash';
import intl from 'react-intl-universal';

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
                acceptFulfillment(
                  bounty.bounty_id,
                  bounty.contract_version,
                  fulfillment_id,
                  0,
                  [bounty.fulfillment_amount]
                )
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
    <div>
      {[
        ...renderFulfillments(fulfillments.list),
        fulfillments.list.length < fulfillments.count && (
          <div key="load" className={styles.loadMoreButton}>
            <Button
              loading={fulfillments.loadingMore}
              onClick={loadMoreFulfillments}
            >
              {intl.get('actions.load_more')}
            </Button>
          </div>
        )
      ]}
    </div>
  );

  if (!fulfillments.list.length) {
    bodyClass = styles.bodyLoading;
    body = (
      <div className={styles.zeroState}>
        <ZeroState
          title={intl.get(
            'sections.bounty.components.submissions_card.zero_state.title'
          )}
          text={intl.get(
            'sections.bounty.components.submissions_card.zero_state.description'
          )}
          icon="inbox"
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
            {intl.get('sections.bounty.components.submissions_card.notice')}
            {bountyBelongsToLoggedInUser
              ? intl.get(
                  'sections.bounty.components.submissions_card.bounty_owner_notice'
                )
              : intl.get(
                  'sections.bounty.components.submissions_card.fulfiller_notice'
                )}
          </Text>
        </React.Fragment>
      );
    }

    if (!fulfillments.list.length && bountyBelongsToLoggedInUser) {
      bodyClass = styles.bodyLoading;
      body = (
        <div className={styles.zeroState}>
          <ZeroState
            title={intl.get(
              'sections.bounty.components.submissions_card.zero_state.title'
            )}
            text={intl.get(
              'sections.bounty.components.submissions_card.zero_state.bounty_owner_description'
            )}
            icon="inbox"
          />
        </div>
      );
    }

    if (!fulfillments.list.length && !bountyBelongsToLoggedInUser) {
      bodyClass = styles.bodyLoading;
      body = (
        <div className={styles.zeroState}>
          <ZeroState
            title={intl.get(
              'sections.bounty.components.submissions_card.zero_state.private_title'
            )}
            text={intl.get(
              'sections.bounty.components.submissions_card.zero_state.private_description'
            )}
            icon="lock"
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
