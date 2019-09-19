import React from 'react';
import styles from './SubmissionItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { includes } from 'lodash';
import { Button, Text, ListGroup, Loader } from 'components';
import { FulfillmentStagePill, LinkedAvatar } from 'explorer-components';
import { ACTIVE, EXPIRED } from 'public-modules/Bounty/constants';
import { CommentItem, NewCommentForm } from '../index';

import {
  newTabExtension,
  hasImageExtension,
  shortenFileName,
  shortenUrl
} from 'utils/helpers';
import moment from 'moment';
import intl from 'react-intl-universal';
import showdown from 'showdown';
import { map as fpMap } from 'lodash';
import {
  faAngleUp,
  faAngleDown,
  faComment,
  faEnvelope,
  faEdit,
  faFileArchive
} from '@fortawesome/pro-regular-svg-icons';
import { faExternalLinkSquare } from '@fortawesome/pro-light-svg-icons';
const map = fpMap.convert({ cap: false });

showdown.setOption('simpleLineBreaks', true);
showdown.extension('targetBlank', newTabExtension);
const converter = new showdown.Converter({ extensions: ['targetBlank'] });
converter.setFlavor('github');

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
    initiateLoginProtection,
    comment_count,
    setOpenComments,
    openComments,
    currentUser,
    postFulComment,
    comments,
    showLogin,
    id,
    loadMoreFulComments,
    autoFocus,
    editFulfillment
  } = props;

  const commentOnSubmission = () => {
    setOpenComments(openComments ? -1 : id, true);
  };
  let numComments =
    openComments && comments.countFulComments >= comment_count
      ? comments.countFulComments
      : comment_count;
  const renderComments = () => {
    return map(comment => {
      const { id, text, user, created } = comment;
      const { name, public_address, small_profile_image_url } = user;

      return (
        <ListGroup.ListItem key={id} className={styles.listItem}>
          <CommentItem
            name={name}
            address={public_address}
            img={small_profile_image_url}
            text={text}
            created={created}
          />
        </ListGroup.ListItem>
      );
    }, comments.list);
  };

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
        className={`${styles.actionButton} ${styles.rateButton}`}
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

  // Edit Submission Button
  if (
    submissionBelongsToLoggedInUser &&
    !accepted &&
    (bounty.contract_version === '2' || bounty.contract_version === '2.1')
  ) {
    actionButton = (
      <Button
        className={styles.actionButton}
        icon={faEdit}
        onClick={() =>
          initiateLoginProtection(() => {
            editFulfillment({
              fulfillmentId,
              fulfiller_name,
              fulfiller_email,
              description,
              url
            });
            showModal('updateFulfillment');
          })
        }
      >
        {intl.get('actions.update_submission')}
      </Button>
    );
  }

  let bodyClass = '';
  let newCommentForm = '';
  let body = '';
  if (openComments) {
    newCommentForm = (
      <ListGroup.ListItem
        key="form"
        className={styles.newCommentForm}
        borderColor="transparent"
        fullBorder
      >
        <NewCommentForm
          className={styles.newCommentForm}
          signedIn={!!currentUser}
          onSubmit={
            !!currentUser
              ? values => postFulComment(id, values.text)
              : showLogin
          }
          loading={comments.postingFulComments}
          autoFocus={autoFocus}
        />
      </ListGroup.ListItem>
    );

    body = (
      <ListGroup className={styles.borderStyle}>
        {[
          newCommentForm,
          ...renderComments(),
          comments.fulComments.length < comments.countFulComments && (
            <ListGroup.ListItem
              key="load"
              className={styles.loadMoreButton}
              fullBorder
            >
              <Button
                loading={comments.loadingMoreFulComments}
                onClick={() => {
                  loadMoreFulComments(id);
                }}
              >
                {intl.get('actions.load_more')}
              </Button>
            </ListGroup.ListItem>
          )
        ]}
      </ListGroup>
    );

    if (!numComments) {
      body = (
        <ListGroup className={styles.borderStyle}>{newCommentForm}</ListGroup>
      );
    }

    if (comments.loadingFulComments && numComments > 0) {
      bodyClass = styles.bodyLoading;
      body = <Loader color="blue" size="medium" />;
    }
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
        />
        <div className={`${styles.actionContainer}`}>
          <FulfillmentStagePill
            accepted={accepted}
            bounty_stage={bounty_stage}
          />
          {actionButton}
          {bountyBelongsToLoggedInUser && (
            <Text
              link
              src={`mailto:${fulfiller_email}`}
              className={styles.emailLink}
            >
              <FontAwesomeIcon icon={faEnvelope} className={styles.emailIcon} />
            </Text>
          )}
        </div>
      </header>
      <div className={`${styles.submissionContents}`}>
        <div
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(description || 'N/A')
          }}
          className="markdownContent"
        />
        <div className={`${styles.submissionMedia}`}>
          {url ? (
            <a
              href={url}
              target="_blank"
              className={`${styles.submissionMediaItem}`}
            >
              <FontAwesomeIcon
                icon={faExternalLinkSquare}
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
                    icon={faFileArchive}
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
          <Text link onClick={commentOnSubmission}>
            <FontAwesomeIcon icon={faComment} className={styles.commentIcon} />
            {intl.get('sections.bounty.components.submissions_card.action')}
          </Text>
        </footer>
      </div>
      {numComments > 0 && (
        <button
          className={`${styles.toggleComments}`}
          onClick={() => {
            setOpenComments(openComments ? -1 : id);
          }}
        >
          <FontAwesomeIcon
            icon={openComments ? faAngleUp : faAngleDown}
            className={`${styles.toggleIcon}`}
          />
          {openComments
            ? intl.get(
                'sections.bounty.components.submissions_card.hide_comments',
                { count: numComments }
              )
            : intl.get(
                'sections.bounty.components.submissions_card.show_comments',
                { count: numComments }
              )}
        </button>
      )}
      {openComments && <div className={bodyClass}>{body}</div>}
    </div>
  );
};

SubmissionItem.propTypes = {};

SubmissionItem.defaultProps = {};

export default SubmissionItem;
