import React from 'react';
import styles from './ActionBar.module.scss';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { Button } from 'components';
import { DEAD } from 'public-modules/Bounty/constants';
import { ModalManager } from './components';

const ActionBar = props => {
  const {
    bounty,
    history,
    initiateWalkthrough,
    isDraft,
    showModal,
    user,
    walletAddress
  } = props;

  const belongsToLoggedInUser = user && bounty.issuer === user.public_address;
  const loggedOutButAddressMatches =
    !user && walletAddress && bounty.issuer === walletAddress.toLowerCase();

  const draftUrl = `/createBounty/draft/${bounty.id}/`;

  let actionOptions = null;
  if (isDraft) {
    actionOptions = (
      <div>
        <Button
          type="action"
          fitWidth
          className={styles.activateButton}
          onClick={() => {
            if (moment(bounty.deadline) < moment()) {
              return showModal('deadlineWarning');
            }
            showModal('activate');
          }}
        >
          Activate Bounty
        </Button>
        <Link to={draftUrl}>
          <Button fitWidth className={styles.editBountyButton}>
            Edit Bounty
          </Button>
        </Link>
      </div>
    );
  }

  if (!isDraft && (belongsToLoggedInUser || loggedOutButAddressMatches)) {
    actionOptions = (
      <div>
        {bounty.bountyStage === DEAD ? (
          <Button
            type="action"
            className={styles.reactivateButton}
            fitWidth
            onClick={() => showModal('activateDead')}
          >
            Re-Activate Bounty
          </Button>
        ) : (
          <Button
            type="destructive"
            className={styles.killButton}
            fitWidth
            onClick={() => showModal('kill')}
          >
            Kill bounty
          </Button>
        )}
        {bounty.bountyStage !== DEAD && (
          <Button
            icon={['far', 'dollar-sign']}
            className={styles.buttonGroup}
            onClick={() => showModal('contribute')}
            fitWidth
          >
            Contribute
          </Button>
        )}
        <Button
          icon={['far', 'calendar-alt']}
          fitWidth
          className={styles.buttonGroup}
          onClick={() => showModal('extendDeadline')}
        >
          Change deadline
        </Button>
        <Button
          icon={['far', 'user-alt']}
          fitWidth
          className={styles.buttonGroup}
          onClick={() => showModal('transferOwnership')}
        >
          Transfer Ownership
        </Button>
        <Button
          onClick={() => showModal('increasePayout')}
          icon={['far', 'dollar-sign']}
          fitWidth
          className={styles.buttonGroup}
        >
          Increase Prize
        </Button>
      </div>
    );
  }

  if (!belongsToLoggedInUser && !loggedOutButAddressMatches) {
    actionOptions = (
      <div>
        <Button
          type="action"
          fitWidth
          onClick={() => showModal('fulfillBounty')}
        >
          {user ? 'Fulfill' : 'Sign in to fulfill'}
        </Button>
        <Button
          icon={['far', 'dollar-sign']}
          className={styles.buttonGroup}
          onClick={() => showModal('contribute')}
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
        bounty={bounty}
        onExtendDeadlineError={isDraft ? () => history.push(draftUrl) : null}
        initiateWalkthrough={initiateWalkthrough}
      />
      {actionOptions}
    </div>
  );
};

export default withRouter(ActionBar);
