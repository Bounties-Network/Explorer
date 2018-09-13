import React from 'react';
import styles from './ActionBar.module.scss';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { Button } from 'components';
import { DEAD, ACTIVE } from 'public-modules/Bounty/constants';
import { ModalManager } from './components';

const ActionBar = props => {
  const {
    bounty,
    history,
    initiateWalkthrough,
    initiateLoginProtection,
    isDraft,
    showModal,
    user,
    walletAddress
  } = props;

  const belongsToLoggedInUser = user && bounty.issuer === user.public_address;
  const loggedOutButAddressMatches =
    !user && walletAddress && bounty.issuer === walletAddress.toLowerCase();

  const draftUrl = `/createBounty/draft/${bounty.uid}/`;

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
          Activate Bounty
        </Button>
        <Link to={draftUrl}>
          <Button
            icon={['far', 'edit']}
            fitWidth
            className={styles.editBountyButton}
          >
            Edit Bounty
          </Button>
        </Link>
      </div>
    );
  }

  if (!isDraft && (belongsToLoggedInUser || loggedOutButAddressMatches)) {
    actionOptions = (
      <div className={styles.actionBar}>
        {bounty.bountyStage === DEAD ? (
          <Button
            type="action"
            className={styles.reactivateButton}
            fitWidth
            onClick={() =>
              initiateLoginProtection(() => showModal('activateDead'))
            }
          >
            Re-activate Bounty
          </Button>
        ) : (
          <Button
            type="destructive"
            className={styles.killButton}
            fitWidth
            onClick={() => initiateLoginProtection(() => showModal('kill'))}
          >
            De-activate bounty
          </Button>
        )}

        {bounty.bountyStage !== DEAD && (
          <Button
            onClick={() =>
              initiateLoginProtection(() => showModal('increasePayout'))
            }
            icon={['far', 'arrow-up']}
            fitWidth
            className={styles.buttonGroup}
          >
            Increase Prize
          </Button>
        )}
        {bounty.bountyStage !== DEAD && (
          <Button
            icon={['far', 'dollar-sign']}
            className={styles.buttonGroup}
            onClick={() =>
              initiateLoginProtection(() => showModal('contribute'))
            }
            fitWidth
          >
            Contribute
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
          Extend deadline
        </Button>
        <Button
          icon={['far', 'user-friends']}
          fitWidth
          className={styles.buttonGroup}
          onClick={() =>
            initiateLoginProtection(() => showModal('transferOwnership'))
          }
        >
          Transfer Ownership
        </Button>
      </div>
    );
  }

  if (
    !belongsToLoggedInUser &&
    !loggedOutButAddressMatches &&
    bounty.bountyStage === ACTIVE
  ) {
    actionOptions = (
      <div className={styles.actionBar}>
        <Button
          type="action"
          fitWidth
          onClick={() =>
            initiateLoginProtection(() => showModal('fulfillBounty'))
          }
        >
          {user ? 'Fulfill' : 'Sign in to fulfill'}
        </Button>
        <Button
          icon={['far', 'dollar-sign']}
          className={styles.buttonGroup}
          onClick={() => initiateLoginProtection(() => showModal('contribute'))}
          fitWidth
        >
          Contribute
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
