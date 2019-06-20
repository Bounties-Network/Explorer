import React from 'react';
import styles from './ActionBar.module.scss';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { Button } from 'components';
import { DEAD, ACTIVE } from 'public-modules/Bounty/constants';
import { ModalManager } from './components';
import intl from 'react-intl-universal';

const ActionBar = props => {
  const {
    bounty,
    history,
    initiateWalkthrough,
    initiateLoginProtection,
    isDraft,
    showModal,
    user
  } = props;

  const belongsToLoggedInUser =
    user && bounty.user.public_address === user.public_address;

  const draftUrl = `/createBounty/draft/${bounty.uid}/`;
  const editUrl = `/editBounty/${bounty.id}/`;

  let actionOptions = null;
  if (isDraft && belongsToLoggedInUser) {
    actionOptions = (
      <div className={styles.actionBar}>
        <Button
          type="action"
          fitWidth
          className={styles.activateButton}
          onClick={() => {
            if (moment(bounty.deadline) < moment()) {
              return initiateLoginProtection(() =>
                showModal('deadlineWarning')
              );
            }
            initiateLoginProtection(() => showModal('activate'));
          }}
        >
          {intl.get('sections.bounty.actions.activate')}
        </Button>
        <Link to={draftUrl}>
          <Button
            icon={['far', 'edit']}
            fitWidth
            className={styles.editBountyButton}
          >
            {intl.get('sections.bounty.actions.edit')}
          </Button>
        </Link>
      </div>
    );
  }

  if (!isDraft && belongsToLoggedInUser) {
    actionOptions = (
      <div className={styles.actionBar}>
        {bounty.bounty_stage === DEAD ? (
          <Button
            type="action"
            className={styles.reactivateButton}
            fitWidth
            onClick={() =>
              initiateLoginProtection(() => showModal('activateDead'))
            }
          >
            {intl.get('sections.bounty.actions.re_activate')}
          </Button>
        ) : (
          <Button
            type="destructive"
            className={styles.killButton}
            fitWidth
            onClick={() => initiateLoginProtection(() => showModal('kill'))}
          >
            {intl.get('sections.bounty.actions.de_activate')}
          </Button>
        )}

        {bounty.bounty_stage !== DEAD &&
          bounty.contract_version === 1 && (
            <Button
              onClick={() =>
                initiateLoginProtection(() => showModal('increasePayout'))
              }
              icon={['far', 'arrow-up']}
              fitWidth
              className={styles.buttonGroup}
            >
              {intl.get('sections.bounty.actions.increase_prize')}
            </Button>
          )}

        {bounty.contract_version === 2 && (
          <Link to={editUrl}>
            <Button
              icon={['far', 'edit']}
              fitWidth
              className={styles.editBountyButton}
            >
              {intl.get('sections.bounty.actions.edit_bounty')}
            </Button>
          </Link>
        )}

        {bounty.bounty_stage !== DEAD && (
          <Button
            icon={['far', 'dollar-sign']}
            className={styles.buttonGroup}
            onClick={() =>
              initiateLoginProtection(() => showModal('contribute'))
            }
            fitWidth
          >
            {intl.get('sections.bounty.actions.contribute_issuer')}
          </Button>
        )}
        <Button
          icon={['far', 'calendar-plus']}
          fitWidth
          className={styles.buttonGroup}
          onClick={() =>
            initiateLoginProtection(() => showModal('extendDeadline'))
          }
        >
          {intl.get('sections.bounty.actions.extend_deadline')}
        </Button>
        <Button
          icon={['far', 'user-friends']}
          fitWidth
          className={styles.buttonGroup}
          onClick={() =>
            initiateLoginProtection(() => showModal('transferOwnership'))
          }
        >
          {intl.get('sections.bounty.actions.transfer_ownership')}
        </Button>
      </div>
    );
  }
  if (!belongsToLoggedInUser && bounty.bounty_stage === ACTIVE) {
    let mainActionButton = (
      <Button
        type="action"
        fitWidth
        onClick={() =>
          initiateLoginProtection(() => showModal('fulfillBounty'))
        }
      >
        {user
          ? intl.get('sections.bounty.actions.fulfill')
          : intl.get('sections.bounty.actions.login_fulfill')}
      </Button>
    );

    if (bounty.fulfillers_need_approval && !bounty.user_can_fulfill) {
      mainActionButton = (
        <Button
          type="action"
          fitWidth
          onClick={() =>
            initiateLoginProtection(() => showModal('fulfillerApplication'))
          }
        >
          {user
            ? intl.get('sections.bounty.actions.apply')
            : intl.get('sections.bounty.actions.login_apply')}
        </Button>
      );

      if (bounty.user_has_applied) {
        mainActionButton = (
          <Button type="action" fitWidth disabled>
            {intl.get('sections.bounty.actions.apply')}
          </Button>
        );
      }
    }

    if (bounty.platform === 'gitcoin') {
      mainActionButton = (
        <Button
          type="action"
          fitWidth
          onClick={() => {
            const gitcoinUrlInfo = bounty.webReferenceURL
              .split('https://github.com/')
              .join('')
              .split('/');
            window.location.replace(
              `https://gitcoin.co/issue/${gitcoinUrlInfo[0]}/${
                gitcoinUrlInfo[1]
              }/${gitcoinUrlInfo[3]}/${bounty.bounty_id}`
            );
          }}
        >
          {intl.get('sections.bounty.actions.fulfill_gitcoin')}
        </Button>
      );
    }

    actionOptions = (
      <div className={styles.actionBar}>
        {mainActionButton}
        <Button
          icon={['far', 'dollar-sign']}
          className={styles.buttonGroup}
          onClick={() => initiateLoginProtection(() => showModal('contribute'))}
          fitWidth
        >
          {intl.get('sections.bounty.actions.contribute')}
        </Button>
      </div>
    );
  }

  return (
    <div>
      <ModalManager
        user={user || {}}
        bounty={bounty}
        onExtendDeadlineError={isDraft ? () => history.push(draftUrl) : null}
        initiateWalkthrough={initiateWalkthrough}
      />
      {actionOptions}
    </div>
  );
};

export default withRouter(ActionBar);
