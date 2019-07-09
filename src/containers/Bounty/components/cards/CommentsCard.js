import React from 'react';
import styles from './Cards.module.scss';
import { map as fpMap } from 'lodash';
import { CommentItem, NewCommentForm } from '../index';
import { Button, ListGroup, Loader, ZeroState } from 'components';
import intl from 'react-intl-universal';
const map = fpMap.convert({ cap: false });

const CommentsCard = props => {
  const {
    comments,
    loadMoreComments,
    postComment,
    bounty,
    showLogin,
    currentUser
  } = props;

  const renderComments = () => {
    return map(comment => {
      const { id, text, user, created } = comment;
      const { name, public_address, small_profile_image_url } = user;

      return (
        <ListGroup.ListItem key={id} className={styles.listItem} fullBorder>
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

  let bodyClass = '';

  const newCommentForm = (
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
            ? values => postComment(bounty.id, values.text)
            : showLogin
        }
        loading={comments.posting}
      />
    </ListGroup.ListItem>
  );

  let body = (
    <ListGroup className={styles.borderStyle}>
      {[
        newCommentForm,
        ...renderComments(),
        comments.list.length < comments.count && (
          <ListGroup.ListItem
            key="load"
            className={styles.loadMoreButton}
            fullBorder
          >
            <Button loading={comments.loadingMore} onClick={loadMoreComments}>
              {intl.get('actions.load_more')}
            </Button>
          </ListGroup.ListItem>
        )
      ]}
    </ListGroup>
  );

  if (!comments.list.length) {
    body = (
      <ListGroup className={styles.borderStyle}>
        {[
          newCommentForm,
          <ListGroup.ListItem
            key="zero"
            className={styles.zeroState}
            fullBorder
          >
            <ZeroState
              title={intl.get(
                'sections.bounty.components.comments_card.zero_state.title'
              )}
              text={intl.get(
                'sections.bounty.components.comments_card.zero_state.description'
              )}
              icon="comment"
            />
          </ListGroup.ListItem>
        ]}
      </ListGroup>
    );
  }

  if (comments.loading) {
    bodyClass = styles.bodyLoading;
    body = <Loader color="blue" size="medium" />;
  }

  return <div className={bodyClass}>{body}</div>;
};

CommentsCard.propTypes = {};
CommentsCard.defaultProps = {};

export default CommentsCard;
